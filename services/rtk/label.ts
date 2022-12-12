import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../../src/axios'

export const labelApi = createApi({
    reducerPath: 'labelApi',
    baseQuery: axiosBaseQuery({
        baseUrl: 'http://localhost:8888'
    }),
    endpoints: (builder) => ({
        getItems: builder.query({
            query: () => ({ url: '/labels', method: 'get' })
        }),
        getItem: builder.query({
            query: (id: number) => ({ url: `/labels/${id}`, method: 'get' })
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetItemsQuery, useGetItemQuery } = labelApi
