import { baseApi } from "./baseApi";
import { TUser } from "../features/auth/authSlice";

interface LoginRequest {
  credential: string;
  password: string;

}

interface LoginResponse {
  data: TUser;
  message: string;
}

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({ url: "/auth/register", method: "POST", data }),
    }),

    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (data) => ({ url: "/auth/login", method: "POST", data }),
    }),

    refreshToken: builder.mutation({
      query: () => ({ url: "/auth/refresh-token", method: "POST" }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
    }),

    changePassword: builder.mutation({
      query: (data) => ({ url: "/auth/change-password", method: "POST", data }),
    }),

    getMe: builder.query<{ data: TUser }, void>({
      query: () => ({ url: "/auth/me", method: "GET" }),
      providesTags: ["user"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useChangePasswordMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
} = authApi;