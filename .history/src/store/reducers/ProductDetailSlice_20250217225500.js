import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    productDetails: [],
    priceSeling: null,
    loadingProductDetail: false,
    errorProductDetail: null,

};

const ProductDetailSlice = createSlice({
    name: 'productDetail',
    initialState,
    reducers: {
        setProductDetails: (state, action) => {
            state.productDetails = action.payload;
        },
        setPriceSeling: (state, action) => {
            state.priceSeling = action.payload;
        },
        setLoading: (state, action) => {
            state.loadingProductDetail = action.payload;
        },
        setError: (state, action) => {
            state.errorProductDetail = action.payload;
        },

    },
});

export const { setProductDetails, setLoading, setError, setPriceSeling } = ProductDetailSlice.actions;

export default ProductDetailSlice.reducer;
