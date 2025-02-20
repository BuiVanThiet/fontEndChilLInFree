import React from "react";
import { Button, Drawer } from 'antd';
import ProductOrder from "./ProductOrder";
import { connect } from 'react-redux';
import { OPEN_CARD_ORDER, CLONE_CARD_ORDER } from '../../../store/reducers/RootReducer';

class CardProduct extends React.Component {

    showDrawer = () => {
        this.props.openCard();
        // this.setState({ open: true });
    };
    onClose = () => {
        this.props.cloneCard();
        // this.setState({ open: false });
    };
    render() {
        const open = this.props.active_card_order;
        return (<>
            <Drawer
                onClose={this.onClose}
                title={
                    <div className="flex justify-between items-center w-full">
                        <span>Giỏ hàng</span>
                        <Button onClick={this.onClose} danger>
                            X
                        </Button>
                    </div>
                }
                open={open}
                closable={false}
                footer={
                    <>
                        <span className="flex items-center">
                            Tổng tiền sản phẩm: <span className="text-red-600 text-xl ml-2">2.000.000.000.000 VNĐ</span>
                        </span>
                        <Button type="dashed" block danger className="mt-2">
                            Xóa bỏ giỏ hàng
                        </Button>
                        <this.props.Link to="/order">
                            <Button type="dashed" block className="mt-2" onClick={() => this.onClose()}>
                                Đặt hàng
                            </Button>
                        </this.props.Link>

                    </>}
            >
                <ProductOrder />
            </Drawer>

            <ul
                className="basis-4/8 lg:basis-2/8 flex justify-center items-center ml-6 uppercase text-sm text-gray-500 font-medium">
                <li className="top-menu-item-custom m-0">

                    <div onClick={this.showDrawer} className="flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                            className="icon-card-custom w-6 h-6">
                            <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clipRule="evenodd" />
                        </svg>
                        <span className="mx-2">Giỏ hàng</span>
                        <span className="badge-circle-custom bg-black text-white text-xs px-2 py-1 rounded-full">+99</span>
                    </div>
                </li>
            </ul>
        </>)
    }
}

const mapStateToProps = (state) => {
    return {
        active_card_order: state.root.active_card_order
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openCard: () => dispatch(OPEN_CARD_ORDER()),
        cloneCard: () => dispatch(CLONE_CARD_ORDER()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CardProduct);