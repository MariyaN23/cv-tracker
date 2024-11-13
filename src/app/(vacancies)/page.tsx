import AddNew from "@/app/_components/AddNew";
import {DataTable} from "@/app/_components/DataTable";
import {columns} from "@/app/_components/Columns";
import {auth} from "@clerk/nextjs/server";

export default async function VacanciesPage() {
    const {userId} = await auth()
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vacancies/?userId=${userId}`,
        {
            method: "GET",
            next: {tags: ['(vacancies)']}
        })
        .then(res => res.json())
    console.log(userId)
        return (
        <div className="container mx-auto p-20">
            <AddNew/>
            <DataTable columns={columns} data={response}/>
        </div>
    );
}