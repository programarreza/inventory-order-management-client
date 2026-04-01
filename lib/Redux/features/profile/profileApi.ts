import { baseApi } from "../../api/baseApi";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      query: () => ({
        url: "/users/profile",
        method: "GET",
      }),
      providesTags: ["profile"],
    }),

    updateMyProfile: builder.mutation({
      query: (info: FormData) => ({
        url: `/users/profile/update`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const { useGetMyProfileQuery, useUpdateMyProfileMutation } = profileApi;
