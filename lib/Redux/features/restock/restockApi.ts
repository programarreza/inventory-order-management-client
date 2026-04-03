import { baseApi } from "../../api/baseApi";

export const restockApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRestocks: builder.query({
      query: () => ({
        url: `/restocks`,
        method: "GET",
      }),
      providesTags: ["restocks"],
    }),

    updateRestock: builder.mutation({
      query: (data) => ({
        url: `/restocks/update`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["restocks", "products"],
    }),
  }),
});

export const { useGetRestocksQuery, useUpdateRestockMutation } = restockApi;
