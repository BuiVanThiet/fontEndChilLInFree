import React from "react";
import { Space, Button, Typography, ColorPicker, Input, Switch, Select } from 'antd';
import {
    SearchOutlined, HighlightOutlined, PlusOutlined
} from '@ant-design/icons';
import { toast } from 'react-toastify';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import BoxTable from "../BoxTable";
import {
    convertData,
    getColumnSearchProps,
    convertDataFillter,
    convertDataSelected,
    validateSelect, validateString, checkDuplicate,
} from '../../../store/action/ActionRenderData';
import { connect } from 'react-redux';
import WebSocketService from '../../../service/WebSocketService';
import { fetchProduct, updateProduct, exitFormEditProduct } from '../../../store/action/ProductAction';
import { getAllAttribute } from '../../../API/AtributeAPI';
//attribute
import { fetchColor } from '../../../store/action/ColorActions';
import { fetchCategory } from '../../../store/action/CategoryActions';
import { fetchManufacturer } from '../../../store/action/ManufacturerActions';
import { fetchOrigin } from '../../../store/action/OriginActions';
import { fetchSize } from '../../../store/action/SizeActions';
import { fetchWeightType } from '../../../store/action/WeightTypeAction';
import Loading from '../../Loading';
import { START_LOADING, STOP_LOADING } from '../../../store/reducers/RootReducer';

const { Title } = Typography;
const { TextArea } = Input;


class PageProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productData: {},
            shouldFetch: !props.products.length, // Nếu chưa có dữ liệu, thì fetch
            searchText: '',
            searchedColumn: '',
            disabledUpdateProduct: true
        };
    }

    componentDidMount() {
        WebSocketService.connect(() => {
            WebSocketService.subscribeSocket(() => this.props.fetchProduct(), '/topic/product'); // Sử dụng arrow function
            WebSocketService.subscribeSocket(() => this.props.fetchColor(), '/topic/color');
            WebSocketService.subscribeSocket(() => this.props.fetchCategory(), '/topic/category');
            WebSocketService.subscribeSocket(() => this.props.fetchManufacturer(), '/topic/manufacturer');
            WebSocketService.subscribeSocket(() => this.props.fetchOrigin(), '/topic/origin');
            WebSocketService.subscribeSocket(() => this.props.fetchSize(), '/topic/size');
            WebSocketService.subscribeSocket(() => this.props.fetchWeightType(), '/topic/weight-type');
            this.loadDataAttribute();
        });
    }

    // tim kiem
    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({
            searchText: '',
        });
    };

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
        if (!this.props.products.length) {
            this.props.fetchProduct();
        }
    }

    onClickDataProduct = (data) => {
        this.setState({ productData: data });
    }

    onClickCancelDataProduct = () => {
        this.setState({ productData: {} });
    }

    onChangeDataProduct = (value, objectChange) => {
        this.setState((prevState) => ({
            productData: {
                ...prevState.productData, // Giữ nguyên các object khác
                [objectChange]: value // Cập nhật key động
            }
        }), () => {
            let { productData } = this.state;
            this.setState({
                disabledUpdateProduct: this.props.validateProduct(
                    productData.object1,
                    productData.object2,
                    productData.object3,
                    productData.object12,
                    productData.object4,
                    productData.object6,
                    productData.object8,
                    productData.object10,
                    [2, 3, 4],
                    2
                )
            })
        });
    };


    saveUpdateProduct = async (productData) => {
        // let { productData } = this.state;

        let dataProduct = {
            id: productData.object1,
            codeProduct: productData.object2,
            nameProduct: productData.object3,
            idCategory: productData.object4,
            idManufacturer: productData.object6,
            idOrigin: productData.object8,
            describe: productData.object10,
            status: productData.object12
        }
        await this.props.startLoading();

        await this.props.getUpdateProduct(dataProduct);
        toast.success('Sửa thông tin sản phẩm thành công!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        });
        await this.props.stopLoading();

        this.setState({
            productData: {}
        });
    }

    render() {
        const columns = [
            {
                title: 'Mã Sản phẩm',
                dataIndex: 'object2',
                width: 240,
                ...getColumnSearchProps('object2', this.state.searchText, this.state.searchedColumn, this.handleSearch, this.handleReset),
                fixed: 'left',
                render: (_, product) => (
                    this.state.productData?.object1 === product.object1 ?
                        <>
                            <Input placeholder="Nhập mã sản phẩm" value={this.state.productData.object2} onChange={(event) => this.onChangeDataProduct(event.target.value, 'object2')} />
                            <span className="text-red-600">
                                {validateString(this.state.productData?.object2) === true ? '' : '*Mã sản phẩm ' + validateString(this.state.productData?.object2)}
                            </span>
                        </>
                        : product.object2
                ),
            },
            {
                title: 'Tên Sản phẩm',
                dataIndex: 'object3',
                width: 240,
                ...getColumnSearchProps('object3', this.state.searchText, this.state.searchedColumn, this.handleSearch, this.handleReset),
                fixed: 'left',
                render: (_, product) => (
                    this.state.productData?.object1 === product.object1 ?
                        <>
                            <Input placeholder="Nhập tên sản phẩm" value={this.state.productData.object3} onChange={(event) => this.onChangeDataProduct(event.target.value, 'object3')} />
                            <span className="text-red-600">
                                {validateString(this.state.productData?.object3) === true ? '' : '*Tên sản phẩm ' + validateString(this.state.productData?.object3)}
                            </span>
                        </>
                        : product.object3
                ),
            },
            {
                title: 'Danh mục',
                dataIndex: 'object5',
                width: 240,
                filters: convertDataFillter(this.props.categores),
                onFilter: (value, record) => {
                    const text = String(record.object4 || ""); // Chuyển đổi thành chuỗi an toàn
                    return text.startsWith(value);
                },
                filterSearch: true,
                filterMode: 'tree',
                render: (_, product) => (
                    this.state.productData?.object1 === product.object1 ?
                        <>
                            <Select
                                showSearch
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Tìm kiếm"
                                optionFilterProp="label"
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={convertDataSelected(this.props.categores)}
                                value={this.state.productData.object4}
                                onChange={(value) => this.onChangeDataProduct(value, 'object4')}
                            />
                            <span className="text-red-600">
                                {validateSelect(this.state.productData?.object4) === true ? '' : '*Danh mục ' + validateSelect(this.state.productData?.object4)}
                            </span>
                        </>
                        : product.object5
                ),
            },
            {
                title: 'Nhà sản xuất',
                dataIndex: 'object7',
                width: 240,
                filters: convertDataFillter(this.props.manufacturers),
                onFilter: (value, record) => {
                    const text = String(record.object6 || ""); // Chuyển đổi thành chuỗi an toàn
                    return text.startsWith(value);
                },
                filterSearch: true,
                filterMode: 'tree',
                render: (_, product) => (
                    this.state.productData?.object1 === product.object1 ?
                        <>
                            <Select
                                showSearch
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Tìm kiếm"
                                optionFilterProp="label"
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={convertDataSelected(this.props.manufacturers)}
                                value={this.state.productData.object6}
                                onChange={(value) => this.onChangeDataProduct(value, 'object6')}
                            />
                            <span className="text-red-600">
                                {validateSelect(this.state.productData?.object6) === true ? '' : '*Nhà sản xuất ' + validateSelect(this.state.productData?.object6)}
                            </span>
                        </>
                        : product.object7
                ),
            },
            {
                title: 'Quốc gia',
                dataIndex: 'object9',
                width: 240,
                filters: convertDataFillter(this.props.origins),
                onFilter: (value, record) => {
                    const text = String(record.object8 || ""); // Chuyển đổi thành chuỗi an toàn
                    return text.startsWith(value);
                },
                filterSearch: true,
                filterMode: 'tree',
                render: (_, product) => (
                    this.state.productData?.object1 === product.object1 ?
                        <>
                            <Select
                                showSearch
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Tìm kiếm"
                                optionFilterProp="label"
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={convertDataSelected(this.props.origins)}
                                value={this.state.productData.object8}
                                onChange={(value) => this.onChangeDataProduct(value, 'object8')}
                            />
                            <span className="text-red-600">
                                {validateSelect(this.state.productData?.object8) === true ? '' : '*Quốc gia ' + validateSelect(this.state.productData?.object8)}
                            </span>
                        </>
                        : product.object9
                ),
            },
            {
                title: 'Mô tả',
                dataIndex: 'object10',
                width: 540, // Giới hạn chiều rộng cột
                ...getColumnSearchProps('object10', this.state.searchText, this.state.searchedColumn, this.handleSearch, this.handleReset),
                render: (_, product) => (
                    <>
                        <TextArea
                            rows={4}
                            value={((this.state.productData?.object1 === product.object1) ? this.state.productData.object10 : product.object10).replace(/\\n/g, '\n')}  // Loại bỏ tất cả dấu '\\' không phải là \\n
                            onChange={(event) => this.onChangeDataProduct(event.target.value, 'object10')}
                            disabled={!(this.state.productData?.object1 === product.object1)}
                        />
                        <span className="text-red-600">
                            {validateString(this.state.productData.object10) === true ? '' : '*Mô tả ' + validateString(this.state.productData.object10)}
                        </span>
                        {/* {
                            this.state.productData?.object1 === product.object1 ?
                                <span className="text-red-600">
                                    {validateString(this.state.productData?.object10) === true ? '' : '*Mô tả ' + validateString(this.state.productData?.object10)}
                                </span> : ''
                        } */}
                    </>
                ),


            },
            {
                title: 'Trạng thái',
                dataIndex: 'object12',
                width: 240,
                render: (_, product) => {
                    return (
                        <div>
                            <Switch
                                checkedChildren="Hoạt động"
                                unCheckedChildren="Ngừng hoạt động"
                                checked={
                                    (this.state.productData?.object1 && this.state.productData?.object1 === product.object1)
                                        ? (this.state.productData.object12 === 1)
                                        : (product.object12 === 1)
                                }
                                disabled={this.state.productData?.object1 !== product.object1}
                                onChange={(checked) => this.onChangeDataProduct(checked ? 1 : 2, 'object12')}
                            />
                        </div>
                    );
                },
                sorter: (a, b) => {
                    const statusA = a.object12 === 1 ? "Hoạt động" : "Ngừng hoạt động";
                    const statusB = b.object12 === 1 ? "Hoạt động" : "Ngừng hoạt động";
                    return statusA.length - statusB.length;  // Sắp xếp theo độ dài chuỗi
                },
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Chức năng',
                width: 240,
                fixed: 'right',
                render: (_, product) => (
                    <Space size="middle">
                        {this.state.productData?.object1 === product.object1 ?
                            (
                                <>
                                    <Button color="danger" variant="dashed" onClick={() => {
                                        this.saveUpdateProduct(this.state.productData);
                                    }} disabled={!this.state.disabledUpdateProduct}>Lưu</Button>
                                    <Button color="danger" variant="dashed" onClick={() => this.onClickCancelDataProduct()}>Hủy</Button>
                                </>
                            ) :
                            <Button color="danger" variant="dashed" onClick={() => this.onClickDataProduct(product)}>Chỉnh sửa</Button>
                        }
                        <Link to={`/manage/product/${product.object1}`}>
                            <Button color="danger" variant="dashed" onClick={async () => { await this.props.startLoading(); await this.props.resetDataProductEdit(); await this.props.stopLoading(); }}>Thông tin chi tiết</Button>
                        </Link>
                    </Space>
                ),
            },
        ];
        let listData = convertData(this.props.products);
        return (
            <>
                <Title level={4} className="">--Danh sách sản phẩm--</Title>
                <Loading />
                <Link to="/manage/product/add-product-new">
                    <Button className="mt-3 mb-3" color="danger" variant="dashed" onClick={async () => { await this.props.startLoading(); await this.props.stopLoading(); }}>
                        <PlusOutlined /> Thêm mới
                    </Button>
                </Link>
                <BoxTable columnsColor={columns} dataColor={listData} checkBoxTable={2} />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.product.products,
        attributes: state.attribute.attributes,
        //attribute
        colors: state.color.colors,
        categores: state.category.categores,
        manufacturers: state.manufacturer.Manufacturers,
        origins: state.origin.origins,
        sizes: state.size.sizes,
        weightTypes: state.weightType.weightTypes
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchProduct: () => dispatch(fetchProduct()),
    getUpdateProduct: (product) => dispatch(updateProduct(product)),
    //attribute
    fetchColor: () => dispatch(fetchColor()),
    fetchCategory: () => dispatch(fetchCategory()),
    fetchManufacturer: () => dispatch(fetchManufacturer()),
    fetchOrigin: () => dispatch(fetchOrigin()),
    fetchSize: () => dispatch(fetchSize()),
    fetchWeightType: () => dispatch(fetchWeightType()),
    resetDataProductEdit: () => dispatch(exitFormEditProduct()),
    startLoading: () => dispatch(START_LOADING()),
    stopLoading: () => dispatch(STOP_LOADING())
});

export default connect(mapStateToProps, mapDispatchToProps)(PageProduct);