// src/redux/colorActions.js
import { setColors, setLoading, setError, setColorByPR } from '../reducers/ColorSlice';
import { getAll, create, update, getColorByIdPR } from '../../API/ColorAPI';

// Fetch all colors
export const fetchColor = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const data = await getAll();
        console.log('da ta mau:', .data)
        dispatch(setColors(data));
    } catch (error) {
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
    return;
};

// Add new color and update list
export const addColor = (newColor) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await create(newColor);
        dispatch(fetchColor()); // Truyền typeAttribute vào
    } catch (error) {
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
    return;
};

// Update existing color and refresh list
export const updateColor = (color) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await update(color);
        dispatch(fetchColor()); // Truyền typeAttribute vào
    } catch (error) {
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
    return;
};

export const fetchColorByPR = (idPR) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const data = await getColorByIdPR(idPR);
        dispatch(setColorByPR(data));
    } catch (error) {
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
    return;
};
