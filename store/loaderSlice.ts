import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
// import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface LoaderState {
    loading: number;
}

// Initial state
const initialState: LoaderState = {
    loading: 0,
};

// Actual Slice
export const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        loadingStart(state) {
            state.loading += 1;
        },
        loadingStop(state) {
            const loading = state.loading - 1;

            state.loading = loading < 0 ? 0 : loading;
        },

        // Special reducer for hydrating the state. Special case for next-redux-wrapper
        // extraReducers: {
        //     [HYDRATE]: (state, action) => {
        //         return {
        //             ...state,
        //             ...action.payload.loader,
        //         };
        //     },
        // },
    },
});

export const { loadingStart, loadingStop } = loaderSlice.actions;

export const selectLoaderState = (state: AppState) => state.loader.loading;

export default loaderSlice.reducer;
