import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { WinnerInfo } from '../types';

export const winnersApi = createApi({
  reducerPath: 'winners/api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:3000' }),
  tagTypes: ['Winners'],
  endpoints: (build) => ({
    getWinner: build.query<WinnerInfo, number>({
      query: (id) => ({ url: `/winners/${id}` }),
    }),
    createWinner: build.mutation<WinnerInfo, WinnerInfo>({
      query: (body) => ({ url: '/winners', method: 'POST', body }),
      invalidatesTags: [{ type: 'Winners', id: 'LIST' }],
    }),
    updateWinner: build.mutation<WinnerInfo, WinnerInfo>({
      query: ({ id, ...rest }) => ({ url: `/winners/${id}`, method: 'PUT', body: rest }),
      invalidatesTags: (_r, _e, arg) => [
        { type: 'Winners', id: arg.id },
        { type: 'Winners', id: 'LIST' },
      ],
    }),
    getWinners: build.query<
      { items: WinnerInfo[]; total: number },
      { page: number; limit: number; sort?: 'wins' | 'time'; order?: 'ASC' | 'DESC' }
    >({
      query: ({ page, limit, sort, order }) => {
        const params = new URLSearchParams();
        params.set('_page', String(page));
        params.set('_limit', String(limit));
        if (sort) params.set('_sort', sort);
        if (order) params.set('_order', order);
        return { url: `/winners?${params.toString()}`, method: 'GET' };
      },
      transformResponse: (response: WinnerInfo[], meta) => {
        const total = Number(meta?.response?.headers.get('X-Total-Count')) || response.length;
        return { items: response, total };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.items.map((w) => ({ type: 'Winners' as const, id: w.id })),
              { type: 'Winners' as const, id: 'LIST' },
            ]
          : [{ type: 'Winners', id: 'LIST' }],
    }),
    deleteWinner: build.mutation<void, number>({
      query: (id) => ({ url: `/winners/${id}`, method: 'DELETE' }),
      invalidatesTags: (_res, _err, id) => [{ type: 'Winners', id }],
    }),
  }),
});

export const {
  useGetWinnersQuery,
  useDeleteWinnerMutation,
  useLazyGetWinnerQuery,
  useCreateWinnerMutation,
  useUpdateWinnerMutation,
} = winnersApi;
