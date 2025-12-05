import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';

import { AuthContext } from './AuthProvider';

const PrivetRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return <div className='min-h-screen flex justify-center items-center'>
            <span className="loading loading-ring loading-xl"></span>
        </div>
    }
    if (user && user?.email) {
        return children
    }
    return <Navigate state={location.pathname} to='/auth/login'></Navigate>
};

export default PrivetRouter;