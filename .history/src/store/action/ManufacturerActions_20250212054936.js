// src/redux/colorActions.js
import { setManufacturers, setLoading, setError } from '../reducers/ManufacturerSlice';
import { getAll, create, update } from '../../API/ManufacturerAPI';

// Fetch all colors
export const fetchManufacturer = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const data = await getAll();
        dispatch(setManufacturers(data));
    } catch (error) {
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
    return;
};

// Add new color and update list
export const addManufacturer = (newColor) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await create(newColor);
        dispatch(fetchManufacturer()); // Truyền typeAttribute vào
    } catch (error) {
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
};

// Update existing color and refresh list
export const updateManufacturer = (color) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await update(color);
        dispatch(fetchManufacturer()); // Truyền typeAttribute vào
    } catch (error) {
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
};

