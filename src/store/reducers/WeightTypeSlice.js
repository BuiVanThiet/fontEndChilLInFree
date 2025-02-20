import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    weightTypes: [],
    loadingWeightType: false,
    errorWeightType: null,
};

const WeightTypeSlice = createSlice({
    name: 'weightType',
    initialState,
    reducers: {
        setWeightTypes: (state, action) => {
            state.weightTypes = action.payload;
        },
        setLoading: (state, action) => {
            state.loadingWeightType = action.payload;
        },
        setError: (state, action) => {
            state.errorWeightType = action.payload;
        },
    },
});

export const { setWeightTypes, setLoading, setError } = WeightTypeSlice.actions;

export default WeightTypeSlice.reducer;
