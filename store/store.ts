import { configureStore } from "@reduxjs/toolkit";
import { loaderSlice } from "./loaderSlice";
import { createWrapper } from "next-redux-wrapper";
import {crudApi} from "./crud";

const makeStore = () =>
    configureStore({
        reducer: {
            [loaderSlice.name]: loaderSlice.reducer,
            [crudApi.reducerPath]: crudApi.reducer,
        },
        devTools: true,
        // devTools: process.env.NODE_ENV !== 'production',
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(crudApi.middleware),
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;

export const wrapper = createWrapper<AppStore>(makeStore, {debug: true});
