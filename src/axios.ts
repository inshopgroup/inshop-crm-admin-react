import axios, {AxiosError, AxiosRequestConfig} from 'axios'
import {getSession} from "next-auth/react";
import {loadingStart, loadingStop, setError} from "../store/loaderSlice";
import type {BaseQueryFn} from '@reduxjs/toolkit/query'
import {ToolkitStore} from "@reduxjs/toolkit/dist/configureStore";
import {signOut} from "next-auth/react";

export const initAxios = async (store: ToolkitStore) => {
    axios.interceptors.request.use(async request => {
        store.dispatch(loadingStart())
        store.dispatch(setError(null))

        const session = await getSession();

        if (session) {
            // @ts-ignore
            request.headers.Authorization = 'Bearer ' + session.token
        }

        return request;
    }, error => {
        // console.log(error);
        return Promise.reject(error);
    });

    axios.interceptors.response.use(response => {
        store.dispatch(loadingStop())

        return response;
    }, error => {
        store.dispatch(loadingStop())
        store.dispatch(setError("Something went wrong, can't proceed request"))

        if (error.response.status === 401) {
            signOut();
        }

        return Promise.reject(error);
    });
}

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
