import {SignUp} from "@clerk/nextjs";
import React from "react";

export default function SignUpPage() {
    return (
        <div className="flex pt-[5%] items-center justify-center h-100">
            <SignUp/>
        </div>
    );
}