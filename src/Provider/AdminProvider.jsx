import React from 'react';
import useAuth from '../Hook/useAuth';
import useRole from '../Hook/useRole';
import Forbidden from '../Error And Loding Page/Forbidden';
import Loding from '../Error And Loding Page/Forbidden';



const AdminRoute = ({ children }) => {
    const { loading } = useAuth();
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <Loding></Loding>
    }

    if (role !== 'admin') {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default AdminRoute;