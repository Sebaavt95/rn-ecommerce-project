import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_KEY, AUTH_BASE_URL } from '../firebase/database';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: AUTH_BASE_URL }),
  endpoints: builder => ({
    signUp: builder.mutation({
      query: ({ ...auth }) => ({
        url: `accounts:signUp?key=${API_KEY}`,
        method: 'post',
        body: auth,
      }),
    }),
    login: builder.mutation({
      query: ({ ...auth }) => ({
        url: `accounts:signInWithPassword?key=${API_KEY}`,
        method: 'post',
        body: auth,
      }),
    }),
    deleteAccount: builder.mutation({
      query: ({ token }) => {
        return {
          url: `accounts:delete?key=${API_KEY}`,
          method: 'post',
          body: { idToken: token },
        };
      },
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation, useDeleteAccountMutation } =
  authApi;
