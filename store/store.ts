import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { labelSlice } from "./labelSlice";
import { loaderSlice } from "./loaderSlice";
import { createWrapper } from "next-redux-wrapper";
import { labelApi } from '../services/rtk/label'

const makeStore = () =>
    configureStore({
        reducer: {
            [loaderSlice.name]: loaderSlice.reducer,
            [labelSlice.name]: labelSlice.reducer,
            [labelApi.reducerPath]: labelApi.reducer,
        },
        devTools: true,
        // devTools: process.env.NODE_ENV !== 'production',
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(labelApi.middleware),
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//     ReturnType,
//     AppState,
//     unknown,
//     Action
//     >;

export const wrapper = createWrapper<AppStore>(makeStore, {debug: true});
