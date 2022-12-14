import { configureStore } from "@reduxjs/toolkit";
import { loaderSlice } from "./loaderSlice";
import { createWrapper } from "next-redux-wrapper";
import { labelApi } from '../services/rtk/label'

const makeStore = () =>
    configureStore({
        reducer: {
            [loaderSlice.name]: loaderSlice.reducer,
            [labelApi.reducerPath]: labelApi.reducer,
        },
        devTools: true,
        // devTools: process.env.NODE_ENV !== 'production',
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(labelApi.middleware),
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;

export const wrapper = createWrapper<AppStore>(makeStore, {debug: true});
