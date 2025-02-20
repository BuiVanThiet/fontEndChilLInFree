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
import { fetchProductDetail, getUpdateProductDetail } from '../../../store/action/ProductDetailAction'
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
            dataChangeUpdate: [

            ]
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
        if (!this.props.weightTypes.length) {
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
        // Lấy danh sách object1 từ listProductDetail dựa trên selectedRowKeys
        const selectedObjects = convertData(this.props.listProductDetail)
            .filter(item => selectedRowKeys.includes(item.key)); // Lấy object1
        this.setState({ selectedRowKeysProductDetail: selectedObjects.map(item => item.object1), dataChangeUpdate: selectedObjects });
    };

    changeMultyData = (value, objectChange, key) => {
        const { dataChangeUpdate, selectedRowKeysProductDetail } = this.state;

        const updatedVariations = dataChangeUpdate.map(variation => {
            // Kiểm tra xem variation.key có nằm trong selectedRowKeysProductDetail không
            if (selectedRowKeysProductDetail.includes(variation.object1)) {
                return {
                    ...variation,
                    [objectChange]: value // Cập nhật giá trị mới cho trường được chỉ định
                };
            } else {
                if (variation.object1 === key) {
                    return {
                        ...variation,
                        [objectChange]: value
                    };
                }
            }
            return variation;
        });

        // Cập nhật state với giá trị đã thay đổi
        this.setState({ dataChangeUpdate: updatedVariations });
    };

    saveUpdateProductDetail = async () => {
        let id = -1;
        if (this.props && this.props.params) {
            id = this.props.params.id;
        }
        const newData = this.state.dataChangeUpdate.map(({ object1, object5, object2, object14, object12, object13, object11, object8 }) => ({
            id: object1,
            idProduct: id,
            idColor: object5,
            idSize: object2,
            quantity: object14,
            importPrice: object12,
            sellingPrice: object13,
            weight: object11,
            idWeight: object8
        }));

        await this.props.getUpdateProductDetail(newData, id);
        await this.setState({
            selectedRowKeysProductDetail: [],
            dataChangeUpdate: [

            ]
        });

        // console.log('data suaw: ', newData)
    }

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
                            <Input value={formatNumberWithCommasText(this.state.dataChangeUpdate.filter(item => item.object1 === data.object1).map(item => item.object14))} onChange={(e) => this.changeMultyData(formatNumberWithCommas(e.target.value), 'object14', data.object1)} />
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
                            <Input value={formatNumberWithCommasText(this.state.dataChangeUpdate.filter(item => item.object1 === data.object1).map(item => item.object12))} onChange={(e) => this.changeMultyData(formatNumberWithCommas(e.target.value), 'object12', data.object1)} />
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
                            <Input value={formatNumberWithCommasText(this.state.dataChangeUpdate.filter(item => item.object1 === data.object1).map(item => item.object13))} onChange={(e) => this.changeMultyData(formatNumberWithCommas(e.target.value), 'object13', data.object1)} />
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
                            <Input value={formatNumberWithCommasText(this.state.dataChangeUpdate.filter(item => item.object1 === data.object1).map(item => item.object11))} onChange={(e) => this.changeMultyData(formatNumberWithCommas(e.target.value), 'object11', data.object1)} />
                        ) : (
                            <span>{formatNumberWithCommasText(data.object11)}</span>
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
                        {this.state.selectedRowKeysProductDetail.includes(data.object1) ? (
                            <Select
                                showSearch
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Tìm kiếm"
                                optionFilterProp="label"
                                value={(this.state.dataChangeUpdate.filter(item => item.object1 === data.object1).map(item => item.object8))}
                                onChange={(e) => this.changeMultyData((e), 'object8', data.object1)}
                                // onChange={(value) => this.changeMultyData(value, 'weightType', data.key)} // Cập nhật weightType cho tất cả sản phẩm đã chọn
                                options={convertDataSelected(this.props.weightTypes)}
                                optionRender={(option) => (
                                    <Space>
                                        {option.data.code} - {option.data.label}
                                    </Space>
                                )}
                            />
                            // <Input value={formatNumberWithCommasText(data.object11)} />
                        ) : (
                            <span>{data.object10}</span>
                        )}
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
                render: (_, data) => {
                    // Tìm trong dataChangeUpdate xem có dữ liệu cập nhật hay không
                    const updatedItem = this.state.dataChangeUpdate.find(item => item.object1 === data.object1);

                    return (
                        <div className="flex items-center justify-start space-x-2">
                            <Switch
                                checkedChildren="Hoạt động"
                                unCheckedChildren="Ngừng hoạt động"
                                checked={updatedItem ? updatedItem.object15 === 1 : data.object15 === 1}
                                onChange={(checked) => this.changeMultyData(checked ? 1 : 2, 'object15', data.object1)}
                                disabled={!this.state.selectedRowKeysProductDetail.includes(data.object1)}
                            />
                        </div>
                    );
                },
            },
            {
                title: 'Chức năng',
                width: 140,
                fixed: 'right',
            },
        ];
        const { selectedRowKeysProductDetail } = this.state;
        const rowSelection = {
            selectedRowKeys: selectedRowKeysProductDetail, // Đảm bảo sử dụng đúng key
            onChange: this.onSelectChange,
        };

        console.log('data update:', this.state.dataChangeUpdate)
        const { id } = this.props.params;
        return (<>
            <Link to={`/manage/product/${id}`}>
                <Button color="default" variant="text" className="mb-3" >
                    <ArrowLeftOutlined />  Về trang thông tin sản phẩm
                </Button>
            </Link>
            {this.state.selectedRowKeysProductDetail.length > 0 ?
                <div className="mt-3 mb-3">
                    <Button color="danger" variant="dashed" onClick={() => this.saveUpdateProductDetail()}>
                        Lưu thay đổi
                    </Button>
                </div>
                : ''}
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
    getUpdateProductDetail: (list, id) => dispatch(getUpdateProductDetail(list, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageHomeProductDetail));