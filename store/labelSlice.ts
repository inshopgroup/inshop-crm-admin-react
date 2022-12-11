import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
// import { HYDRATE } from "next-redux-wrapper";
import Label from '../model/Label'

// Type for our state
export interface LabelState {
    items: Label[];
}

// Initial state
const initialState: LabelState = {
    items: [],
};

// Actual Slice
export const labelSlice = createSlice({
    name: "label",
    initialState,
    reducers: {
        setItemsState(state, action) {
            state.items = action.payload;
        },

        // Special reducer for hydrating the state. Special case for next-redux-wrapper
        // extraReducers: {
        //     [HYDRATE]: (state, action) => {
        //         return {
        //             ...state,
        //             ...action.payload.label,
        //         };
        //     },
        // },

    },
});

export const { setItemsState } = labelSlice.actions;

export const selectLabelState = (state: AppState) => state.label.items;

export default labelSlice.reducer;
