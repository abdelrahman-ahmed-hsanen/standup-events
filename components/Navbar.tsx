import Link from 'next/link';
import React from 'react';
import Image from "next/image";

const Navbar = () => {
    return (
        <header>
            <nav className="">
                <Link href={'/'} className='logo'>
                    <Image src={'/icons/logo.png'} alt="logo" width={20} height={20} />
                    <p className="">Events</p>
                </Link >
                <ul>
                    <Link href={'/'} >
                        Home
                    </Link >
                    <Link href={'/'} >
                        Events
                    </Link >
                    <Link href={'/'} >
                        Create Event
                    </Link >

                </ul>

            </nav>
        </header>
    );
}

export default Navbar;
