import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { labelSlice } from "./labelSlice";
import { loaderSlice } from "./loaderSlice";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
    configureStore({
        reducer: {
            [labelSlice.name]: labelSlice.reducer,
            [loaderSlice.name]: loaderSlice.reducer,
        },
        devTools: true,
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
    >;

export const wrapper = createWrapper<AppStore>(makeStore);
