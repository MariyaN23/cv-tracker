import {columns, VacancyType} from "./columns";
import {DataTable} from "./data-table";
import AddNew from "@/app/_components/AddNew";

const data: VacancyType[] = [
    {
        id: "728ed52f",
        company: "Google",
        vacancy: "Fullstack developer",
        salary: 1200,
        status: "pending",
        note: "Google Lorem ipsum dolor sit amet, consectetur adipisicing elit"
    },
    {
        id: "728ed521",
        company: "Yandex",
        vacancy: "Frontend developer",
        salary: 200,
        status: "rejected",
        note: "Yandex Lorem ipsum dolor sit amet, consectetur adipisicing elit"
    },
    {
        id: "728ed522",
        company: "Flowers",
        vacancy: "Frontend developer",
        salary: 500,
        status: "invitation",
        note: "Flowers Lorem ipsum dolor sit amet, consectetur adipisicing elit"
    },
    {
        id: "728ed523",
        company: "Apple",
        vacancy: "Frontend developer",
        salary: 4500,
        status: "invitation",
        note: "Apple Lorem ipsum dolor sit amet, consectetur adipisicing elit"
    },
    {
        id: "728ed525",
        company: "Microsoft",
        vacancy: "Fullstack developer",
        salary: 300,
        status: "rejected",
        note: "Microsoft Lorem ipsum dolor sit amet, consectetur adipisicing elit"
    },
]

export default function VacanciesPage() {
    return (
        <div className="container mx-auto p-20">
            <AddNew/>
            <DataTable columns={columns} data={data}/>
        </div>
    );
}
