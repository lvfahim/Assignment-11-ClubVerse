import useAuth from '../Hook/useAuth';
import useRole from '../Hook/useRole';
import Forbidden from '../Error And Loding Page/Forbidden';
import Loding from '../Error And Loding Page/Loding';

const ManagerProvider = ({ children }) => {
    const { loading } = useAuth();
    const { role, roleLoading } = useRole();

    if (loading || roleLoading) {
        return <Loding />;
    }

    if (role !== 'manager' && role !== 'admin') {
        return <Forbidden />;
    }

    return children;
};

export default ManagerProvider;