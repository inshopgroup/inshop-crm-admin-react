import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import Label from '../model/Label'

export interface LabelState {
    items: Label[];
    totalItems: number;
    error: string | null;
}

const initialState: LabelState = {
    items: [],
    totalItems: 0,
    error: null,
};

export const labelSlice = createSlice({
    name: "label",
    initialState,
    reducers: {
        setItemsState(state, action) {
            console.log(action)
            if (action.payload !== undefined) {
                if (action.payload['hydra:member'] !== undefined) {
                    state.items = action.payload['hydra:member']
                }
                if (action.payload['hydra:totalItems'] !== undefined) {
                    state.totalItems = action.payload['hydra:totalItems']
                }
            }
        },
        setErrorState(state, action) {
            state.error = action.payload
        },
    },
});

export const { setItemsState, setErrorState } = labelSlice.actions;

export const selectLabelItems = (state: AppState) => state.label.items;
export const selectLabelTotalItems = (state: AppState) => state.label.totalItems;

export default labelSlice.reducer;
