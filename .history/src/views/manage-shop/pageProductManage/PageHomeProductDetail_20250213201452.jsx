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

import { fetchProductDetail } from '../../../store/action/ProductDetailAction'

class PageHomeProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            searchedColumn: '',
            selectedRowKeysProductDetail: [],
        };
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
                dataIndex: 'object2',
                width: 140,
                fixed: 'left',
            },
            {
                title: 'Kích cỡ',
                dataIndex: 'object3',
                width: 140,
                fixed: 'left',
            },
            {
                title: 'Số lượng',
                dataIndex: 'object5',
                width: 240,

            },
            {
                title: 'Giá nhập',
                dataIndex: 'object5',
                width: 240,

            },
            {
                title: 'Giá bán',
                dataIndex: 'object7',
                width: 240,

            },
            {
                title: 'Cân nặng',
                dataIndex: 'object9',
                width: 240,

            },
            {
                title: 'Loại cân nặng',
                dataIndex: 'object10',
                width: 240, // Giới hạn chiều rộng cột
            },
            {
                title: 'Trạng thái',
                dataIndex: 'object12',
                width: 190,

            },
            {
                title: 'Chức năng',
                width: 140,
                fixed: 'right',
            },
        ];
        const { id } = this.props.params;
        return (<>
            <Link to={`/manage/product/${id}`}>
                <Button color="default" variant="text" className="mb-3" >
                    <ArrowLeftOutlined />  Về trang thông tin sản phẩm
                </Button>
            </Link>
            <BoxTable columnsColor={columns} dataColor={null} checkBoxTable={1} />
        </>)
    }
}

const mapStateToProps = (state) => {
    return {
        listProductDetail: state.productDetail.productDetails
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchProductDetail: (id) => 
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageHomeProductDetail));