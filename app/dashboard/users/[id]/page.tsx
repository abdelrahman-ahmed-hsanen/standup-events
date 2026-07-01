import React from 'react';

const UserDetails = async ({ params }: { params: { id: string } }) => {
    const { id } = await params
    return (
        <div>
            {id}
        </div>
    );
}

export default UserDetails;
