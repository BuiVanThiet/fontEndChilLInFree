// src/redux/colorSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    loadingProduct: false,
    errorProduct: null,
    productById: null,
    ListImage: []
};

const ProductSlide = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProductById: (state, action) => {
            console.log('data ben redux ', action.payload)
            state.productById = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setListImageProduct: (state, action) => {
            state.ListImage = action.payload;
        },
        setLoadingProduct: (state, action) => {
            state.loadingProduct = action.payload;
        },
        setErrorProduct: (state, action) => {
            state.errorProduct = action.payload;
        },
    },
});

export const { setProducts, setLoadingProduct, setErrorProduct, setProductById, setListImageProduct } = ProductSlide.actions;

export default ProductSlide.reducer;
