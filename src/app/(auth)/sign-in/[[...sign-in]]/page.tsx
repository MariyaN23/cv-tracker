"use client";
import { SignIn } from "@clerk/nextjs";
import React from "react";

export default function SignInPage() {
    return (
        <div className="flex mt-28 items-center justify-center h-full">
            <SignIn />
        </div>
    );
}