// src/redux/colorActions.js
import { setAttributes, setLoading, setError } from '../reducers/AttributeSlice';
import { getAllAttribute, createAttribute, updateAttribute } from '../../API/AtributeAPI';

// Fetch all colors
export const fetchAttribute = (typeAttribute) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const data = await getAllAttribute(typeAttribute);
        dispatch(setAttributes(data));
    } catch (error) {
        dispatch(setError('Error loading colors'));
    } finally {
        dispatch(setLoading(false));
    }
    return;
};

// Add new color and update list
export const addAttribute = (newColor, typeAttribute) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await createAttribute(newColor, typeAttribute);
        dispatch(fetchAttribute(typeAttribute)); // Truyền typeAttribute vào
    } catch (error) {
        dispatch(setError('Error adding new color'));
    } finally {
        dispatch(setLoading(false));
    }
    return;
};

// Update existing color and refresh list
export const updateAttributeAction = (color, typeAttribute) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await updateAttribute(color, typeAttribute);
        dispatch(fetchAttribute(typeAttribute)); // Truyền typeAttribute vào
    } catch (error) {
        dispatch(setError('Error updating color'));
    } finally {
        dispatch(setLoading(false));
    }
    return;
};

