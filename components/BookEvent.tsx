'use client'
import React, { useState } from 'react';

const BookEvent = () => {
    const [email, setEmail] = useState<string>();
    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTimeout(() => {
            setSubmitted(true)
        }, 1000)
    }

    return (
        <div id='book-event'>
            {submitted ? <p>Thank you for submitted check your email</p> : (<form>
                <div>
                    <label htmlFor="email" >Email address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id='email' placeholder='Enter your email' />
                </div>
                <button onClick={handleSubmit} type='submit' className='button-submit text-white' >Submit</button>
            </form>)}
        </div>
    );
}

export default BookEvent;
