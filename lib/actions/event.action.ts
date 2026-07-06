'use server'
import { Event, type IEvent } from "@/database";
import connectDB from "@/lib/mongodb";

export const getAllEvents = async (): Promise<IEvent[]> => {
    try {
        await connectDB();
        return await Event.find().sort({ createdAt: -1 }).lean();
    } catch {
        return [];
    }
};

export const getEventBySlug = async (slug: string): Promise<IEvent | null> => {
    try {
        await connectDB();
        return await Event.findOne({ slug }).lean();
    } catch {
        return null;
    }
};

export const getSimilarEventsBySlug = async (slug: string) => {
    try {
        await connectDB();
        const event = await Event.findOne({ slug });
        return await Event.find(({ _id: { $ne: event?._id }, tags: { $in: event?.tags } })).lean();

    } catch (err) {
        return []
    }
}
