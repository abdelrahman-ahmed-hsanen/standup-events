import mongoose, { type ConnectOptions } from "mongoose";

/** Shape of the cached Mongoose connection state. */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

/**
 * Persist the cache on `globalThis` so it survives Next.js hot reloads in
 * development. Without this, each reload would open a new MongoDB connection.
 */
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

const MONGODB_URI = process.env.MONGODB_URI;

/** Connection options tuned for serverless / short-lived Next.js runtimes. */
const connectionOptions: ConnectOptions = {
  // Fail fast instead of buffering commands while disconnected.
  bufferCommands: false,
};

/**
 * Connect to MongoDB via Mongoose and return the shared instance.
 * Reuses an existing connection when one is already open.
 */
async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI) {
    throw new Error(
      "Missing MONGODB_URI environment variable. Add it to your .env.local file.",
    );
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, connectionOptions);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    // Allow the next call to retry after a failed connection attempt.
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;
