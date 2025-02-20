import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sizes: [],
    loadingSize: false,
    errorSize: null,
    sizeByPR: []
};

const SizeSlice = createSlice({
    name: 'size',
    initialState,
    reducers: {
        setSizes: (state, action) => {
            state.sizes = action.payload;
        },
        setLoading: (state, action) => {
            state.loadingSize = action.payload;
        },
        setError: (state, action) => {
            state.errorSize = action.payload;
        },
        setColorByPR: (state, action) => {
            state.colorByPR = action.payload
        }
    },
});

export const { setSizes, setLoading, setError } = SizeSlice.actions;

export default SizeSlice.reducer;
