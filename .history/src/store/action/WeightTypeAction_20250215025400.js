// src/redux/colorActions.js
import { setWeightTypes, setLoading, setError } from '../reducers/WeightTypeSlice';
import { getAll, create, update } from '../../API/WeightTypeAPI';

// Fetch all colors
export const fetchWeightType = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const data = await getAll();
        console.log('data type action:')
        dispatch(setWeightTypes(data));
    } catch (error) {
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
    return;
};

// Add new color and update list
export const addWeightType = (newColor) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await create(newColor);
        dispatch(fetchWeightType()); // Truyền typeAttribute vào
    } catch (error) {
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
    return;
};

// Update existing color and refresh list
export const updateWeightType = (color) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await update(color);
        dispatch(fetchWeightType()); // Truyền typeAttribute vào
    } catch (error) {
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
    return;
};

