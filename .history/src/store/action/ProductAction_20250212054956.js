import { setProducts, setLoadingProduct, setErrorProduct, setProductById, setListImageProduct } from '../reducers/ProductSlice';
import { getAllProduct, update, create, fetchProductById } from '../../API/ProductAPI';
import { getListImageProduct, updateImageProduct, deleteImageProduct } from '../../API/ImageProductAPI';

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
        const dataImage = await getListImageProduct(id);
        console.log('data ben action ', data)
        await dispatch(setProductById(data));
        await dispatch(setListImageProduct(dataImage));
    } catch (error) {
        dispatch(setErrorProduct(error));
    } finally {
        dispatch(setLoadingProduct(false));
    }
    return;
};

export const getImageProduct = (id) => async (dispatch) => {
    // dispatch(setLoadingProduct(true));
    // try {
    //     // const data = await getListImageProduct(id);
    //     // console.log('dât anh ben action: ', data, "id pr ", id)
    //     // dispatch(setListImageProduct(data));
    //     return;
    // } catch (error) {
    //     dispatch(setErrorProduct(error));
    // } finally {
    //     dispatch(setLoadingProduct(false));
    // }
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
        await create(product);
        // await updateImageProduct(fileImage);
        dispatch(fetchProduct()); // Truyền typeAttribute vào
        return;
    } catch (error) {
        dispatch(setErrorProduct(error));
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
        return;
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
        return;
    } catch (error) {
        dispatch(setErrorProduct(error));
    } finally {
        dispatch(setLoadingProduct(false));
    }
};

export const exitFormEditProduct = () => async (dispatch) => {
    dispatch(setLoadingProduct(true));
    try {
        dispatch(setProductById(null)); // Truyền typeAttribute vào
        dispatch(setListImageProduct(null));
        return;
    } catch (error) {
        dispatch(setErrorProduct(error));
    } finally {
        dispatch(setLoadingProduct(false));
    }
};

