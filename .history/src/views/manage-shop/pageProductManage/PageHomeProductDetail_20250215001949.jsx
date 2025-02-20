import React from "react";
import PageProduct from "./PageProduct";
import PageAddProduct from "./PageAddProduct";
import PageUpdateProduct from "./PageUpdateProduct";
import BoxTable from "../BoxTable";
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { Space, Button, Typography, ColorPicker, Input, Switch, Select } from 'antd';
import {
    SearchOutlined, HighlightOutlined, PlusOutlined, ArrowLeftOutlined
} from '@ant-design/icons';
import { withRouter } from "../../../utils/withRouter";
import { connect } from 'react-redux';
import WebSocketService from '../../../service/WebSocketService';
import { fetchProductDetail } from '../../../store/action/ProductDetailAction'
import { fetchColor } from '../../../store/action/ColorActions';
import { fetchSize } from '../../../store/action/SizeActions';
import { fetchWeightType } from '../../../store/action/WeightTypeAction';
import { convertData, getColumnSearchProps, convertDataFillter, convertDataSelected, formatNumberWithCommasText, formatNumberWithCommas } from '../../../store/action/ActionRenderData';

class PageHomeProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            searchedColumn: '',
            selectedRowKeysProductDetail: [],
        };
    }
    componentDidMount() {
        if (this.props && this.props.params) {
            const id = this.props.params.id;
            WebSocketService.connect(() => {
                WebSocketService.subscribeSocket(() => this.props.fetchColor(), '/topic/color');
                WebSocketService.subscribeSocket(() => this.props.fetchSize(), '/topic/size');
                WebSocketService.subscribeSocket(() => this.props.fetchWeightType(), '/topic/weight-type');
                WebSocketService.subscribeSocket(() => this.props.fetchProductDetail(id), '/topic/productDetail');
            });
            this.loadDataAttribute(id);
        }

    }
    loadDataAttribute = (id) => {
        let idCheck = 0;
        if (!this.props.colors.length) {
            this.props.fetchColor();
        }
        if (!this.props.sizes.length) {
            this.props.fetchSize();
        }
        if (!this.props.weightTypes) {
            this.props.fetchWeightType();
        }
        if (!this.props.listProductDetail.length || idCheck !== id) {
            idCheck = id;
            this.props.fetchProductDetail(id);
        }
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

    //lay nhieu data
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);

        // Lấy danh sách object1 từ listProductDetail dựa trên selectedRowKeys
        const selectedObjects = convertData(this.props.listProductDetail)
            .filter(item => selectedRowKeys.includes(item.key)) // Lọc những sản phẩm được chọn
            .map(item => item.object1); // Lấy object1

        this.setState({ selectedRowKeysProductDetail: selectedObjects });
    };


    onChangeMultyColors = (selectedValues) => {
        const selectedColors = convertDataSelected(this.props.colors)
            .filter(color => selectedValues.includes(color.value))
            .map(({ value, label, code }) => ({ value, label, code }));;
        this.setState({ selectedColors }, this.updateVariants);
    };

    onChangeMultySizes = (selectedValues) => {
        const selectedSizes = convertDataSelected(this.props.sizes)
            .filter(size => selectedValues.includes(size.value))
            .map(({ value, label, code }) => ({ value, label, code }));;
        this.setState({ selectedSizes }, this.updateVariants);
    }

    // Tạo danh sách biến thể sản phẩm
    updateVariants = () => {
        const { selectedColors, selectedSizes } = this.state;
        const variants = [];

        console.log('Đã vào updateVariants');

        if (selectedColors.length > 0 && selectedSizes.length > 0) {
            let key = 1;
            selectedColors.forEach(color => {
                selectedSizes.forEach(size => {
                    variants.push({
                        key: key,
                        color,
                        size,
                        quantity: 1,
                        importPrice: formatNumberWithCommas(1000),
                        sellingPrice: formatNumberWithCommas(1000),
                        weight: 1,
                        weightType: 1,
                        status: 1
                    });
                    key++;
                });
            });
        }

        this.setState({ productVariations: variants });
    };


    render() {
        const columns = [
            {
                title: 'Màu sắc',
                dataIndex: 'object5',
                width: 140,
                fixed: 'left',
                render: (_, data) => (
                    <div className="flex items-center justify-start space-x-2">
                        <ColorPicker value={data.object6} size="small" disabled={true} />
                        <span>{data.object7}</span>
                    </div>
                ),
                filters: convertDataFillter(this.props.colors),
                onFilter: (value, record) => {
                    const text = String(record.object5 || ""); // Chuyển đổi thành chuỗi an toàn
                    return text.startsWith(value);
                },
                filterSearch: true,
                filterMode: 'tree',
            },
            {
                title: 'Kích cỡ',
                dataIndex: 'object2',
                width: 140,
                fixed: 'left',
                render: (_, data) => (
                    <div className="flex items-center justify-start space-x-2">
                        <span>{data.object3}-{data.object4}</span>
                    </div>
                ),
                filters: convertDataFillter(this.props.sizes),
                onFilter: (value, record) => {
                    const text = String(record.object2 || ""); // Chuyển đổi thành chuỗi an toàn
                    return text.startsWith(value);
                },
                filterSearch: true,
                filterMode: 'tree',
            },
            {
                title: 'Số lượng',
                dataIndex: 'object14',
                width: 240,
                render: (_, data) => (
                    <div className="flex items-center justify-start space-x-2">
                        {this.state.selectedRowKeysProductDetail.includes(data.object1) ? (
                            <Input value={formatNumberWithCommasText(data.object14)} />
                        ) : (
                            <span>{formatNumberWithCommasText(data.object14)}</span>
                        )}
                    </div>
                ),
                sorter: (a, b) => {
                    return a.object14 - b.object14;  // Sắp xếp theo độ dài chuỗi
                },
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Giá nhập (VNĐ)',
                dataIndex: 'object12',
                width: 240,
                render: (_, data) => (
                    <div className="flex items-center justify-start space-x-2">
                        {this.state.selectedRowKeysProductDetail.includes(data.object1) ? (
                            <Input value={formatNumberWithCommasText(data.object12)} />
                        ) : (
                            <span>{formatNumberWithCommasText(data.object12)}</span>
                        )}
                    </div>
                ),
                sorter: (a, b) => {
                    return a.object12 - b.object12;  // Sắp xếp theo độ dài chuỗi
                },
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Giá bán (VNĐ)',
                dataIndex: 'object13',
                width: 240,
                render: (_, data) => (
                    <div className="flex items-center justify-start space-x-2">
                        {this.state.selectedRowKeysProductDetail.includes(data.object1) ? (
                            <Input value={formatNumberWithCommasText(data.object13)} />
                        ) : (
                            <span>{formatNumberWithCommasText(data.object13)}</span>
                        )}
                    </div>
                ),
                sorter: (a, b) => {
                    return a.object13 - b.object13;  // Sắp xếp theo độ dài chuỗi
                },
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Cân nặng',
                dataIndex: 'object11',
                width: 240,
                render: (_, data) => (
                    <div className="flex items-center justify-start space-x-2">
                        {this.state.selectedRowKeysProductDetail.includes(data.object1) ? (
                            <Input value={formatNumberWithCommasText(data.object13)} />
                        ) : (
                            <span>{formatNumberWithCommasText(data.object13)}</span>
                        )}
                    </div>
                ),

            },
            {
                title: 'Loại cân nặng',
                dataIndex: 'object10',
                width: 240, // Giới hạn chiều rộng cột
                render: (_, data) => (
                    <div className="flex items-center justify-start space-x-2">
                        <span>{data.object9} - {data.object10}</span>
                    </div>
                ),
                filters: convertDataFillter(this.props.weightTypes),
                onFilter: (value, record) => {
                    const text = String(record.object8 || ""); // Chuyển đổi thành chuỗi an toàn
                    return text.startsWith(value);
                },
                filterSearch: true,
                filterMode: 'tree',
            },
            {
                title: 'Trạng thái',
                dataIndex: 'object15',
                width: 190,
                render: (_, data) => (
                    <div className="flex items-center justify-start space-x-2">
                        <Switch
                            checkedChildren="Hoạt động"
                            unCheckedChildren="Ngừng hoạt động"
                            checked={
                                data.object15 === 1
                            }
                        />
                    </div>
                ),
            },
            {
                title: 'Chức năng',
                width: 140,
                fixed: 'right',
            },
        ];
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const { id } = this.props.params;
        console.log('data chi tiet: ', convertData(this.props.listProductDetail))
        return (<>
            <Link to={`/manage/product/${id}`}>
                <Button color="default" variant="text" className="mb-3" >
                    <ArrowLeftOutlined />  Về trang thông tin sản phẩm
                </Button>
            </Link>
            <BoxTable columnsColor={columns} dataColor={convertData(this.props.listProductDetail)} checkBoxTable={1} rowSelection={rowSelection} />
        </>)
    }
}

const mapStateToProps = (state) => {
    return {
        listProductDetail: state.productDetail.productDetails,
        sizes: state.size.sizes,
        colors: state.color.colors,
        weightTypes: state.weightType.weightTypes,
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchProductDetail: (id) => dispatch(fetchProductDetail(id)),
    fetchColor: () => dispatch(fetchColor()),
    fetchSize: () => dispatch(fetchSize()),
    fetchWeightType: () => dispatch(fetchWeightType()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageHomeProductDetail));