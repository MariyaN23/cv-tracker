"use client"
import VacanciesPage from "@/app/vacancies/page";
import {useUser} from "@clerk/nextjs";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function Home() {
    const router = useRouter()
    const {user} = useUser()
    useEffect(() => {
        if (!user) {
            router.replace(`/sign-in`)
        }
    }, [])
    return (
        <VacanciesPage/>
    );
}
