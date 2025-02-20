// import { setProductDetails, setLoading, setError, setPriceSeling } from '../reducers/ProductDetailSlice';
// import { getAllProductDetail, addProductDetail, updateProductDetail, getPriceSeling } from '../../API/ProductDetailAPI';

// export const fetchProductDetail = (id) => async (dispatch) => {
//     dispatch(setLoading(true));
//     try {
//         const data = await getAllProductDetail(id);
//         dispatch(setProductDetails(data));
//     } catch (error) {
//         dispatch(setError(error));
//     } finally {
//         dispatch(setLoading(false));
//     }
//     return;
// };

// export const getAddProductDetail = (list) => async (dispatch) => {
//     dispatch(setLoading(true));
//     try {
//         await addProductDetail(list);
//     } catch (error) {
//         dispatch(setError(error));
//     } finally {
//         dispatch(setLoading(false));
//     }
//     return;
// };

// export const getUpdateProductDetail = (list, id) => async (dispatch) => {
//     dispatch(setLoading(true));
//     try {
//         await updateProductDetail(list);
//         dispatch(fetchProductDetail(id));
//     } catch (error) {
//         dispatch(setError(error));
//     } finally {
//         dispatch(setLoading(false));
//     }
//     return;
// };

// export const fetchPriceSeling = (id, idS, idC) => async (dispatch) => {
//     dispatch(setLoading(true));
//     try {
//         const data = await getPriceSeling(id, idC, idS);
//         dispatch(setPriceSeling(data));
//     } catch (error) {
//         dispatch(setError(error));
//     } finally {
//         dispatch(setLoading(false));
//     }
//     return;
// };
