"use client"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import toast from "react-hot-toast";
import axios from "axios";

const formSchema = z.object({
    company: z.string().min(2).max(50),
    vacancy: z.string().min(2).max(50),
    salary: z.number().nonnegative(),
    note: z.string().optional(),
})

export default function NewForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            company: "",
            vacancy: "",
            salary: 1000,
            note: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await axios.post("api/vacancies", values)
            if (res.data.error) {
                toast.error(res.data.error)
            }
            if (res.data) {
                toast.success('New record created successfully')
            }
        } catch (error) {
            toast.error(`Error adding new record: ${error}`)
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
                                       onChange={(e) => field.onChange(e.currentTarget.value)}/>
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
                                       onChange={(e) => field.onChange(e.currentTarget.value)}/>
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
                                       onChange={(e) => field.onChange(+e.currentTarget.value)}/>
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
                                       onChange={(e) => field.onChange(e.currentTarget.value)}/>
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