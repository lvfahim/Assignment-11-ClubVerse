import React from 'react';
import Navber from '../Component/Navber';
import { Outlet } from 'react-router';
import Footer from '../Component/Footer';

const Auth = () => {
    return (
        <div>
            <Navber></Navber>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Auth;