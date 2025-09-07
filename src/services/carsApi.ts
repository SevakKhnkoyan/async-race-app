import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { Car } from '../types'

type PaginatedCars = { items: Car[]; total: number }

export const carsApi = createApi({
  reducerPath: 'cars/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:3000',
  }),
  tagTypes: ['Cars'],
  endpoints: (build) => ({
    getCars: build.query<PaginatedCars, { page: number; limit?: number }>({
      query: ({ page, limit = 10 }) => ({
        url: '/garage',
        params: { _page: page, _limit: limit },
      }),
      transformResponse: (response: Car[], meta): PaginatedCars => ({
        items: response,
        total: Number(meta?.response?.headers.get('X-Total-Count') ?? 0),
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map((c) => ({ type: 'Cars' as const, id: c.id })),
              { type: 'Cars' as const, id: 'LIST' },
            ]
          : [{ type: 'Cars' as const, id: 'LIST' }],
    }),
    createCar: build.mutation<Car, Omit<Car, 'id'>>({
      query: (car) => ({
        url: `/garage`,
        method: 'POST',
        body: car,
      }),
      invalidatesTags: [{ type: 'Cars', id: 'LIST' }],
    }),
  }),
});

export const {useGetCarsQuery, useCreateCarMutation } = carsApi