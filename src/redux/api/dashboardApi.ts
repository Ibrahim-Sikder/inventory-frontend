/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "./baseApi";

export const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardStats: builder.query({
            query: () => ({
                url: "/dashboard/stats",
                method: "GET",
            }),
            providesTags: ["dashboard", "product", "sale", "customer"],
            transformResponse: (response: any) => {
                return response;
            },
        }),
    }),
});

export const {
    useGetDashboardStatsQuery,
} = dashboardApi;