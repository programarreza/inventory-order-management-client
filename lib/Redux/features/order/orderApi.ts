import { baseApi } from "../../api/baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: `/orders`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),

    updateOrderStatus: builder.mutation({
      query: (data) => ({
        url: `/orders/status/update`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["orders"],
    }),

    addOrder: builder.mutation({
      query: (orderData) => ({
        url: `/orders/create`,
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["orders", "products"],
    }),
  }),
});

export const { useGetOrdersQuery, useUpdateOrderStatusMutation, useAddOrderMutation } = orderApi;
