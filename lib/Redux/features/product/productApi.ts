import { baseApi } from "../../api/baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (productInfo) => ({
        url: `/products/create`,
        method: "POST",
        body: productInfo,
      }),
      invalidatesTags: ["products"],
    }),

    getProducts: builder.query({
      query: () => ({
        url: `/products`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
  }),
});

export const { useCreateProductMutation, useGetProductsQuery } = productApi;
