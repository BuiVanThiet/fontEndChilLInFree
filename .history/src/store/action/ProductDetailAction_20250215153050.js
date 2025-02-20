import { setProductDetails, setLoading, setError } from '../reducers/ProductDetailSlice';
import { getAllProductDetail } from '../../API/ProductDetailAPI';

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
