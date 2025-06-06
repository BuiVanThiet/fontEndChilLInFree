const App = ({ startLoading, stopLoading }) => {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    const getSelectedKey = (path) => {
        if (path.startsWith('/manage/statistical')) return '1';
        if (path.startsWith('/manage/bill')) return '2';
        if (path.startsWith('/manage/product') || path.startsWith('/manage/product-detail')) return '3';
        if (path.startsWith('/manage/attribute-manage')) return '4';
        if (path === '/') return '5';
        return '';
    };

    const [selectedKey, setSelectedKey] = useState(getSelectedKey(location.pathname));

    useEffect(() => {
        setSelectedKey(getSelectedKey(location.pathname));
    }, [location]);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
        onClickPage();  // Gọi onClickPage khi toggle collapsed
    };

    // Hàm xử lý khi click page
    const onClickPage = async () => {
        console.log('Đã vào hàm onClickPage');
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
                {/* Các phần khác của layout */}
                <Menu
                    theme="light"
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    onClick={({ key }) => {
                        setSelectedKey(key);
                        onClickPage(); // Gọi onClickPage khi click vào menu
                    }}
                    items={[/* Các items trong menu */]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {React.createElement(
                        collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                        {
                            className: 'trigger',
                            onClick: toggleCollapsed,  // Gọi toggleCollapsed khi click vào icon
                        }
                    )}
                </Header>
                <Content className="site-layout-background" style={{ margin: '24px 16px', padding: 24, minHeight: 280, width: '100%' }}>
                    {/* Các Route */}
                    <Routes>
                        <Route path="/statistical" element={<PageStatistical />} />
                        <Route path="/bill/home" element={<div>Bán hàng</div>} />
                        <Route path="/product/home" element={<PageProduct />} />
                        <Route path="/product/add-product-new" element={<PageAddProduct />} />
                        <Route path="/product/:id" element={<PageUpdateProduct />} />
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
