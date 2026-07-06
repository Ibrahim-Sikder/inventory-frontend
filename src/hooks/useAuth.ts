import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout as logoutAction } from "../redux/features/auth/authSlice";
import { useLogoutMutation } from "../redux/api/auth.api";

export function useAuth() {
    const dispatch = useAppDispatch();
    const { user, isLoading } = useAppSelector((state) => state.auth);
    const [logoutMutation] = useLogoutMutation();

    const logout = async () => {
        try {
            await logoutMutation(undefined).unwrap();
        } finally {
            dispatch(logoutAction());
        }
    };

    return {
        user,
        isAuthenticated: !!user,
        isLoading,
        logout,
    };
}