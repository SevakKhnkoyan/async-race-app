// services/winnersApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type WinnerRow = { id: number; wins: number; time: number };

export const winnersApi = createApi({
  reducerPath: 'winners/api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:3000' }),
  tagTypes: ['Winners'],
  endpoints: (build) => ({
    getWinner: build.query<WinnerRow, number>({
      query: (id) => ({ url: `/winners/${id}` }),
    }),
    createWinner: build.mutation<WinnerRow, WinnerRow>({
      query: (body) => ({ url: '/winners', method: 'POST', body }),
      invalidatesTags: [{ type: 'Winners', id: 'LIST' }],
    }),
    updateWinner: build.mutation<WinnerRow, WinnerRow>({
      query: ({ id, ...rest }) => ({ url: `/winners/${id}`, method: 'PUT', body: rest }),
      invalidatesTags: (_r, _e, arg) => [{ type: 'Winners', id: arg.id }, { type: 'Winners', id: 'LIST' }],
    }),
  }),
});

export const {
  useLazyGetWinnerQuery,
  useCreateWinnerMutation,
  useUpdateWinnerMutation,
} = winnersApi;
