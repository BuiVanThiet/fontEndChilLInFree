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
//attribute
import { fetchColorByPR } from '../../../store/action/ColorActions';
import { fetchSizeByPR } from '../../../store/action/SizeActions';
import {
    formatNumberWithCommasText,
    convertData
} from '../../../store/action/ActionRenderData';

class PageProductDetail extends React.Component {

    open = () => {
        this.props.openCard();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.params.id !== this.props.params.id) {
            this.loadDataUpdateProduct(this.props.params.id);
        }
    }



    componentDidMount() {
        if (this.props && this.props.params) {
            const id = this.props.params.id;
            this.loadDataUpdateProduct(id);
            WebSocketService.connect(() => {
                WebSocketService.subscribeSocket(() => this.loadDataUpdateProduct(id), '/topic/product');
                WebSocketService.subscribeSocket(() => this.loadDataUpdateProduct(id), '/topic/productDetail');
            });
        }
    }

    loadDataUpdateProduct = async (idPR) => {
        await this.props.getProduct(idPR);
        await this.props.getListImage(idPR);
        await this.props.fetchColorByPR(idPR);
        await this.props.fetchSizeByPR(idPR);
    }

    render() {
        console.log('Thong tin san pham chi tiet:', this.props.productById)
        return (
            <>
                <title>ChillInfree - Sản phẩm chi tiết</title>
                {
                    !this.props.productById ? 'loading...' :
                        <>
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                {
                                    !this.props.listImage ? 'loading...' :
                                        <BlocImageProduct Image={Image} listImage={this.props.listImage} />
                                }

                                <div className="flex flex-col col items-center justify-center w-full col-1">
                                    <Card className="w-full">
                                        <p className="text-red-600 text-[40px]">{this.props.productById.nameProduct}</p>
                                        <p>
                                            <div className="bvt-price">
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
                                                            {
                                                                convertData(this.props.sizeByPR).map((item) => (
                                                                    <>
                                                                        <Radio value={item.object1}>
                                                                            <div className="flex items-center gap-2">
                                                                                <span>item.object</span>
                                                                            </div>
                                                                        </Radio>
                                                                    </>
                                                                ))
                                                            }
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
                                    {
                                        this.props.productById.describe.split('\n').map((line, index) => (
                                            <p key={index}>{line}</p>
                                        ))
                                    }
                                </Card>
                            </p>
                            <this.props.TitleCategory titleCustom={'Các sản phẩm khác'} />
                            <ListProduct />
                        </>
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
        sizeByPR: state.size.sizeByPR,
        colorByPR: state.color.colorByPR
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openCard: () => dispatch(OPEN_CARD_ORDER()),
        getProduct: (id) => dispatch(getProduct(id)),
        getListImage: (id) => dispatch(getImageProduct(id)),
        fetchColorByPR: (id) => dispatch(fetchColorByPR(id)),
        fetchSizeByPR: (id) => dispatch(fetchSizeByPR(id)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageProductDetail));