/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "./baseApi";

export const customerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createCustomer: builder.mutation({
            query: (data) => ({
                url: "/customers",
                method: "POST",
                data,
            }),
            invalidatesTags: ["customer"],
        }),

        getAllCustomers: builder.query({
            query: ({ limit = 10, page = 1, searchTerm = "", sort }) => ({
                url: "/customers",
                method: "GET",
                params: {
                    limit,
                    page,
                    searchTerm,
                    sort,
                },
            }),
            providesTags: ["customer"],
            transformResponse: (response: any) => {
                return response;
            },
        }),
        getSingleCustomer: builder.query({
            query: (id) => ({
                url: `/customers/${id}`,
                method: "GET",
            }),
            providesTags: ["customer"],
            transformResponse: (response: any) => {
                return response;
            },
        }),

        updateCustomer: builder.mutation({
            query: ({ id, data }) => ({
                url: `/customers/${id}`,
                method: "PATCH",
                data,
            }),
            invalidatesTags: ["customer"],
        }),

        deleteCustomer: builder.mutation({
            query: (id) => ({
                url: `/customers/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["customer"],
        }),
    }),
});

export const {
    useCreateCustomerMutation,
    useGetAllCustomersQuery,
    useGetSingleCustomerQuery,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation,
    useLazyGetAllCustomersQuery,
    useLazyGetSingleCustomerQuery,
} = customerApi;