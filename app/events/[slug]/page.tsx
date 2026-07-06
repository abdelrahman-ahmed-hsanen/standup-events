import { Suspense } from "react";
import { EventDetails } from "./EventDetails";

const Page = ({ params }: { params: Promise<{ slug: string }> }) => {
    const slug = params.then((p) => p.slug);
    return (
        <Suspense fallback={<div>Loading...</div>} >
            <EventDetails params={slug} />
        </Suspense >
    );
}

export default Page;
