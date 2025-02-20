import { setProductDetails, setLoading, setError } from '../reducers/ProductDetailSlice';
import { getAllProductDetail } from '../../API/ProductDetailAPI';

export const fetchProductDetail = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const data = await getAllProductDetail();
        dispatch(setProducts(data));
    } catch (error) {
        dispatch(setErrorProduct(error));
    } finally {
        dispatch(setLoadingProduct(false));
    }
    return;
};
