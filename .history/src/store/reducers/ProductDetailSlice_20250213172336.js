import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    productDetails: [],
    loadingProductDetail: false,
    errorProductDetail: null,
};

const OriginSlice = createSlice({
    name: 'productDetail',
    initialState,
    reducers: {
        setproductDetails: (state, action) => {
            state.origins = action.payload;
        },
        setLoading: (state, action) => {
            state.loadingOrigin = action.payload;
        },
        setError: (state, action) => {
            state.errorOrigin = action.payload;
        },
    },
});

export const { setOrigins, setLoading, setError } = OriginSlice.actions;

export default OriginSlice.reducer;
