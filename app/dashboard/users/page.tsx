import Link from 'next/link';
import React from 'react';

const Users = () => {
    return (
        <div>
            <h1 className="">
                dashboard Users
            </h1>
            <ul className="mt-10">
                <li className=""><Link href="/dashboard/users/1"> user 1</Link></li>
                <li className=""><Link href="/dashboard/users/2">user 2</Link></li>

                <li className=""><Link href="/dashboard/users/3">user 3</Link></li>
                <li className=""><Link href="/dashboard/users/4">user 4</Link></li>


            </ul>
        </div>
    );
}

export default Users;
