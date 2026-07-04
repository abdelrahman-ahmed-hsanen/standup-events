
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
        const file = formData.get("image") as File;
        if (!file) {
            return NextResponse.json({ message: "Image file is required" }, { status: 400 });
        }
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadImage = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image', folder: 'events' }, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }).end(buffer);
        });
        event.image = (uploadImage as { secure_url: string }).secure_url;
        const createEvent = await Event.create(event);
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