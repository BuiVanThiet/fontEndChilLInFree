import { setProductDetails, setLoading, setError } from '../reducers/ProductDetailSlice';
import { getAllProductDetail, addProductDetail, updateProductDetail } from '../../API/ProductDetailAPI';

export const fetchProductDetail = (id) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const data = await getAllProductDetail(id);
        dispatch(setProductDetails(data));
    } catch (error) {
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
    return;
};

export const getAddProductDetail = (list, id) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await addProductDetail(list);
        dispatch(fetchProductDetail(id));
    } catch (error) {
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
    return;
};

export const getUpdateProductDetail = (list, id) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await updateProductDetail(list);
        dispatch(fetchProductDetail(id));
    } catch (error) {
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
    return;
};
