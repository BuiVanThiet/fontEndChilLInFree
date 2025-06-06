import React from "react";
import PageProduct from "./PageProduct";
import PageAddProduct from "./PageAddProduct";
import PageUpdateProduct from "./PageUpdateProduct";
import PageHomeProductDetail from "./PageHomeProductDetail";
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import BoxAddProductDetail from "./BoxAddProductDetail";
import { validateInteger, validateSelect, validateString, checkDuplicate, convertData } from '../../../store/action/ActionRenderData';
import { connect } from 'react-redux';
import { fetchProduct } from '../../../store/action/ProductAction';
//attribute
import { fetchColor } from '../../../store/action/ColorActions';
import { fetchCategory } from '../../../store/action/CategoryActions';
import { fetchManufacturer } from '../../../store/action/ManufacturerActions';
import { fetchOrigin } from '../../../store/action/OriginActions';
import { fetchSize } from '../../../store/action/SizeActions';
import { fetchWeightType } from '../../../store/action/WeightTypeAction';
import WebSocketService from '../../../service/WebSocketService';
import { START_LOADING, STOP_LOADING } from '../../../store/reducers/RootReducer';

class PageProductRouter extends React.Component {
    componentDidMount() {
        WebSocketService.connect(() => {
            WebSocketService.subscribeSocket(() => this.props.fetchProduct(), '/topic/product'); // Sử dụng arrow function
            WebSocketService.subscribeSocket(() => this.props.fetchColor(), '/topic/color');
            WebSocketService.subscribeSocket(() => this.props.fetchCategory(), '/topic/category');
            WebSocketService.subscribeSocket(() => this.props.fetchManufacturer(), '/topic/manufacturer');
            WebSocketService.subscribeSocket(() => this.props.fetchOrigin(), '/topic/origin');
            WebSocketService.subscribeSocket(() => this.props.fetchSize(), '/topic/size');
            WebSocketService.subscribeSocket(() => this.props.fetchWeightType(), '/topic/weight-type');
            this.loadDataAttribute();
        });
    }

    loadDataAttribute = () => {
        if (!this.props.colors.length) {
            this.props.fetchColor();
        }
        if (!this.props.categores.length) {
            this.props.fetchCategory();
        }
        if (!this.props.manufacturers.length) {
            this.props.fetchManufacturer();
        }
        if (!this.props.origins.length) {
            this.props.fetchOrigin();
        }
        if (!this.props.sizes.length) {
            this.props.fetchSize();
        }
        if (!this.props.weightTypes.length) {
            this.props.fetchWeightType();
        }
        if (!this.props.products.length) {
            this.props.fetchProduct();
        }
    }

    validateProduct = (
        id,
        code,
        name,
        status,
        idCategory,
        idManufacturer,
        idOrigin,
        describe,
        listImage,
        addOrUpdate) => {
        let checkLenght = (
            validateString(code,255) === true &&
            validateString(name) === true &&
            validateString(describe) === true) ? true : false;
        let listProduct = convertData(this.props.products);
        let checkSame;
        if (addOrUpdate === 1) { //1 la them 2 la update
            checkSame = checkDuplicate(code, listProduct, addOrUpdate);
        } else {
            checkSame = checkDuplicate(code, listProduct, addOrUpdate, 'object1', id);
        }
        console.log('data check: ', listProduct)
        console.log('check same: ', checkSame)
        if (checkLenght === true &&
            (status === 1 || status === 2) &&
            validateSelect(idCategory) === true &&
            validateSelect(idManufacturer) === true &&
            validateSelect(idOrigin) === true &&
            checkSame === true &&
            listImage.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    onClickLoadPage = async () => {
         await this.props.startLoading(); 
         await this.props.stopLoading(); 
    }
    render() {
        return (<>
            <Routes>
                <Route
                    path="/home"
                    exact
                    element={<PageProduct validateProduct={this.validateProduct} onClickLoadPage={this.onClickLoadPage}/>}
                />
                <Route
                    path="/add-product-new"
                    exact
                    element={<PageAddProduct validateProduct={this.validateProduct} onClickLoadPage={this.onClickLoadPage}/>}
                />
                <Route
                    path="/:id"
                    exact
                    element={<PageUpdateProduct validateProduct={this.validateProduct} />}
                />
                <Route
                    path="/:id/home-product-detail"
                    exact
                    element={<PageHomeProductDetail />}
                />
                <Route
                    path="/:id/home-product-detail/add-new-product-detail"
                    exact
                    element={<BoxAddProductDetail />}
                />
            </Routes>
        </>)
    }
}


const mapStateToProps = (state) => {
    return {
        products: state.product.products,
        attributes: state.attribute.attributes,
        //attribute
        colors: state.color.colors,
        categores: state.category.categores,
        manufacturers: state.manufacturer.Manufacturers,
        origins: state.origin.origins,
        sizes: state.size.sizes,
        weightTypes: state.weightType.weightTypes
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchProduct: () => dispatch(fetchProduct()),
    //attribute
    fetchColor: () => dispatch(fetchColor()),
    fetchCategory: () => dispatch(fetchCategory()),
    fetchManufacturer: () => dispatch(fetchManufacturer()),
    fetchOrigin: () => dispatch(fetchOrigin()),
    fetchSize: () => dispatch(fetchSize()),
    fetchWeightType: () => dispatch(fetchWeightType()),
    startLoading: () => dispatch(START_LOADING()),
    stopLoading: () => dispatch(STOP_LOADING())
});

export default connect(mapStateToProps, mapDispatchToProps)(PageProductRouter);

// export default PageProductRouter;