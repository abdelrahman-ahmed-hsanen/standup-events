import EventCard from '@/components/EventCard';
import ExploreBtn from '@/components/ExploreBtn';
import { events } from '@/lib/constants';
import React from 'react';

const Page = () => {

    return (
        <section className="mt-12 p-14" >

            <h1 className="text-center">The Hub for Every Event
            </h1>
            <h2 className="text-center"> Events You Maybe Miss</h2>
            <p className="text-center mt-5 text-white"> Your Destination for Stand-Up & Movie Nights.</p>
            <ExploreBtn />
            <div className="mt-20 space-y-7">
                <ul className="events">
                    {events.map((event, index) => (
                        <EventCard key={index} {...event} />
                    ))}
                </ul>
            </div>
        </section >
    );
}

export default Page;
