import BookEvent from '@/components/BookEvent';
import EventCard from '@/components/EventCard';
import { IEvent } from '@/database';
import { getSimilarEventsBySlug } from '@/lib/actions/event.action';
import { cacheLife } from 'next/cache';
import Image from 'next/image';
import React from 'react';
const EventDetailItem = ({ icon, alt, label }: { icon: string, alt: string, label: string }) => {
    return <div className="flex-row-gap-2 items-center">
        <Image src={icon} alt={alt} width={18} height={18} />
        <p className="">{label}</p>
    </div>
};
const EventTags = ({ tags }: { tags: string[] }) => {
    return <div className="flex-row-gap-2 items-center flex-wrap">
        {tags.map((tag) => (<div key={tag} className='pill'>
            {tag}
        </div>))}
    </div>
};
const Page = async ({ params }: { params: { slug: string } }) => {
    'use cache'
    cacheLife('minutes')
    const { slug } = await params;
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${slug}`, { cache: 'no-store' });
    const { event: { description, image, overview, date, time, location, mode, organizer, audience, tags } } = await response.json();
    const similarEvents = await getSimilarEventsBySlug(slug);

    return (
        <section id="event" className="mt-12 p-14 mb-12">
            <div className="header">
                <h1>Event Description</h1>
                <p>{description}</p>
            </div>
            <div className="details">
                <div className="content">
                    <Image src={image} alt={"Event Banner"} width={800} height={800} className="banner" />
                    <section className="flex-col-gap-2">
                        <h2 className="text-2xl font-bold">Overview</h2>
                        <p>{overview}</p>
                    </section>
                    <section className="flex-col-gap-2">
                        <h2 className="text-2xl font-bold">Event Details</h2>
                        <EventDetailItem icon={"/icons/calendar.svg"} alt={"calendar"} label={date} />
                        <EventDetailItem icon={"/icons/clock.svg"} alt={"clock"} label={time} />
                        <EventDetailItem icon={"/icons/pin.svg"} alt={"calendar"} label={location} />
                        <EventDetailItem icon={"/icons/mode.svg"} alt={"calendar"} label={mode} />
                        <EventDetailItem icon={"/icons/audience.svg"} alt={"calendar"} label={audience} />
                    </section>
                    <section className="flex-col-gap-2">
                        <h2 className="text-2xl font-bold">About the organizer</h2>
                        <p>{organizer}</p>
                    </section>
                    <EventTags
                        tags={tags[0]?.split(",").map((item: string) => item.trim())}
                    />         </div>
                <aside className="booking">
                    <div className="signup-card">
                        <h2 >Book Your Event</h2>
                        <BookEvent />
                    </div>
                </aside>
            </div>
            <div className="flex w-full flex-col gap-4 pt-20">
                {similarEvents.length > 0 && <h2 className="">Similar Events</h2>}
                <div className="events">
                    {similarEvents.length > 0 && similarEvents.map((event: IEvent) => (
                        <EventCard key={event.id} {...event} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Page;
