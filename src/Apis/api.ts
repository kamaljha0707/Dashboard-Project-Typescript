import axios from "axios";

const api =axios.create({
    baseURL:"http://localhost:5513",
    headers:{
        'Content-type':'application/json',
    },
})


// login apis 
export const login = async(data:{email:string, password: string}) =>
     api.post('/api/users/login', data)

