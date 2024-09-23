import useTokenStore from "@/store";
import axios from "axios";

const api =axios.create({
    baseURL:"http://localhost:5513",
    headers:{
        'Content-type':'application/json',
    },
})

api.interceptors.request.use((config)=>{
    const token = useTokenStore.getState().token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

// login api 
export const login = async(data:{email:string, password: string}) =>
     api.post('/api/users/login', data)

// register api 
export const register = async(data:{name: string, email:string, password: string}) =>
     api.post('/api/users/register', data)

// get books api 
export const getBooks = async () => api.get('/api/books');

// create books api 
export const createBook = async (data: FormData) => api.post('/api/books', data, {headers:{
    "Content-Type": "multipart/form-data"
}});
