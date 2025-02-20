import { setProductDetails, setLoading, setError } from '../reducers/ProductDetailSlice';
import { getAllProductDetail,addProductDetail } from '../../API/ProductDetailAPI';

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

export const getAddProductDetail = (list) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const data = await addProductDetail(id);
        dispatch(setProductDetails(data));
    } catch (error) {
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
    return;
};
