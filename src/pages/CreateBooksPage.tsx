import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { LoaderCircle } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate } from "react-router-dom"
import { createBook } from "@/Apis/api"


const formSchema = z.object({
    title: z.string().min(2, {
        message: 'Title must be at least 2 characters.',
    }),
    genre: z.string().min(2, {
        message: 'Genre must be at least 2 characters.',
    }),
    description: z.string().min(2, {
        message: 'Description must be at least 2 characters.',
    }),
    coverImage: z.instanceof(FileList).refine((file) => {
        return file.length == 1;
    }, 'Cover Image is required'),
    file: z.instanceof(FileList).refine((file) => {
        return file.length == 1;
    }, 'Book PDF is required'),
});


function CreateBooksPage() {
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            genre: '',
            description: '',
        },
    });

    const coverImageRef = form.register('coverImage');
    const fileRef = form.register('file');

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createBook,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['books'] });
            navigate('/dashboard/books');
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const formdata = new FormData();
        formdata.append('title', values.title);
        formdata.append('genre', values.genre);
        formdata.append('description', values.description);
        formdata.append('coverImage', values.coverImage[0]);
        formdata.append('file', values.file[0]);
        mutation.mutate(formdata);
    }




    return (
        <section>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex justify-between items-center">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/dashboard/books">Books</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Create</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className="flex gap-2">
                            <Link to="/dashboard/books">
                            <Button size="sm" variant={"outline"} className=" gap-1">
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                </span>
                                Cancel
                            </Button>
                            </Link>
                            <Button type="submit" disabled={mutation.isPending} >
                                {mutation.isPending && <LoaderCircle className="animate-spin" />}
                                <span className="ml-2">Submit</span>
                            </Button>

                        </div>
                    </div>
                    <Card className="mt-6" x-chunk="dashboard-06-chunk-0">
                        <CardHeader>
                            <CardTitle>Create a new Book</CardTitle>
                            <CardDescription>
                                Fill out the form below to create a new book.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input type="text" className="w-full" {...field} placeholder="Do Epic Shit" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField control={form.control} name="genre" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Genre</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="genre"
                                                type="text"
                                                className="w-full"
                                                placeholder="Non Fiction"

                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="description" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                id="description"
                                                className="w-full"
                                                placeholder="Add Book Description"

                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="coverImage" render={() => (
                                    <FormItem>
                                        <FormLabel>Cover Image</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="coverImage"
                                                type="file"
                                                className="w-full"

                                                {...coverImageRef}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="file" render={() => (
                                    <FormItem>
                                        <FormLabel>Upload Pdf</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="file"
                                                type="file"
                                                className="w-full"
                                                {...fileRef}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                        </CardContent>
                    </Card>
                </form>

            </Form>


        </section>
    )
}

export default CreateBooksPage
