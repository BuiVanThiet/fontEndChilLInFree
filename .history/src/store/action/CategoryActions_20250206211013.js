// src/redux/colorActions.js
import { setCategores, setLoading, setError } from '../reducers/CategorySlice';
import { getAll, create, update } from '../../API/CategoryAPI';

// Fetch all colors
export const fetchCategory = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const data = await getAll();
        dispatch(setCategores(data));
    } catch (error) {
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
};

// Add new color and update list
export const addCategory = (newColor) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await create(newColor);
        dispatch(fetchCategory()); // Truyền typeAttribute vào
    } catch (error) {
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
};

// Update existing color and refresh list
export const updateCategory = (color) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await update(color);
        dispatch(fetchCategory()); // Truyền typeAttribute vào
    } catch (error) {
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
};

