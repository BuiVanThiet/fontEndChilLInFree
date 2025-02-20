import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categores: [],
    loadingCategory: false,
    errorCategory: null,
};

const categorySlide = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategores: (state, action) => {
            state.categores = action.payload;
        },
        setLoading: (state, action) => {
            state.loadingCategory = action.payload;
        },
        setError: (state, action) => {
            state.errorCategory = action.payload;
        },
    },
});

export const { setCategores, setLoading, setError } = categorySlide.actions;

export default categorySlide.reducer;
