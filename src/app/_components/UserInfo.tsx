import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import {SignOutButton} from "@clerk/nextjs";
import Link from "next/link";
import {UserResource} from "@clerk/types";

type UserInfoType = {
    user: UserResource
}

export default function UserInfo({user}: UserInfoType) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className={'cursor-pointer'}>
                <Image src={user.imageUrl} alt={'user icon'}
                       width={45} height={45}
                       className={'rounded-full'}/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                    <Link href={'/user'}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <SignOutButton>Logout</SignOutButton>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}