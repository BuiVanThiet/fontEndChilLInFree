import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    Manufacturers: [],
    loadingManufacturer: false,
    errorManufacturer: null,
};

const ManufacturerSlice = createSlice({
    name: 'manufacturer',
    initialState,
    reducers: {
        setManufacturers: (state, action) => {
            state.Manufacturers = action.payload;
        },
        setLoading: (state, action) => {
            state.loadingManufacturer = action.payload;
        },
        setError: (state, action) => {
            state.errorManufacturer = action.payload;
        },
    },
});

export const { setManufacturers, setLoading, setError } = ManufacturerSlice.actions;

export default ManufacturerSlice.reducer;
