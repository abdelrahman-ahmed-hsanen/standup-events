'use client'

import Image from "next/image";

const ExploreBtn = () => {
    return (
        <button type='button' id="explore-btn" className='mt-7 mx-auto' onClick={() => { }}>
            <a href="#events" className="text-white">Explore Events
                <Image src={'/icons/arrow-down.svg'} alt="arrow" width={20} height={20} />

            </a>
        </button>
    );
}

export default ExploreBtn;
