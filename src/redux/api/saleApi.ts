/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "./baseApi";

export const saleApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Create Sale
        createSale: builder.mutation({
            query: (data) => ({
                url: "/sales",
                method: "POST",
                data,
            }),
            invalidatesTags: ["sale", "product"],
        }),

        // Get All Sales
        getAllSales: builder.query({
            query: ({
                limit = 10,
                page = 1,
                customer,
                startDate,
                endDate,
                sort = "-createdAt"
            }) => ({
                url: "/sales",
                method: "GET",
                params: {
                    limit,
                    page,
                    customer,
                    startDate,
                    endDate,
                    sort,
                },
            }),
            providesTags: ["sale"],
            transformResponse: (response: any) => {
                return response;
            },
        }),

        // Get Single Sale
        getSingleSale: builder.query({
            query: (id) => ({
                url: `/sales/${id}`,
                method: "GET",
            }),
            providesTags: ["sale"],
            transformResponse: (response: any) => {
                return response;
            },
        }),

        // Get Sales Stats
        getSalesStats: builder.query({
            query: ({ startDate, endDate }) => ({
                url: "/sales/stats",
                method: "GET",
                params: {
                    startDate,
                    endDate,
                },
            }),
            providesTags: ["sale"],
            transformResponse: (response: any) => {
                return response;
            },
        }),
    }),
});

export const {
    useCreateSaleMutation,
    useGetAllSalesQuery,
    useGetSingleSaleQuery,
    useGetSalesStatsQuery,
    useLazyGetAllSalesQuery,
    useLazyGetSingleSaleQuery,
    useLazyGetSalesStatsQuery,
} = saleApi;