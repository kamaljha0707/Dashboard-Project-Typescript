import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation } from "@tanstack/react-query"
import { useRef } from "react"
import { register } from "@/Apis/api"
import { LoaderCircle } from "lucide-react"
import useTokenStore from "@/store"

function RegisterPage() {
  const navigate = useNavigate()
  const setToken = useTokenStore((state) => state.setToken);
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const mutation = useMutation({
    mutationFn: register,
    onSuccess:(response)=>{
      setToken(response.data.accessToken)
      navigate('/dashboard/home')
    },


  })

  const handleRegisterSubmit= ()=>{
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if(!email || !password || !name){
      return alert('Please enter name,email and password')
    }
    
    mutation.mutate({name, email, password})
    

  }

  return (
    <section className="flex justify-center items-center h-screen"> 
    <Card className="w-full max-w-sm">
    <CardHeader>
      <CardTitle className="text-xl">Sign Up</CardTitle>
      <CardDescription>
        Enter your information to create an account
        {mutation.isError && (
            <span className="text-red-500 mt-4 text-sm">Enter vaild email or password</span>
          )}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input ref= {nameRef} id="name" placeholder="Rahul" required />
          </div>
        
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
             ref= {emailRef}
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" ref= {passwordRef} type="password" />
        </div>
        <Button type="submit" onClick={handleRegisterSubmit} disabled={mutation.isPending} className="w-full flex gap-3 item-center">
        {mutation.isPending && 
          (<LoaderCircle color="#ffffff" className= "animate-spin"/>)}
          <span>Create an account</span>
        
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link to="/auth/login" className="underline">
          Log In
        </Link>
      </div>
    </CardContent>
  </Card>
</section>
  )
}

export default RegisterPage
