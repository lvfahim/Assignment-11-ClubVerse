import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Page/Home";
import Auth from "../Layout/Auth";
import Login from "../AuthPage/Login";
import Regester from "../AuthPage/Regester";
import AboutUs from "../Page/AboutUs";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path:'/aboutUs',
                element:<AboutUs></AboutUs>
            }
        ]
    },
    {
        path: "/auth",
        element: <Auth></Auth>,
        children: [
            {
                path: '/auth/login',
                element: <Login></Login>
            },
            {
                path:'/auth/regester',
                element:<Regester></Regester>
            }
        ]
    }
]);
export default router