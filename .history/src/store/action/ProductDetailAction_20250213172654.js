import { setProductDetails, setLoadingProduct, setErrorProduct, setProductById, setListImageProduct } from '../reducers/ProductDetailSlice';
import { getAllProduct, update, create, fetchProductById } from '../../API/ProductAPI';
import { getListImageProduct, updateImageProduct, deleteImageProduct } from '../../API/ImageProductAPI';
