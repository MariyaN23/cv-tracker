import {ColumnDef} from "@tanstack/react-table";
import {ArrowUpDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import EditForm from "@/app/_components/EditForm";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export type VacancyType = {
    id: string
    company: string
    vacancy: string
    salary: number
    status: "pending" | "rejected" | "invitation"
    note: string
}

export const columns: ColumnDef<VacancyType>[] = [
    {
        accessorKey: "company",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Company
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
    },
    {
        accessorKey: "vacancy",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Vacancy
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
    },
    {
        accessorKey: "salary",
        header: () => <div className="text-right">Salary</div>,
        cell: ({row}) => {
            const salary = parseFloat(row.getValue("salary"));
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
            }).format(salary);

            return <div className="text-right font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({row}) => {
            const status = row.getValue("status") as string;
            let colorForText
            if (status === "pending") {
                colorForText = "text-gray-500"
            } else if (status === "invitation") {
                colorForText = "text-green-500"
            } else {
                colorForText = "text-red-500"
            }
            return <div className={`text-center font-medium ${colorForText} border rounded-sm`}>{status}</div>;
        },
    },
    {
        accessorKey: "note",
        header: () => {
            return (
                <Button
                    variant="ghost"
                >
                    Notes
                </Button>
            );
        },
    },
    {
        id: "edit",
        cell: ({row}) => {
            const formValues = {
                id: row.original.id,
                company: row.original.company,
                vacancy: row.original.vacancy,
                salary: row.original.salary,
                status: row.original.status,
                note: row.original.note
            }

            return (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant={"secondary"}
                                className={"hover:bg-green-100"}
                                onClick={() => {
                                    console.log(formValues)
                                }}>
                            Edit
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="pb-2">Edit vacancy details</DialogTitle>
                            <EditForm values={formValues}/>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            );
        },
    },
    {
        id: "delete",
        cell: () => {
            return (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant={"secondary"}
                                className={"hover:bg-red-100"}>Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will delete vacancy and all information about it.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            );
        },
    },
];