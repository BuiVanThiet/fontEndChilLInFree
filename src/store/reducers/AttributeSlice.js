// src/redux/colorSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    attributes: [],
    loading: false,
    error: null,
};

const attributeSlide = createSlice({
    name: 'attribute',
    initialState,
    reducers: {
        setAttributes: (state, action) => {
            state.attributes = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setAttributes, setLoading, setError } = attributeSlide.actions;

export default attributeSlide.reducer;
