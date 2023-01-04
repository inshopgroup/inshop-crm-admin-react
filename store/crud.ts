import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../src/axios'
import {allowedModels, getRouteByModel, ModelInterface} from "../model/ModelInterface";
import {ListParamsInterface} from "../model/ListParamsInterface";

const allowedModelsKeys = Object.keys(allowedModels)

export const crudApi = createApi({
    reducerPath: 'crudApi',
    baseQuery: axiosBaseQuery({
        baseUrl: 'http://localhost:8888',
    }),
    tagTypes: allowedModelsKeys,
    endpoints: (builder) => ({
        getItems: builder.query({
            query: (params: ListParamsInterface) => ({
                url: `/${getRouteByModel(params['@type'])}`,
                method: 'get',
                params
            }),
            providesTags: (result = [], error, arg) => {
                const tags = [
                    { type: arg['@type'], id: 'NEW' }
                ]

                if (result && result['hydra:member']) {
                    tags.push(
                        ...result['hydra:member'].map(({ id } : { id: number }) => ({ type: arg['@type'], id }))
                    )
                }

                return tags
            }
        }),
        getItem: builder.query({
            query: (item: ModelInterface) => ({
                url: `/${getRouteByModel(item['@type'])}/${item.id}`,
                method: 'get'
            }),
            providesTags: (result, error, arg) => [{ type: arg['@type'], id: arg.id }]
        }),
        addItem: builder.mutation({
            query: (item: ModelInterface) => ({
                url: `/${getRouteByModel(item['@type'])}`,
                method: 'POST',
                data: item
            }),
            invalidatesTags: (result, error, arg) =>
                error === undefined ? [{type: arg['@type'], id: 'NEW'}] : []
        }),
        editItem: builder.mutation({
            query: (item: ModelInterface) => ({
                url: `/${getRouteByModel(item['@type'])}/${item.id}`,
                method: 'PUT',
                data: item
            }),
            invalidatesTags: (result, error, arg) =>
                error === undefined ? [{type: arg['@type'], id: arg.id}] : []
        }),
        deleteItem: builder.mutation({
            query: (item: ModelInterface) => ({
                url: `/${getRouteByModel(item['@type'])}/${item.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) =>
                error === undefined ? [{type: arg['@type'], id: arg.id}] : []
        })
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetItemsQuery,
    useGetItemQuery,
    useAddItemMutation,
    useEditItemMutation,
    useDeleteItemMutation,
} = crudApi
