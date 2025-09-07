import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Car } from '../types';

type PaginatedCars = { cars: Car[]; total: number };

export const carsApi = createApi({
  reducerPath: 'cars/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:3000',
  }),
  tagTypes: ['Cars'],
  endpoints: (build) => ({
    getCars: build.query<PaginatedCars, { page: number; limit?: number }>({
      query: ({ page, limit }) => ({
        url: '/garage',
        params: { _page: page, _limit: limit },
      }),
      transformResponse: (response: Car[], meta): PaginatedCars => ({
        cars: response,
        total: Number(meta?.response?.headers.get('X-Total-Count') ?? 0),
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.cars.map((c) => ({ type: 'Cars' as const, id: c.id })),
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
    updateCar: build.mutation<Car, { id: number; name: string; color: string }>({
      query: ({ id, name, color }) => ({
        url: `/garage/${id}`,
        method: 'PUT',
        body: { name, color },
      }),
      invalidatesTags: (_res, _err, arg) => [
        { type: 'Cars', id: arg.id },
        { type: 'Cars', id: 'LIST' },
      ],
    }),
    deleteCar: build.mutation<void, number>({
      query: (id) => ({
        url: `/garage/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_res, _err, id) => [
        { type: 'Cars', id },
        { type: 'Cars', id: 'LIST' },
      ],
    }),
  }),
});

export const { useGetCarsQuery, useCreateCarMutation, useUpdateCarMutation, useDeleteCarMutation } =
  carsApi;
