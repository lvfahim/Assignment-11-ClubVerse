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
import ApproveClub from "../Page/Dashboard/ApproveClub";
import ManageUser from "../Page/Dashboard/ManageUser";
import AdminRoute from "../Provider/AdminProvider";
import MypaymentClub from "../Page/Dashboard/MypaymentClub";
import MyCreatedEvent from "../Page/Dashboard/MyCreatedEvent";
import ShowAllEvent from "../Page/ShowAllEvent";
import MyJoinEvent from "../Page/Dashboard/MyJoinEvent";
import MyPaymentEvent from "../Page/Dashboard/MyPaymentEvent";
import EventDetail from "../Page/ClubDetail/EventDetail";
import PaymentCancelEvent from "../Page/PaymentEvent/PaymentCancelEvent";
import PaymentSuccessEvent from "../Page/PaymentEvent/PaymentSuccessEvent";
import AllPaymentForClubs from "../Page/Dashboard/AllPaymentForClubs";
import AllPaymentForEvent from "../Page/Dashboard/AllPaymentForEvent";
import ManagerProvider from "../Provider/ManagerProvider";

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
                path: '/showAllEvent',
                element: <ShowAllEvent></ShowAllEvent>
            },
            {
                path: '/showAllClub/:Id',
                element: <PrivetRouter><ClubDetail></ClubDetail></PrivetRouter>
            },
            {
                path: '/showAllEvent/:Id',
                element: <PrivetRouter><EventDetail></EventDetail></PrivetRouter>
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
            },
            {
                path:'/dashboard/myCreatEvent',
                element:<MyCreatedEvent></MyCreatedEvent>
            },
            {
                path:'/dashboard/myJoinEvent',
                element:<MyJoinEvent></MyJoinEvent>
            },
            {
                path:'/dashboard/myPaymentEvent',
                element:<MyPaymentEvent></MyPaymentEvent>
            },
             {
                path: '/dashboard/payment-success-event',
                element: <PaymentSuccessEvent></PaymentSuccessEvent>
            },
            {
                path: '/dashboard/payment-cancel-event',
                element: <PaymentCancelEvent></PaymentCancelEvent>
            },
            {
                path:'/dashboard/myPaymentClub',
                element:<MypaymentClub></MypaymentClub>
            },
            {
                path:'/dashboard/approveClub',               
                element:<AdminRoute><ApproveClub></ApproveClub></AdminRoute>
            },
            {
                path:'/dashboard/manageUser',
                element:<AdminRoute><ManageUser></ManageUser></AdminRoute>
            },
            {
                path:'/dashboard/allPaymentClub',
                element:<ManagerProvider><AllPaymentForClubs></AllPaymentForClubs></ManagerProvider>
            },
            {
                path:'/dashboard/allPaymentEvent',
                element:<ManagerProvider><AllPaymentForEvent></AllPaymentForEvent></ManagerProvider>
            }
        ]
    }
]);
export default router