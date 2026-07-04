import mongoose, {
  type HydratedDocument,
  type Model,
  Schema,
} from "mongoose";

/** Plain TypeScript shape of an Event document. */
export interface IEvent {
  id: string;
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

type EventModel = Model<IEvent>;

const REQUIRED_STRING_FIELDS = [
  "title",
  "description",
  "overview",
  "image",
  "venue",
  "location",
  "date",
  "time",
  "mode",
  "audience",
  "organizer",
] as const satisfies ReadonlyArray<keyof IEvent>;

const REQUIRED_ARRAY_FIELDS = [
  "agenda",
  "tags",
] as const satisfies ReadonlyArray<keyof IEvent>;

/** Converts a title into a URL-safe slug. */
function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Normalizes a date string to ISO 8601 calendar format (YYYY-MM-DD). */
function normalizeDate(date: string): string {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    throw new Error("Invalid date format");
  }

  return parsed.toISOString().split("T")[0];
}

/** Normalizes a time string to 24-hour HH:mm format. */
function normalizeTime(time: string): string {
  const trimmed = time.trim();
  const match = trimmed.match(/^(\d{1,2}):(\d{2})$/);

  if (!match) {
    throw new Error("Invalid time format. Expected HH:mm");
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);

  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    throw new Error("Invalid time value");
  }

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
}

function assertNonEmptyString(value: string, field: string): void {
  if (!value.trim()) {
    throw new Error(`${field} is required and cannot be empty`);
  }
}

function assertNonEmptyArray(value: string[], field: string): void {
  if (!value.length || value.every((item) => !item.trim())) {
    throw new Error(`${field} is required and must contain at least one item`);
  }
}

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    overview: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    venue: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    time: { type: String, required: true, trim: true },
    mode: { type: String, required: true, trim: true },
    audience: { type: String, required: true, trim: true },
    agenda: {
      type: [String],
      required: true,
      default: [],
    },
    organizer: { type: String, required: true, trim: true },
    tags: {
      type: [String],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Enforce slug uniqueness at the database level.
eventSchema.index({ slug: 1 }, { unique: true });

/**
 * Runs BEFORE mongoose validation.
 * Generate the slug here so the required validator passes.
 */
eventSchema.pre("validate", function (this: HydratedDocument<IEvent>) {
  if (this.isNew || this.isModified("title")) {
    this.slug = slugify(this.title);
  }
});

/**
 * Runs AFTER validation and BEFORE saving.
 */
eventSchema.pre("save", function (this: HydratedDocument<IEvent>) {
  for (const field of REQUIRED_STRING_FIELDS) {
    assertNonEmptyString(this[field] as string, field);
  }

  for (const field of REQUIRED_ARRAY_FIELDS) {
    assertNonEmptyArray(this[field] as string[], field);
  }

  this.date = normalizeDate(this.date);
  this.time = normalizeTime(this.time);
});

export const Event =
  (mongoose.models.Event as EventModel | undefined) ??
  mongoose.model<IEvent>("Event", eventSchema);