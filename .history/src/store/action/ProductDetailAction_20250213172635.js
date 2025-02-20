import { setProducts, setLoadingProduct, setErrorProduct, setProductById, setListImageProduct } from '../reducers/ProductSlice';
import { getAllProduct, update, create, fetchProductById } from '../../API/ProductAPI';
import { getListImageProduct, updateImageProduct, deleteImageProduct } from '../../API/ImageProductAPI';
