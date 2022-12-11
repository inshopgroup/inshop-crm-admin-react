import axios from 'axios'
import { getSession } from "next-auth/react";
import { loadingStart, loadingStop } from "../store/loaderSlice";

export const initAxios = async (store) => {
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

export default axios;
