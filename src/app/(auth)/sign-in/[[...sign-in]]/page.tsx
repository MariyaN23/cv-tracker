import { SignIn } from "@clerk/nextjs";
import React from "react";

export default function SignInPage() {
    return (
        <div className="flex pt-[5%] items-center justify-center h-full">
            <SignIn />
        </div>
    );
}