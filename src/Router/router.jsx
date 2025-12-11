import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Page/Home";
import Auth from "../Layout/Auth";
import Login from "../AuthPage/Login";
import Regester from "../AuthPage/Regester";
import AboutUs from "../Page/AboutUs";
import WhyJoin from "../Page/WhyJoin";
import Error from "../Error And Loding Page/Error";
import Blog from "../Page/Blog";
import CreatClub from "../Page/CreatClub";
import PrivetRouter from "../Provider/PrivetRouter";
import ShowAllClub from "../Page/ShowAllClub";
import ClubDetail from "../Page/ClubDetail/ClubDetail";
import Dashboard from "../Layout/Dashboard";
import MyJoinedClubs from "../Page/Dashboard/MyJoinClub";
import PaymentSuccess from "../Page/PaymentClub/PaymentSuccess";
import PaymentCancel from "../Page/PaymentClub/PaymentCancel";
import Contact from "../Page/PageComponet/Contact";
import MyCreatClub from "../Page/Dashboard/MyCreatClub";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/aboutUs',
                element: <AboutUs></AboutUs>
            },
            {
                path: '/whyJoin',
                element: <WhyJoin></WhyJoin>
            },
            {
                path: '/creatAClub',
                element: <PrivetRouter><CreatClub></CreatClub></PrivetRouter>
            },
            {
                path: '/showAllClub',
                element: <ShowAllClub></ShowAllClub>
            },
            {
                path: '/showAllClub/:Id',
                element: <PrivetRouter><ClubDetail></ClubDetail></PrivetRouter>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path:'/contact',
                element:<Contact></Contact>
            }
        ]
    },
    {
        path: "/auth",
        element: <Auth></Auth>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/auth/login',
                element: <Login></Login>
            },
            {
                path: '/auth/regester',
                element: <Regester></Regester>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivetRouter><Dashboard></Dashboard></PrivetRouter>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/dashboard/myjoinclub',
                element: <MyJoinedClubs></MyJoinedClubs>
            },
            {
                path: '/dashboard/payment-success',
                element: <PaymentSuccess></PaymentSuccess>
            },
            {
                path: '/dashboard/payment-cancel',
                element: <PaymentCancel></PaymentCancel>
            },
            {
                path:'/dashboard/myCreatClub',
                element:<MyCreatClub></MyCreatClub>
            }
        ]
    }
]);
export default router