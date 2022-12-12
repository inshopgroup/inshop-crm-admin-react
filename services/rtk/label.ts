import { createApi } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import axios from '../../src/axios'
import type { AxiosRequestConfig, AxiosError } from 'axios'

const axiosBaseQuery =
    (
        { baseUrl }: { baseUrl: string } = { baseUrl: '' }
    ): BaseQueryFn<
        {
            url: string
            method: AxiosRequestConfig['method']
            data?: AxiosRequestConfig['data']
            params?: AxiosRequestConfig['params']
        },
        unknown,
        unknown
        > =>
        async ({ url, method, data, params }) => {
            try {
                const result = await axios({ url: baseUrl + url, method, data, params })
                return { data: result.data }
            } catch (axiosError) {
                let err = axiosError as AxiosError
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                }
            }
        }

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
