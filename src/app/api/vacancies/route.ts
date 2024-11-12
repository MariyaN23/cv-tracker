import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import {prisma} from "../../../../prisma/prisma-client";

export async function POST(req: Request) {
    try {
        const {userId} = await auth()
        if (!userId) {
            return NextResponse.json({error: "Unauthorized", status: 401})
        }
        const {company, vacancy, salary, note} = await req.json()
        if (!company || !vacancy || !salary) {
            return NextResponse.json({
                error: "Missing required fields",
                status: 400,
            })
        }
        if (company.length < 2) {
            return NextResponse.json({
                error: "Company name must be at least 2 characters long",
                status: 400,
            })
        }
        if (vacancy.length < 2) {
            return NextResponse.json({
                error: "Vacancy title must be at least 2 characters long",
                status: 400,
            })
        }
        const newVacancyRecord = await prisma.vacancy.create({
            data: {
                company,
                vacancy,
                salary,
                note,
                userId
            }
        })
        return NextResponse.json(newVacancyRecord)
    } catch (error) {
        console.log(`Error creating new record ${error}`)
        return NextResponse.json({error: `Error creating new record: ${error}`, status: 500})
    }
}

export async function GET(req: Request) {
    try {

    } catch (error) {
        console.log(`Error getting all vacancies ${error}`)
        return NextResponse.json({error: `Error getting all vacancies: ${error}`, status: 500})
    }
}

export async function PUT(req: Request) {
    try {

    } catch (error) {
        console.log(`Error updating vacancy ${error}`)
        return NextResponse.json({error: `Error updating vacancy: ${error}`, status: 500})
    }
}