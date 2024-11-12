"use client"
import React from 'react';
import {UserProfile} from "@clerk/nextjs";

function User() {
    return (
        <section className={'mt-28 md:px-10 lg:px-32 xl:px-72'}>
            <UserProfile/>
        </section>
    );
}

export default User;