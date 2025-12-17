import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        isLoading: roleLoading,
        data: role = 'user',
    } = useQuery({
        enabled: !!user?.email,   // ⭐ VERY IMPORTANT
        queryKey: ['user-role', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/role`);
            return res.data?.role || 'user';
        },
    });

    return { role, roleLoading, authLoading: loading };
};

export default useRole;