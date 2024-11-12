"use client"
import React from 'react';
import {useUser} from "@clerk/nextjs";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import UserInfo from "@/app/_components/UserInfo";

export default function Header() {
    const {isSignedIn, user} = useUser()
    return (
        <header className={'px-16 py-6 flex justify-between shadow-sm fixed top-0 w-full z-10 bg-white'}>
            <div className={'flex gap-12 items-center'}>
                <Link href={'/'}>
                    <Button variant={"ghost"}>Vacancies</Button>
                </Link>
            </div>
            <div className={'flex gap-2 items-center'}>
                {isSignedIn
                    ? <UserInfo user={user}/>
                    : <Link href={'sign-in'}>
                        <Button variant={'outline'}>Login</Button>
                    </Link>
                }
            </div>
        </header>
    );
}