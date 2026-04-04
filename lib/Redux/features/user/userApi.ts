import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: `/users/create-user`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
    getUsers: builder.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    getSingleMember: builder.query({
      query: (email) => ({
        url: `/users/${email}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSingleMemberQuery, useGetUsersQuery } = authApi;
