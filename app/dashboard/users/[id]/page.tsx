'use client';

import React, { useEffect } from 'react';
import posthog from 'posthog-js';
import { useParams } from 'next/navigation';

const UserDetails = () => {
    const params = useParams<{ id: string }>();
    const { id } = params;

    useEffect(() => {
        posthog.capture("dashboard_user_profile_viewed", {
            user_id: id,
        });
    }, [id]);

    return (
        <div>
            {id}
        </div>
    );
}

export default UserDetails;
