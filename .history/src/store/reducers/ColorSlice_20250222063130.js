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
            state.errorColor = {
                status: action.payload?.status || "unknown",
                message: action.payload?.message || "Có lỗi xảy ra!",
                url: action.payload?.config?.url || "Không xác định",
            };
        },
        ,
        setColorByPR: (state, action) => {
            state.colorByPR = action.payload
        }
    },
});

export const { setColors, setLoading, setError, setColorByPR } = colorSlide.actions;

export default colorSlide.reducer;
