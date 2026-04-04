import { baseApi } from "../../api/baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => ({
        url: "/dashboard/stats",
        method: "GET",
      }),
      providesTags: ["orders", "products"],
    }),
  }),
});

export const { useGetDashboardStatsQuery } = dashboardApi;
