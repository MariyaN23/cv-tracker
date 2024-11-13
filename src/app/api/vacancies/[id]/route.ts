import {auth} from "@clerk/nextjs/server";
import {NextRequest, NextResponse} from "next/server";
import {prisma} from "../../../../../prisma/prisma-client";

export async function DELETE(
    req: NextRequest,
    {params}: { params: { id: string } }) {
    try {
        const {userId} = await auth()
        const {id} = params
        if (!userId) {
            return NextResponse.json({error: "Unauthorized", status: 401})
        }
        if (!id) {
            return NextResponse.json({error: "Id of deleting record is required", status: 401})
        }
        const record = await prisma.vacancy.delete({
            where: {
                id
            }
        })
        return NextResponse.json(record)
    } catch (error) {
        return NextResponse.json({error: `Error deleting record: ${error}`, status: 500})
    }
}

export async function PUT(
    req: NextRequest,
    {params}: { params: { id: string } }) {
    try {
        const {userId} = await auth()
        const {id} = params
        if (!userId) {
            return NextResponse.json({error: "Unauthorized", status: 401})
        }
        if (!id) {
            return NextResponse.json({error: "Id of deleting record is required", status: 401})
        }
        const {company, vacancy, salary, note, status} = await req.json()
        const updatedVacancy = await prisma.vacancy.update({
            where: {
                id,
            },
            data: {
                company,
                vacancy,
                salary,
                note,
                status
            }
        })
        return NextResponse.json(updatedVacancy)
    } catch (error) {
        return NextResponse.json({error: `Error updating vacancy: ${error}`, status: 500})
    }
}