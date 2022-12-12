import axios, {AxiosError, AxiosRequestConfig} from 'axios'
import {getSession} from "next-auth/react";
import {loadingStart, loadingStop} from "../store/loaderSlice";
import type {BaseQueryFn} from '@reduxjs/toolkit/query'
import {ToolkitStore} from "@reduxjs/toolkit/dist/configureStore";

export const initAxios = async (store: ToolkitStore) => {
    axios.interceptors.request.use(async request => {
        const session = await getSession();

        store.dispatch(loadingStart())

        if (session) {
            request.headers.Authorization = 'Bearer ' + session.token
        }

        return request;
    }, error => {
        console.log(error);
        return Promise.reject(error);
    });

    axios.interceptors.response.use(response => {
        store.dispatch(loadingStop())

        return response;
    }, error => {
        console.log(error);
        return Promise.reject(error);
    });
}

// axios.onError((e) => {
//   // store.dispatch('loadingStop')
//
//   const code = parseInt(e.response && e.response.status)
//   if (code === 401) {
//     store.dispatch('auth/logout').then(() => {
//       redirect('/')
//     })
//   }
//
//   if (code === 404) {
//     return error({ statusCode: 404, message: e.message })
//   }
// })

export const axiosBaseQuery = (
    {baseUrl}: { baseUrl: string } = {baseUrl: ''}
): BaseQueryFn<{
    url: string
    method: AxiosRequestConfig['method']
    data?: AxiosRequestConfig['data']
    params?: AxiosRequestConfig['params']
},
    unknown,
    unknown> =>
    async ({url, method, data, params}) => {
        try {
            const result = await axios({url: baseUrl + url, method, data, params})
            return {data: result.data}
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

export default axios;
