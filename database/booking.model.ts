import mongoose, {
  type HydratedDocument,
  type Model,
  Schema,
  Types,
} from "mongoose";

import { Event } from "./event.model";

/** Plain TypeScript shape of a Booking document. */
export interface IBooking {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

type BookingModel = Model<IBooking>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function assertValidEmail(email: string): void {
  const normalized = email.trim().toLowerCase();

  if (!normalized || !EMAIL_REGEX.test(normalized)) {
    throw new Error("A valid email address is required");
  }
}

const bookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (value: string) => EMAIL_REGEX.test(value),
        message: "Invalid email format",
      },
    },
  },
  { timestamps: true },
);

// Speed up lookups by event when listing or counting bookings.
bookingSchema.index({ eventId: 1 });

bookingSchema.pre("save", async function (this: HydratedDocument<IBooking>) {
  assertValidEmail(this.email);
  this.email = this.email.trim().toLowerCase();

  const eventExists = await Event.exists({ _id: this.eventId });

  if (!eventExists) {
    throw new Error("Referenced event does not exist");
  }
});

export const Booking =
  (mongoose.models.Booking as BookingModel | undefined) ??
  mongoose.model<IBooking>("Booking", bookingSchema);
