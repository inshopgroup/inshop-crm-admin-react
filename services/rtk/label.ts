import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../../src/axios'
import Label from "../../model/Label";

export const labelApi = createApi({
    reducerPath: 'labelApi',
    baseQuery: axiosBaseQuery({
        baseUrl: 'http://localhost:8888',
    }),
    tagTypes: ['Label'],
    endpoints: (builder) => ({
        getLabels: builder.query({
            query: (params: object) => ({ url: '/labels', method: 'get', params}),
            providesTags: (result = [], error, arg) => [
                { type: 'Label', id: 'NEW' },
                ...result['hydra:member'].map(({ id } : { id: number }) => ({ type: 'Label', id }))
            ]
        }),
        getLabel: builder.query({
            query: (id: number) => ({ url: `/labels/${id}`, method: 'get' }),
            providesTags: (result, error, arg) => [{ type: 'Label', id: arg }]
        }),
        addLabel: builder.mutation({
            query: (item: Label) => ({
                url: '/labels',
                method: 'POST',
                data: item
            }),
            invalidatesTags: (result, error, arg) =>
                error === undefined ? [{type: 'Label', id: 'NEW'}] : []
        }),
        editLabel: builder.mutation({
            query: (item: Label) => ({
                url: `/labels/${item.id}`,
                method: 'PUT',
                data: item
            }),
            invalidatesTags: (result, error, arg) =>
                error === undefined ? [{type: 'Label', id: arg.id}] : []
        }),
        deleteLabel: builder.mutation({
            query: (id: number) => ({
                url: `/labels/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) =>
                error === undefined ? [{type: 'Label', id: arg}] : []
        })
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetLabelsQuery,
    useGetLabelQuery,
    useAddLabelMutation,
    useEditLabelMutation,
    useDeleteLabelMutation,
} = labelApi
