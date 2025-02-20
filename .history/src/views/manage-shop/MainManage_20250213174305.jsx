import React, { useState, useEffect } from 'react';
import '../../style/manage-shop/mainManageStyle.css';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    EnterOutlined,
    LogoutOutlined,
    AreaChartOutlined,
    ShopOutlined,
    ProductOutlined,
    BuildOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import PageStatistical from './pageStatistical/PageStatistical';
import PageAttribute from './pageAtributeManage/PageAttribute';
import PageProduct from './pageProductManage/PageProduct';
import PageAddProduct from './pageProductManage/PageAddProduct';
import PageUpdateProduct from './pageProductManage/PageUpdateProduct';
import PageProductRouter from './pageProductManage/PageProductRouter';

import LogoBird from '../../assets/logo-bird.png';
import { connect } from 'react-redux';
import { START_LOADING, STOP_LOADING } from '../../store/reducers/RootReducer';

const { Header, Sider, Content } = Layout;

const siderStyle = {
    backgroundColor: '#fff',
    minHeight: '100vh',
    overflow: 'auto',
    height: '100vh',
    position: 'sticky',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
};

const App = ({ startLoading, stopLoading }) => {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    // Hàm xác định key của menu dựa trên URL
    const getSelectedKey = (path) => {
        if (path.startsWith('/manage/statistical')) return '1';
        if (path.startsWith('/manage/bill')) return '2';
        if (path.startsWith('/manage/product') || path.startsWith('/manage/product-detail')) return '3';
        if (path.startsWith('/manage/attribute-manage')) return '4';
        if (path === '/') return '5';
        return '';
    };

    // Lấy selectedKey từ URL
    const [selectedKey, setSelectedKey] = useState(getSelectedKey(location.pathname));

    // Lắng nghe sự thay đổi của URL
    useEffect(() => {
        setSelectedKey(getSelectedKey(location.pathname));
    }, [location]);

    // Toggle trạng thái collapsed
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    // Hàm xử lý khi click page
    const onClickPage = async () => {
        console.log('da vao day')
        await startLoading();  // Gọi startLoading
        await stopLoading();   // Gọi stopLoading
    };

    return (
        <Layout hasSider>
            <Sider
                style={siderStyle}
                trigger={null}
                collapsible
                collapsed={collapsed}
            >
                <div className=" flex items-center justify-center w-auto h-[50px] overflow-hidden mt-1">
                    <img src={LogoBird} alt="Logo" className="h-[40px] w-auto" />
                    <span className={'ml-2 text-red-700 text-lg font-semibold whitespace-nowrap transition-all ' + (collapsed ? 'hidden' : 'block')}>
                        Chill In Free
                    </span>
                </div>

                <Menu
                    theme="light"
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    onClick={({ key }) => { setSelectedKey(key), onClickPage(); }} // Cập nhật key khi menu được click
                    items={[
                        {
                            key: '1',
                            icon: <AreaChartOutlined />,
                            label: <Link to="/manage/statistical">Thống kê</Link>,
                        },
                        { type: 'divider' },
                        {
                            key: '2',
                            icon: <ShopOutlined />,
                            label: <Link to="/manage/bill/home">Bán hàng</Link>,
                        },
                        { type: 'divider' },
                        {
                            key: '3',
                            icon: <ProductOutlined />,
                            label: <Link to="/manage/product/home">Quản lý sản phẩm</Link>,
                        },
                        { type: 'divider' },
                        {
                            key: '4',
                            icon: <BuildOutlined />,
                            label: <Link to="/manage/attribute-manage/home">Quản lý thuộc tính</Link>,
                        },
                        { type: 'divider' },
                        {
                            key: '5',
                            icon: <EnterOutlined />,
                            label: <Link to="/">Về trang đặt hàng</Link>,
                        },
                        { type: 'divider' },
                        {
                            key: '6',
                            icon: <LogoutOutlined />,
                            label: 'Đăng xuất',
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{ padding: 0 }}
                >
                    {React.createElement(
                        collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                        {
                            className: 'trigger',
                            onClick: toggleCollapsed,  // Gọi toggle khi click
                        }
                    )}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        width: '100%',
                    }}
                >
                    <Routes>
                        <Route path="/statistical" element={<PageStatistical />} />
                        <Route path="/bill/home" element={<div>Bán hàng</div>} />
                        <Route path='/product/*' element={<PageProductRouter />}></Route>
                        <Route path="/product/home" element={<PageProduct />} />
                        <Route path="/product/add-product-new" element={<PageAddProduct />} />
                        <Route path="/product/:id/*" element={<PageUpdateProduct />} />
                        <Route path="/attribute-manage/home" element={<PageAttribute />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
};

const mapDispatchToProps = (dispatch) => ({
    startLoading: () => dispatch(START_LOADING()),
    stopLoading: () => dispatch(STOP_LOADING()),
});

export default connect(null, mapDispatchToProps)(App);
