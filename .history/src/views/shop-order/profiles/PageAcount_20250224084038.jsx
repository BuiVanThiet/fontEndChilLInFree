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
import { START_LOADING, STOP_LOADING } from '../../../store/reducers/RootReducer';

class PageAcount extends Component {
    

    render() {
        

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
export default connect(null, mapDispatchToProps)(PageAcount);
