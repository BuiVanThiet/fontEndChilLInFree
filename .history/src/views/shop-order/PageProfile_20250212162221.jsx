import React, { Component } from "react";
import {
    TruckOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    ScheduleOutlined,
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
import { Link, Route, Routes } from "react-router-dom";
import { connect } from 'react-redux';
import { START_LOADING, STOP_LOADING } from '../../store/reducers/RootReducer';

const { Content, Sider } = Layout;

class PageProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKey: this.getSelectedKeyFromPath(), // Đặt key mặc định dựa trên URL
        };
    }

    // Lấy key dựa trên đường dẫn URL
    getSelectedKeyFromPath = () => {
        const path = window.location.pathname;
        if (path.includes("/profile/3")) return "account";
        if (path.includes("/profile/address-ship")) return "addRessShip";
        if (path.includes("/profile/orders")) return "billOrder";
        if (path.includes("/manage/statistical")) return "manage";
        return "account"; // Default key
    };

    // Cập nhật key khi URL thay đổi
    componentDidUpdate(prevProps, prevState) {
        const currentKey = this.getSelectedKeyFromPath();
        if (currentKey !== this.state.selectedKey) {
            this.setState({ selectedKey: currentKey });
        }
    }

    // Xử lý khi click vào menu
    handleMenuClick = (e) => {
        const { key } = e;
        this.setState({ selectedKey: key }); // Cập nhật key được chọn
    };
    onClickPage = async () => {
        await this.props.startLoading();
        await this.props.stopLoading();
    }
    render() {
        const menuItems = [
            {
                key: "account",
                label: <Link to="/profile/3">Thông tin tài khoản</Link>,
                icon: <UserOutlined />,
            },
            {
                type: "divider",
            },
            {
                key: "addRessShip",
                label: <Link to="/profile/address-ship">Địa chỉ nhận hàng</Link>,
                icon: <TruckOutlined />,
            },
            {
                type: "divider",
            },
            {
                key: "billOrder",
                label: "Đơn mua",
                icon: <ShoppingCartOutlined />,
                children: [
                    {
                        key: "order-1",
                        label: <Link to="/profile/orders">Tất cả</Link>,
                        link: "/profile/orders",
                    },
                    {
                        key: "order-2",
                        label: <Link to="/profile/orders">Chờ xác nhận</Link>,
                        link: "/profile/orders",
                    },
                ],
            },
            {
                type: "divider",
            },
            {
                key: "manage",
                label: <Link to="/manage/statistical">Quản lý cửa hàng</Link>,
                icon: <ScheduleOutlined />,
            },
        ];

        return (
            <Layout style={{ minHeight: "100vh", background: "#fff" }}>
                <Sider width={256} style={{ background: "#fff" }}>
                    <Menu
                        onClick={this.handleMenuClick}
                        selectedKeys={[this.state.selectedKey]}
                        mode="inline"
                        items={menuItems}
                    />
                </Sider>
                <Content
                    style={{
                        margin: "24px 16px 0",
                        padding: 24,
                        background: "#fff",
                        minHeight: 280,
                    }}
                >
                    {/* Define Routes for profile-related components */}
                    <Routes>
                        <Route
                            path="/3"
                            element={<div>Thông tin tài khoản</div>}
                        />
                        <Route
                            path="/address-ship"
                            element={<div>Địa chỉ nhận hàng</div>}
                        />
                        <Route
                            path="/orders"
                            element={<div>Đơn hàng của bạn</div>}
                        />
                    </Routes>
                </Content>
            </Layout>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startLoading: () => dispatch(START_LOADING()),
    stopLoading: () => dispatch(STOP_LOADING()),
});
export default connect(null, mapDispatchToProps)(PageProfile);
