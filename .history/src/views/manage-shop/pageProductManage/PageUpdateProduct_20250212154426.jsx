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
import { list } from "postcss";


const { Title } = Typography;
const { TextArea } = Input;

//chuyen anh

class PageUpdateProduct extends React.Component {
    // async componentDidUpdate(prevProps) {
    //     const id = this.props.params.id;

    //     // Kiểm tra nếu ID đã thay đổi và ID mới khác null
    //     if (prevProps.params.id !== id && id) {
    //         console.log("ID mới: ", id);

    //         await this.props.getProduct(id);
    //         await this.props.getListImage(id);
    //         this.loadDataAttribute(id);
    //     }
    // }



    // componentDidMount() {
    //     let id = null;
    //     if (this.props && this.props.params) {
    //         id = this.props.params.id;

    //         console.log("id maping la ", id)
    //         this.setState({ listImage: this.props.listImage })
    //         WebSocketService.connect(() => {
    //             WebSocketService.subscribeSocket(() => {
    //                 this.props.getProduct(id);
    //                 this.props.getListImage(id);
    //             }, '/topic/product');

    //             WebSocketService.subscribeSocket(() => this.props.fetchColor(), '/topic/color');
    //             WebSocketService.subscribeSocket(() => this.props.fetchCategory(), '/topic/category');
    //             WebSocketService.subscribeSocket(() => this.props.fetchManufacturer(), '/topic/manufacturer');
    //             WebSocketService.subscribeSocket(() => this.props.fetchOrigin(), '/topic/origin');
    //             WebSocketService.subscribeSocket(() => this.props.fetchSize(), '/topic/size');
    //             WebSocketService.subscribeSocket(() => this.props.fetchWeightType(), '/topic/weight-type');

    //         });
    //         this.loadDataAttribute(id);
    //     }

    // }

    async componentDidUpdate(prevProps) {
        const newId = this.props.params.id;

        // Kiểm tra nếu ID thay đổi
        if (prevProps.params.id !== newId && newId) {
            console.log("🔄 ID mới: ", newId);

            // Hủy tất cả WebSocket đang hoạt động trước khi cập nhật
            this.unsubscribeFromWebSocket();

            // Cập nhật ID vào state để theo dõi
            this.setState({ currentId: newId });

            // Tải dữ liệu mới
            await this.props.getProduct(newId);
            await this.props.getListImage(newId);
            this.loadDataAttribute(newId);

            // Đăng ký lại WebSocket với ID mới
            this.subscribeWebSocket(newId);
        }
    }

    async componentDidMount() {
        if (this.props && this.props.params) {
            const id = await this.props.params.id;
            console.log("🔍 ID Mapping ban đầu: ", id);

            // Cập nhật ID ban đầu vào state
            await this.setState({ currentId: id });

            // Kết nối WebSocket và đăng ký sự kiện
            await WebSocketService.connect(() => {
                this.subscribeWebSocket(id);
            });

            this.loadDataAttribute(id);
        }
    }

    // 🛠 Hủy tất cả WebSocket đang lắng nghe
    unsubscribeFromWebSocket = () => {
        // WebSocketService.unsubscribe('/topic/product');
        WebSocketService.unsubscribe('/topic/color');
        WebSocketService.unsubscribe('/topic/category');
        WebSocketService.unsubscribe('/topic/manufacturer');
        WebSocketService.unsubscribe('/topic/origin');
        WebSocketService.unsubscribe('/topic/size');
        WebSocketService.unsubscribe('/topic/weight-type');
    };

    // 🛠 Đăng ký lại WebSocket với ID mới
    subscribeWebSocket = (id) => {
        // WebSocketService.subscribeSocket(() => {
        //     // Kiểm tra ID hiện tại có trùng với ID trên URL không
        //     if (this.state.currentId === id) {
        //         console.log("📡 Nhận dữ liệu WebSocket cho ID: ", id);
        //         this.props.getProduct(id);
        //         this.props.getListImage(id);
        //     } else {
        //         console.log("⚠️ Bỏ qua dữ liệu cũ cho ID: ", id);
        //     }
        // }, '/topic/product');

        WebSocketService.subscribeSocket(() => this.props.fetchColor(), '/topic/color');
        WebSocketService.subscribeSocket(() => this.props.fetchCategory(), '/topic/category');
        WebSocketService.subscribeSocket(() => this.props.fetchManufacturer(), '/topic/manufacturer');
        WebSocketService.subscribeSocket(() => this.props.fetchOrigin(), '/topic/origin');
        WebSocketService.subscribeSocket(() => this.props.fetchSize(), '/topic/size');
        WebSocketService.subscribeSocket(() => this.props.fetchWeightType(), '/topic/weight-type');
    };


    loadDataAttribute = (id) => {
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
        if (!this.props.listImage) {
            this.props.getListImage(id);
        }
        // if (!this.props.productById) {
        this.props.getProduct(id);
        // }
    }

    constructor(props) {
        super(props);
        this.state = {
            listImage: [],
            currentId: null,
        };
    }

    render() {
        let { id } = this.props.params;
        return (
            <>
                <Title level={5}>--Thông tin sản phẩm--</Title>
                <Link to="/manage/product/home">
                    <Button color="default" variant="text" className="mb-3" >
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