import {createBrowserRouter} from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import HomePage from "@/pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./components/ui/layouts/DashboardLayout";
import BooksPage from "./pages/BooksPage";


const router = createBrowserRouter([
    {
      path: "/",
      element: <DashboardLayout/>,
      children:[
        {
          path: 'home',
         element: < HomePage />
        },
        {
          path: 'books',
         element: < BooksPage />
        },
      ],
    },
    {
      path: "/login",
      element: < LoginPage />
    },
    {
      path: "/register",
      element: < RegisterPage />
    },
    {
      path: "/register",
      element: < RegisterPage />
    },
  ]);

  export default router
