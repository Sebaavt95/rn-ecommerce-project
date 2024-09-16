import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../firebase/database';

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['userImage', 'userLocation', 'order'],
  endpoints: builder => ({
    getGenres: builder.query({
      query: () => 'genres.json',
    }),
    getMovies: builder.query({
      query: () => 'movies.json',
    }),
    getOrdersByUser: builder.query({
      query: id => `orders/${id}.json`,
      transformResponse: response => {
        if (!response) return [];
        return Object.entries(response).map(order => ({
          id: order[0],
          ...order[1],
        }));
      },
      providesTags: ['order'],
    }),
    postOrder: builder.mutation({
      query: ({ id, order }) => ({
        url: `orders/${id}.json`,
        method: 'post',
        body: order,
      }),
      invalidatesTags: ['order'],
    }),
    saveUserImage: builder.mutation({
      query: ({ image, id }) => ({
        url: `users/${id}.json`,
        method: 'patch',
        body: { image },
      }),
      invalidatesTags: ['userImage'],
    }),
    saveUserLocation: builder.mutation({
      query: ({ location, id }) => ({
        url: `users/${id}/locations.json`,
        method: 'post',
        body: location,
      }),
      invalidatesTags: ['userLocation'],
    }),
    saveFavouriteLocation: builder.mutation({
      query: ({ userId, location }) => ({
        url: `users/${userId}/favouriteLocation.json`,
        method: 'put',
        body: location,
      }),
      invalidatesTags: ['userLocation'],
    }),
    removeUserLocation: builder.mutation({
      query: ({ userId, locationId }) => ({
        url: `users/${userId}/locations/${locationId}.json`,
        method: 'delete',
      }),
      invalidatesTags: ['userLocation'],
    }),
    getProfileData: builder.query({
      query: id => `users/${id}.json`,
      transformResponse: response => {
        if (!response) return { image: '', locations: [] };
        if (!response.image) response.image = '';
        if (!response.locations) response.locations = [];
        return {
          ...response,
          locations: Object.entries(response?.locations).map(location => ({
            id: location[0],
            ...location[1],
          })),
        };
      },
      providesTags: ['userImage', 'userLocation'],
    }),
    deleteUserData: builder.mutation({
      query: ({ id }) => {
        return {
          url: `users/${id}.json`,
          method: 'delete',
        };
      },
    }),
  }),
});

export const {
  useGetGenresQuery,
  useGetMoviesQuery,
  useGetOrdersByUserQuery,
  usePostOrderMutation,
  useSaveUserImageMutation,
  useGetProfileDataQuery,
  useSaveUserLocationMutation,
  useRemoveUserLocationMutation,
  useSaveFavouriteLocationMutation,
  useDeleteUserDataMutation,
} = shopApi;
