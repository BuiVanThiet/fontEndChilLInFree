import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    colors: [],
    loadingColor: false,
    errorColor: null,
    colorByPR: []
};

const colorSlide = createSlice({
    name: 'color',
    initialState,
    reducers: {
        setColors: (state, action) => {
            state.colors = action.payload;
        },
        setLoading: (state, action) => {
            state.loadingColor = action.payload;
        },
        setError: (state, action) => {
            state.errorColor = action.payload;
        },
        setColorBy
    },
});

export const { setColors, setLoading, setError } = colorSlide.actions;

export default colorSlide.reducer;
