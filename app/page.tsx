import EventCard from '@/components/EventCard';
import ExploreBtn from '@/components/ExploreBtn';
import { IEvent } from '@/database';
import { cacheLife } from 'next/cache';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const Page = async () => {
    'use cache'
    cacheLife('minutes')
    const response = await fetch(`${BASE_URL}/api/events`);
    const { events } = await response.json();

    return (
        <section className="mt-12 p-14" >

            <h1 className="text-center">The Hub for Every Event
            </h1>
            <h2 className="text-center"> Events You Maybe Miss</h2>
            <p className="text-center mt-5 text-white"> Your Destination for Stand-Up & Movie Nights.</p>
            <ExploreBtn />
            <div className="mt-20 space-y-7">
                <ul className="events">
                    {events && events.length > 0 &&
                        events.map((event: IEvent) => (
                            <li
                                key={event.title} className="list-none">
                                <EventCard {...event} />
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section >
    );
}

export default Page;
