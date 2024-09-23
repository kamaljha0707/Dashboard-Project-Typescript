import { getBooks } from "@/Apis/api"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Books } from "@/Type"
import { useQuery } from "@tanstack/react-query"
import { LoaderCircle, MoreHorizontal, PlusCircle } from "lucide-react"
import { Link } from "react-router-dom"
export const description =
  "An books dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of books in a table with actions."


function BooksPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
    staleTime: 10000, // in Milli-seconds
  });



  return (
    <>
      <div className="flex justify-between items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Books</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Link to="/dashboard/books/create">
          <Button size="sm" className=" gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            </span>
            Add Book
          </Button>
        </Link>
      </div>

      {isLoading ? (<LoaderCircle className=" text-center w-full animate-spin" />) :
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Books</CardTitle>
            <CardDescription>
              Manage your books and view their sales performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="">Image</span>
                  </TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Genre</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Author name
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Created at
                  </TableHead>
                  <TableHead>
                    <span className="">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data.map((book: Books) => {
                  return (
                    <TableRow key={book._id}>
                      <TableCell className="hidden sm:table-cell">
                        <img
                          alt={book.title}
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={book.coverImage}
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{book.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">{book.genre}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {book.author?.name}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(book.createdAt).toLocaleDateString("en-GB", {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        }).replace(/\./g, '')}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
          {/* <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter> */}
        </Card>}
    </>
  );
};


export default BooksPage
