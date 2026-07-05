
import { Event } from "@/database";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData();

        let event;
        try {
            event = Object.fromEntries(formData.entries());
        } catch (err) {
            return NextResponse.json({ message: "Invalid json data" }, { status: 400 })
        }


        const tags = (formData.get("tags") as string)
            .split(",")
            .map(tag => tag.trim());
        const createEvent = await Event.create({
            ...event,
            tags: tags
        });
        return NextResponse.json({ message: "Event created successfully", event: createEvent }, { status: 201 });
    } catch (err) {

        if (err instanceof Error) {
            return NextResponse.json(
                {
                    message: "Error creating event",
                    error: err.message,
                    stack: err.stack, // اختياري أثناء التطوير فقط
                },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                message: "Unknown error",
            },
            { status: 500 }
        );
    }
}
export async function GET(req: NextRequest) {

    try {
        await connectDB();
        const events = await Event.find().sort({ createdAt: -1 });
        return NextResponse.json({ events }, { status: 200 });

    } catch (err) {
        return NextResponse.json(
            {
                message: "Error fetching events",

            },
            { status: 500 }
        );
    }
}