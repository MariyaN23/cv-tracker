"use client"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {VacancyType} from "@/app/vacancies/columns";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type EditFormType = {
    values: VacancyType
}

const formSchema = z.object({
    company: z.string().min(2).max(50),
    vacancy: z.string().min(2).max(50),
    salary: z.number().nonnegative(),
    status: z.enum(["pending", "rejected", "invitation"]),
    note: z.string().optional(),
})

export default function EditForm({values}: EditFormType) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            company: values.company,
            vacancy: values.vacancy,
            salary: values.salary,
            status: values.status,
            note: values.note
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
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
                                        <SelectItem value="pending" className={"text-gray-500"}>Pending</SelectItem>
                                        <SelectItem value="rejected" className={"text-red-500"}>Rejected</SelectItem>
                                        <SelectItem value="invitation" className={"text-green-500"}>Invitation</SelectItem>
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