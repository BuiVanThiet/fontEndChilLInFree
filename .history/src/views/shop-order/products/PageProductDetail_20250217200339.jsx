import React from "react";
import sizeImage from '../../../assets/imagePage/size_product_1.png';  // Đảm bảo rằng đường dẫn này là đúng
import { Image, ColorPicker, Card, Form, Radio, Space, Button } from 'antd';
import BlocImageProduct from './BlocImageProduct';
import {
    ArrowRightOutlined
} from '@ant-design/icons';
import ListProduct from "./ListProduct";
import { connect } from 'react-redux';
import { OPEN_CARD_ORDER, CLONE_CARD_ORDER } from '../../../store/reducers/RootReducer';
import { fetchProduct, uploadImagePR, createProduct, getProduct, updateProduct, getImageProduct, deleteImagePR, exitFormEditProduct } from '../../../store/action/ProductAction';
import WebSocketService from '../../../service/WebSocketService';
import { withRouter } from "../../../utils/withRouter";
import {
    formatNumberWithCommasText
} from '../../../store/action/ActionRenderData';

class PageProductDetail extends React.Component {

    open = () => {
        this.props.openCard();
    }

    componentDidMount() {
        if (this.props && this.props.params) {
            const id = this.props.params.id;
            this.loadDataUpdateProduct(id);
            WebSocketService.connect(() => {
                WebSocketService.subscribeSocket(() => this.loadDataUpdateProduct(id), '/topic/product');
            });
        }
    }

    loadDataUpdateProduct = async (idPR) => {
        await this.props.getProduct(idPR);
        await this.props.getListImage(idPR);
    }

    render() {
        // console.log('Thong tin san pham chi tiet:', this.props.productById)
        return (
            <>
                <title>ChillInfree - Sản phẩm chi tiết</title>
                {
                    !this.props.productById ? 'loading...' : 
                    <><></>
                }

            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        active_card_order: state.root.active_card_order,
        productById: state.product.productById,
        listImage: state.product.listImage,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openCard: () => dispatch(OPEN_CARD_ORDER()),
        getProduct: (id) => dispatch(getProduct(id)),
        getListImage: (id) => dispatch(getImageProduct(id)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageProductDetail));