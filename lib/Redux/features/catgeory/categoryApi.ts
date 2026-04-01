import { baseApi } from "../../api/baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (categoryInfo) => ({
        url: `/categories/create`,
        method: "POST",
        body: categoryInfo,
      }),
      invalidatesTags: ["categories"],
    }),

    getCategories: builder.query({
      query: () => ({
        url: `/categories`,
        method: "GET",
      }),
      providesTags: ["categories"],
    }),
  }),
});

export const { useCreateCategoryMutation, useGetCategoriesQuery } = categoryApi;
