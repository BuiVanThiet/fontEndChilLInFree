// src/redux/colorActions.js
import { setSizes, setLoading, setError, setSizeByPR } from '../reducers/SizeSlice';
import { getAll, create, update, getSizeByIdPR } from '../../API/SizeAPI';

// Fetch all colors
export const fetchSize = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const data = await getAll();
        dispatch(setSizes(data));
    } catch (error) {
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
    return;
};

// Add new color and update list
export const addSize = (newColor) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await create(newColor);
        dispatch(fetchSize()); // Truyền typeAttribute vào
    } catch (error) {
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
    return;
};

// Update existing color and refresh list
export const updateSize = (color) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await update(color);
        dispatch(fetchSize()); // Truyền typeAttribute vào
    } catch (error) {
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
    return;
};

export const fetchSizeByPR = (idPR) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const data = await getSizeByIdPR(idPR);
        dispatch(setSizeByPR(data));
    } catch (error) {
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
    return;
};

