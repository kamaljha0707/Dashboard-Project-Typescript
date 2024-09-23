import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, } from "@/components/ui/card"

function SupportPage() {
  return (
   <>
     <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Support</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Support</CardTitle>
            <CardDescription>
            Our main objective is to deliver top-quality customer service.
            We want our customers to be happy that they’ve chosen us.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
          <p className="text-sm font-medium leading-none"> Olivia Martin </p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error esse dolorem optio totam fugiat earum quibusdam, natus aliquam, quas excepturi veritatis asperiores aperiam, nihil iusto perspiciatis eius facilis quod minima!
            </p>

            </div>
            <div className="mt-8">
          <p className="text-sm font-medium leading-none"> Olivia Martin </p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error esse dolorem optio totam fugiat earum quibusdam, natus aliquam, quas excepturi veritatis asperiores aperiam, nihil iusto perspiciatis eius facilis quod minima!
                <br />
            </p>

            </div>
          </CardContent>

        </Card>
    </>
  )
}

export default SupportPage
