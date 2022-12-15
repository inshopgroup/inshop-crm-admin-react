import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
// import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface LoaderState {
    loading: number;
    error: string | null;
}

// Initial state
const initialState: LoaderState = {
    loading: 0,
    error: null,
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
        setError(state, action) {
            state.error = action.payload;
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

export const { loadingStart, loadingStop, setError } = loaderSlice.actions;

export const selectLoaderState = (state: AppState) => state.loader.loading;
export const selectErrorState = (state: AppState) => state.loader.error;

export default loaderSlice.reducer;
