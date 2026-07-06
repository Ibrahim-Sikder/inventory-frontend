/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "./baseApi";

export const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        createProduct: builder.mutation({
            query: (data) => ({
                url: "/products",
                method: "POST",
                data,
                contentType: "multipart/form-data",
            }),
            invalidatesTags: ["product"],
        }),
        getAllProducts: builder.query({
            query: ({ limit = 10, page = 1, searchTerm = "", category, minPrice, maxPrice, sort }) => ({
                url: "/products",
                method: "GET",
                params: {
                    limit,
                    page,
                    searchTerm,
                    category,
                    minPrice,
                    maxPrice,
                    sort,
                },
            }),
            providesTags: ["product"],
            transformResponse: (response: any) => {
                return response;
            },
        }),


        getSingleProduct: builder.query({
            query: (id) => ({
                url: `/products/${id}`,
                method: "GET",
            }),
            providesTags: ["product"],
            transformResponse: (response: any) => {
                return response;
            },
        }),
        updateProduct: builder.mutation({
            query: ({ id, data }) => ({
                url: `/products/${id}`,
                method: "PATCH",
                data,
                contentType: "multipart/form-data",
            }),
            invalidatesTags: ["product"],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["product"],
        }),

        getLowStockProducts: builder.query({
            query: () => ({
                url: "/products/low-stock",
                method: "GET",
            }),
            providesTags: ["product"],
            transformResponse: (response: any) => {
                return response;
            },
        }),
    }),
});

export const {
    useCreateProductMutation,
    useGetAllProductsQuery,
    useGetSingleProductQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetLowStockProductsQuery,
    useLazyGetAllProductsQuery,
    useLazyGetSingleProductQuery,
    useLazyGetLowStockProductsQuery,
} = productApi;