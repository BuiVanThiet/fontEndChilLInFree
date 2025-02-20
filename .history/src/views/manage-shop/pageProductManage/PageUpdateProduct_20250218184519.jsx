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
import { fetchProduct, uploadImagePR, createProduct, getProduct, updateProduct, getImageProduct, deleteImagePR, exitFormEditProduct } from '../../../store/action/ProductAction';
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

class PageUpdateProduct extends React.Component {
    componentDidMount() {
        if (this.props && this.props.params) {
            const id = this.props.params.id;
            this.props.getProduct(id);
            this.props.getListImage(id);
            WebSocketService.connect(() => {
                WebSocketService.subscribeSocket(async () => {
                    await this.props.getProduct(id);
                    await this.props.getListImage(id);
                }, '/topic/product');

                WebSocketService.subscribeSocket(() => this.props.fetchColor(), '/topic/color');
                WebSocketService.subscribeSocket(() => this.props.fetchCategory(), '/topic/category');
                WebSocketService.subscribeSocket(() => this.props.fetchManufacturer(), '/topic/manufacturer');
                WebSocketService.subscribeSocket(() => this.props.fetchOrigin(), '/topic/origin');
                WebSocketService.subscribeSocket(() => this.props.fetchSize(), '/topic/size');
                WebSocketService.subscribeSocket(() => this.props.fetchWeightType(), '/topic/weight-type');

            });
            this.loadDataAttribute();
        }

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
    }

    render() {
        const id = this.props.params.id;
        return (
            <>
                <Title level={5}>--Thông tin sản phẩm--</Title>
                <Link to="/manage/product/home">
                    <Button color="default" variant="text" className="mb-3" onClick={() => { this.props.startLoading(); this.props.stopLoading(); }}>
                        <ArrowLeftOutlined />  Về trang danh sách
                    </Button>
                </Link>
                {this.props.productById ? (
                    <BoxAddProduct
                        idProduct={id}
                        listImage={this.props.listImage}
                        productById={this.props.productById}
                        updateProduct={this.props.updateProduct}
                        listCategory={convertDataSelected(this.props.categores)}
                        listManufacturer={convertDataSelected(this.props.manufacturers)}
                        listOrigin={convertDataSelected(this.props.origins)}
                        uploadImagePR={this.props.uploadImagePR}
                        deleteImagePR={this.props.deleteImagePR}
                        startLoading={this.props.startLoading}
                        stopLoading={this.props.stopLoading}
                        spinningSpin={this.props.spinningSpin}
                        validateProduct={this.props.validateProduct}

                    />
                ) : (
                    <p>Đang tải dữ liệu...</p>
                )}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.product.products,
        productById: state.product.productById,
        listImage: state.product.listImage,
        //attribute
        colors: state.color.colors,
        categores: state.category.categores,
        manufacturers: state.manufacturer.Manufacturers,
        origins: state.origin.origins,
        sizes: state.size.sizes,
        weightTypes: state.weightType.weightTypes,
        //
        spinningSpin: state.root.spinningSpin
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchProduct: () => dispatch(fetchProduct()),
    uploadImagePR: (list) => dispatch(uploadImagePR(list)),
    deleteImagePR: (list) => dispatch(deleteImagePR(list)),
    getProduct: (id) => dispatch(getProduct(id)),
    getListImage: (id) => dispatch(getImageProduct(id)),
    updateProduct: (data) => dispatch(updateProduct(data)),
    //attribute
    fetchColor: () => dispatch(fetchColor()),
    fetchCategory: () => dispatch(fetchCategory()),
    fetchManufacturer: () => dispatch(fetchManufacturer()),
    fetchOrigin: () => dispatch(fetchOrigin()),
    fetchSize: () => dispatch(fetchSize()),
    fetchWeightType: () => dispatch(fetchWeightType()),
    startLoading: () => dispatch(START_LOADING()),
    stopLoading: () => dispatch(STOP_LOADING()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageUpdateProduct));