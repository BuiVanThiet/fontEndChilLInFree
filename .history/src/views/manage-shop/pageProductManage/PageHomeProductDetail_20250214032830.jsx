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
import { convertData, getColumnSearchProps, convertDataFillter, convertDataSelected, formatNumberWithCommasText } from '../../../store/action/ActionRenderData';

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
        if (!this.props.colors.length) {
            this.props.fetchColor();
        }
        if (!this.props.sizes.length) {
            this.props.fetchSize();
        }
        if (!this.props.listProductDetail) {
            this.props.fetchProductDetail(id);
        }
        if (!this.props.weightTypes.length) {
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


    render() {
        const columns = [
            {
                title: 'Màu sắc',
                dataIndex: 'object7',
                width: 140,
                fixed: 'left',
                render: (_, data) => (
                    <div className="flex items-center justify-start space-x-2">
                        <ColorPicker value={data.object6} size="small" disabled={true} />
                        <span>{data.object7}</span>
                    </div>
                ),
            },
            {
                title: 'Kích cỡ',
                dataIndex: 'object4',
                width: 140,
                fixed: 'left',
                render: (_, data) => (
                    <div className="flex items-center justify-start space-x-2">
                        <span>{data.object3}-{data.object4}</span>
                    </div>
                ),
            },
            {
                title: 'Số lượng',
                dataIndex: 'object14',
                width: 240,
                render: (_, data) => (
                    <div className="flex items-center justify-start space-x-2">
                        <span>{formatNumberWithCommasText(data.object14)}</span>
                    </div>
                ),
            },
            {
                title: 'Giá nhập (VNĐ)',
                dataIndex: 'object12',
                width: 240,
                render: (_, data) => (
                    <div className="flex items-center justify-start space-x-2">
                        <span>{formatNumberWithCommasText(data.object12)}</span>
                    </div>
                ),
            },
            {
                title: 'Giá bán (VNĐ)',
                dataIndex: 'object13',
                width: 240,
                render: (_, data) => (
                    <div className="flex items-center justify-start space-x-2">
                        <span>{formatNumberWithCommasText(data.object13)}</span>
                    </div>
                ),
            },
            {
                title: 'Cân nặng',
                dataIndex: 'object11',
                width: 240,

            },
            {
                title: 'Loại cân nặng',
                dataIndex: 'object10',
                width: 240, // Giới hạn chiều rộng cột
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
        const { id } = this.props.params;
        console.log('data chi tiet: ', convertData(this.props.listProductDetail))
        return (<>
            <Link to={`/manage/product/${id}`}>
                <Button color="default" variant="text" className="mb-3" >
                    <ArrowLeftOutlined />  Về trang thông tin sản phẩm
                </Button>
            </Link>
            <BoxTable columnsColor={columns} dataColor={convertData(this.props.listProductDetail)} checkBoxTable={1} />
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