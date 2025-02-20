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
        console.log('Thong tin san pham chi tiet:', this.props.productById)
        return (
            <>
                <title>ChillInfree - Sản phẩm chi tiết</title>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <BlocImageProduct Image={Image} />
                    <div className="flex flex-col col items-center justify-center w-full col-1">
                        <Card className="w-full">
                            <p className="text-red-600 text-[40px]">{this.props.productById.nameProduct}</p>
                            <p>
                                <div className="bvt-price">
                                    {
                                        this.props.priceMin === this.props.priceMax
                                            ? <span className="ml-2 text-red-500 ">{formatNumberWithCommasText(this.props.priceMin)} VNĐ</span>
                                            : <span className="ml-2 text-red-500">{formatNumberWithCommasText(this.props.priceMin)} VNĐ -> {formatNumberWithCommasText(this.props.priceMax)} VNĐ</span>
                                    }

                                    <span className="line-through text-gray-600 text-[15px]">100,000,000 VNĐ</span>
                                    <span className="ml-2 text-[10px]">
                                        <ArrowRightOutlined />
                                    </span>
                                    <span className="text-red-500 text-[20px]">10,000,000 VNĐ</span>

                                </div>

                            </p>
                            <p>
                                <Form layout="vertical">
                                    <Form.Item label="Kích cỡ:" required tooltip="Chọn màu kích cỡ">
                                        <Radio.Group>
                                            <div>
                                                <Radio value={1}>
                                                    <div className="flex items-center gap-2">
                                                        <span>xl</span>
                                                    </div>
                                                </Radio>
                                                <Radio value={2}>
                                                    <div className="flex items-center gap-2">
                                                        <span>xxl</span>
                                                    </div>
                                                </Radio>
                                                <Radio value={3}>
                                                    <div className="flex items-center gap-2">
                                                        <span>xxxl</span>
                                                    </div>
                                                </Radio>
                                            </div>
                                        </Radio.Group>
                                    </Form.Item>
                                </Form>
                            </p>
                            <p>
                                <Form layout="vertical">
                                    <Form.Item label="Màu sắc:" required tooltip="Chọn màu sản phẩm">
                                        <Radio.Group>
                                            <div>
                                                <Radio value={1}>
                                                    <div className="flex items-center gap-2">
                                                        <ColorPicker defaultValue="#1677ff" disabled />
                                                        <span>Xanh dương</span>
                                                    </div>
                                                </Radio>
                                                <Radio value={2}>
                                                    <div className="flex items-center gap-2">
                                                        <ColorPicker defaultValue="#ff16ff" disabled />
                                                        <span>Hồng</span>
                                                    </div>
                                                </Radio>
                                                <Radio value={3}>
                                                    <div className="flex items-center gap-2">
                                                        <ColorPicker defaultValue="#22ff16" disabled />
                                                        <span>Xanh lá chuối</span>
                                                    </div>
                                                </Radio>
                                            </div>
                                        </Radio.Group>
                                    </Form.Item>
                                </Form>
                            </p>
                            <Button type="dashed" block style={{ height: '50px' }} className="text-[20px]" onClick={() => this.open()}>
                                Thêm vào giỏ hàng
                            </Button>
                            <this.props.Link to="/order">
                                <Button type="dashed" danger block style={{ height: '50px' }} className="text-[20px] mt-5">
                                    Mua ngay
                                </Button>
                            </this.props.Link>
                        </Card>
                        <div className="w-full h-auto mt-3 mb-3">
                            <Image
                                id="main-image"
                                width={'100%'}
                                height={'100%'}
                                src={sizeImage}
                                style={{
                                    objectFit: 'cover',
                                    objectPosition: 'center center'
                                }}
                            />
                        </div>
                    </div>

                </div>
                {/* phan noi dung san pham  */}
                <p>
                    <Card>
                        <p className="text-red-600 text-[25px]"> CHI TIẾT SẢN PHẨM</p>
                        <p className="text-[15px]">
                            - Chất liệu: Cotton 320gsm.
                        </p>
                        <p className="text-[15px]">
                            - Áo dáng oversized, bo cổ dệt dày dặn.
                        </p>
                        <p className="text-[15px]">
                            - Chi tiết được thiết kế bao gồm logo CHILLNFREE trược ngực áo và logo biểu tượng đằng sau lưng.
                        </p>
                        <p className="text-[15px]">
                            - Sử dụng công nghệ in lưới chuyển nhiệt sắc nét, bền màu với thời gian.
                        </p>

                    </Card>
                </p>
                <this.props.TitleCategory titleCustom={'Các sản phẩm khác'} />
                <ListProduct />

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