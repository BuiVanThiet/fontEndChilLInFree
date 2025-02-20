import { setProducts, setLoadingProduct, setErrorProduct, setProductById, setListImageProduct } from '../reducers/ProductSlice';
import { getAllProduct, update, create, fetchProductById } from '../../API/ProductAPI';
import { getListImageProduct, updateImageProduct, deleteImageProduct } from '../../API/ImageProductAPI';

import { SoundTwoTone } from '@ant-design/icons';

// Fetch all colors
export const fetchProduct = () => async (dispatch) => {
    dispatch(setLoadingProduct(true));
    try {
        const data = await getAllProduct();
        dispatch(setProducts(data));
    } catch (error) {
        dispatch(setErrorProduct(error));
    } finally {
        dispatch(setLoadingProduct(false));
    }
};

// Fetch all colors
export const getProduct = (id) => async (dispatch) => {
    dispatch(setLoadingProduct(true));
    try {
        const data = await fetchProductById(id);
        console.log('data ben action ', data)
        dispatch(setProductById(data));
    } catch (error) {
        dispatch(setErrorProduct(error));
    } finally {
        dispatch(setLoadingProduct(false));
    }
};

export const getImageProduct = (id) => async (dispatch) => {
    dispatch(setLoadingProduct(true));
    try {
        const data = await getListImageProduct(id);
        console.log('data ben action ', data)
        dispatch(setListImageProduct(data));
    } catch (error) {
        dispatch(setErrorProduct(error));
    } finally {
        dispatch(setLoadingProduct(false));
    }
};

export const updateProduct = (product) => async (dispatch) => {
    dispatch(setLoadingProduct(true));
    try {
        await update(product);
        console.log(product)
        dispatch(fetchProduct()); // Truyền typeAttribute vào
        // dispatch(getProduct(product.id));
        return 1;
    } catch (error) {
        dispatch(setErrorProduct(error));
        return 0;
    } finally {
        dispatch(setLoadingProduct(false));
    }
};


export const createProduct = (product, fileImage) => async (dispatch) => {
    dispatch(setLoadingProduct(true));
    try {
        const productData = await create(product);
        // await updateImageProduct(fileImage);
        dispatch(fetchProduct()); // Truyền typeAttribute vào
        return 1;
    } catch (error) {
        dispatch(setErrorProduct(error));
        return 0;
    } finally {
        dispatch(setLoadingProduct(false));
    }
};


//uploadImge
export const uploadImagePR = (fileImage) => async (dispatch) => {
    dispatch(setLoadingProduct(true));
    try {
        await updateImageProduct(fileImage);
        dispatch(fetchProduct()); // Truyền typeAttribute vào
    } catch (error) {
        dispatch(setErrorProduct(error));
    } finally {
        dispatch(setLoadingProduct(false));
    }
};

export const deleteImagePR = (fileImage) => async (dispatch) => {
    dispatch(setLoadingProduct(true));
    try {
        await deleteImageProduct(fileImage);
        dispatch(fetchProduct()); // Truyền typeAttribute vào
    } catch (error) {
        dispatch(setErrorProduct(error));
    } finally {
        dispatch(setLoadingProduct(false));
    }
};


