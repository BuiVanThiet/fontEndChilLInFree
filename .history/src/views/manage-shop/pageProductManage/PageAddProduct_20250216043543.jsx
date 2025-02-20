import React from "react";
import { Flex, Radio, Space, Button, Typography, ColorPicker, Input, Switch, Select, Row, Col, Card, Table, Image, Upload } from 'antd';
import {
    SearchOutlined, HighlightOutlined, PlusOutlined, ArrowLeftOutlined
} from '@ant-design/icons';
import { toast } from 'react-toastify';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import BoxTable from "../BoxTable";
import BoxAddProductDetail from "./BoxAddProductDetail";
import BoxAddProduct from "./BoxAddProduct";
import { convertData, getColumnSearchProps, convertDataFillter, convertDataSelected } from '../../../store/action/ActionRenderData';
import { useParams } from "react-router-dom";
import { withRouter } from "../../../utils/withRouter";
import { connect } from 'react-redux';
import WebSocketService from '../../../service/WebSocketService';
import { fetchProduct, uploadImagePR, createProduct, getProduct, updateProduct } from '../../../store/action/ProductAction';
//attribute
import { fetchColor } from '../../../store/action/ColorActions';
import { fetchCategory } from '../../../store/action/CategoryActions';
import { fetchManufacturer } from '../../../store/action/ManufacturerActions';
import { fetchOrigin } from '../../../store/action/OriginActions';
import { fetchSize } from '../../../store/action/SizeActions';
import { fetchWeightType } from '../../../store/action/WeightTypeAction';
import { START_LOADING, STOP_LOADING } from '../../../store/reducers/RootReducer';


const { Title } = Typography;
const { TextArea } = Input;

//chuyen anh

class PageAddProduct extends React.Component {

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

    addProduct = (data,checkFor) => {
        let productData = {
            codeProduct: data.codeProduct,
            nameProduct: data.nameProduct,
            idCategory: data.idCategory,
            idManufacturer: data.idManufacturer,
            idOrigin: data.idOrigin,
            describe: data.describe,
            status: data.status
        };
        this.props.getSaveProduct(productData);
        toast.success('Thêm mới sản phẩm thành công!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        });
        return 1;
    }

    render() {
        return (
            <>
                <>
                    <Title level={5}>--Thêm mới sản phẩm--</Title>
                    <Link to="/manage/product/home">
                        <Button color="default" variant="text" className="mb-3">
                            <ArrowLeftOutlined />  Về trang danh sách
                        </Button>
                    </Link>
                    <BoxAddProduct
                        getSaveProduct={this.props.getSaveProduct}
                        listCategory={convertDataSelected(this.props.categores)}
                        listManufacturer={convertDataSelected(this.props.manufacturers)}
                        listOrigin={convertDataSelected(this.props.origins)}
                        uploadImagePR={this.props.uploadImagePR}
                        startLoading={this.props.startLoading}
                        stopLoading={this.props.stopLoading}
                    />
                    <BoxAddProductDetail />
                </>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
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
    getSaveProduct: (product, fileImage) => dispatch(createProduct(product, fileImage)),
    uploadImagePR: (listImage) => dispatch(uploadImagePR(listImage)),
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

export default connect(mapStateToProps, mapDispatchToProps)(PageAddProduct);