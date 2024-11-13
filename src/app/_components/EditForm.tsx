"use client"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {VacancyType} from "@/app/_components/Columns";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import toast from "react-hot-toast";
import {changeVacanciesList} from "@/app/actions/actions";

type EditFormType = {
    values: VacancyType
}

const formSchema = z.object({
    id: z.string(),
    company: z.string().min(2).max(50),
    vacancy: z.string().min(2).max(50),
    salary: z.number().nonnegative(),
    status: z.enum(["PENDING", "REJECTED", "INVITATION"]),
    note: z.string().max(50).optional()
})

export default function EditForm({values}: EditFormType) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: values.id,
            company: values.company,
            vacancy: values.vacancy,
            salary: values.salary,
            status: values.status,
            note: values.note
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await axios.put(`/api/vacancies/${form.getValues().id}`, values)
            if (res.data) {
                toast.success('Record updated successfully')
                await changeVacanciesList()
            }
        } catch
            (error) {
            toast.error(`Error updating record: ${error}`)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="company"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                                <Input placeholder="Company name" {...field}
                                       value={field.value}
                                       onChange={(e)=> field.onChange(e.currentTarget.value)}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="vacancy"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Vacancy</FormLabel>
                            <FormControl>
                                <Input placeholder="Vacancy title" {...field}
                                       value={field.value}
                                       onChange={(e)=> field.onChange(e.currentTarget.value)}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="salary"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Salary</FormLabel>
                            <FormControl>
                                <Input placeholder="Salary" {...field}
                                       type="number"
                                       value={field.value}
                                       onChange={(e)=> field.onChange(+e.currentTarget.value)}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="status"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                                <Select value={field.value}
                                        onValueChange={field.onChange}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="PENDING" className={"text-gray-500"}>Pending</SelectItem>
                                        <SelectItem value="REJECTED" className={"text-red-500"}>Rejected</SelectItem>
                                        <SelectItem value="INVITATION" className={"text-green-500"}>Invitation</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="note"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                                <Input placeholder="Additional information" {...field}
                                       value={field.value}
                                       maxLength={50}
                                       onChange={(e)=> field.onChange(e.currentTarget.value)}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}