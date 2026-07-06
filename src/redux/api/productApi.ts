/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "./baseApi";

export const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Create Product
        createProduct: builder.mutation({
            query: (data) => ({
                url: "/products",
                method: "POST",
                data,
                contentType: "multipart/form-data",
            }),
            invalidatesTags: ["product"],
        }),

        // Get All Products with pagination, search, filters
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

        // Get Single Product
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

        // Update Product
        updateProduct: builder.mutation({
            query: ({ id, data }) => ({
                url: `/products/${id}`,
                method: "PATCH",
                data,
                contentType: "multipart/form-data",
            }),
            invalidatesTags: ["product"],
        }),

        // Delete Product
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["product"],
        }),

        // Get Low Stock Products
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