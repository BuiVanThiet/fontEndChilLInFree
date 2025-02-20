import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     productDetails: [],
//     loadingProductDetail: false,
//     errorProductDetail: null,
//     priceSeling: null
// };

// const ProductDetailSlice = createSlice({
//     name: 'productDetail',
//     initialState,
//     reducers: {
//         setProductDetails: (state, action) => {
//             state.productDetails = action.payload;
//         },
//         setLoading: (state, action) => {
//             state.loadingProductDetail = action.payload;
//         },
//         setError: (state, action) => {
//             state.errorProductDetail = action.payload;
//         },
//         setPriceSeling: (state, action) => {
//             state.priceSeling = action.payload;
//         },
//     },
// });

// export const { setProductDetails, setLoading, setError, setPriceSeling } = ProductDetailSlice.actions;

// export default ProductDetailSlice.reducer;

const initialState = {
    productDetail: null,
    priceSeling: null,
    loading: false,
    errorProductDetail: null,
};

const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState,
    reducers: {
        setProductDetails: (state, action) => {
            state.productDetail = action.payload;
        },
        setPriceSeling: (state, action) => {
            state.priceSeling = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.errorProductDetail = action.payload;  // Lưu thông tin lỗi (message và status)
        }
    }
});

export const { setProductDetails, setPriceSeling, setLoading, setError } = productDetailSlice.actions;
export default productDetailSlice.reducer;
