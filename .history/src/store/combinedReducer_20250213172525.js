import { combineReducers } from '@reduxjs/toolkit';
import rootReducer from './reducers/RootReducer';  // Reducer chính
import attributeSlice from './reducers/AttributeSlice';// Reducer cho colorSlice
import productSlice from './reducers/ProductSlice';// Reducer cho colorSlice
//attribute
import colorSlice from './reducers/ColorSlice';
import categorySlice from './reducers/CategorySlice';
import manufacturerSlice from './reducers/ManufacturerSlice';
import originSlice from './reducers/OriginSlice';
import sizeSlice from './reducers/SizeSlice';
import weightTypeSlice from './reducers/WeightTypeSlice';
import productDetailSlice from './'

const combinedReducer = combineReducers({
    root: rootReducer,      // Dữ liệu chính
    attribute: attributeSlice,    // Dữ liệu về màu sắc
    product: productSlice,
    //attribute
    color: colorSlice,
    category: categorySlice,
    manufacturer: manufacturerSlice,
    origin: originSlice,
    size: sizeSlice,
    weightType: weightTypeSlice
});

export default combinedReducer;
