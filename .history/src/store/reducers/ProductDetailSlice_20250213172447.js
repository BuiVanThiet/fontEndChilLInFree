import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    productDetails: [],
    loadingProductDetail: false,
    errorProductDetail: null,
};

const ProductDetailSlice = createSlice({
    name: 'productDetail',
    initialState,
    reducers: {
        setProductDetails: (state, action) => {
            state.origins = action.payload;
        },
        setLoading: (state, action) => {
            state.loadingProductDetail = action.payload;
        },
        setError: (state, action) => {
            state.errorProductDetail = action.payload;
        },
    },
});

export const { setProductDetails, setLoading, setError } = OriginSlice.actions;

export default OriginSlice.reducer;
