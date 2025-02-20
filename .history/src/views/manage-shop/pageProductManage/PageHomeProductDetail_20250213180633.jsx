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

class PageHomeProductDetail extends React.Component {
    render() {
        const columns = [
                    {
                        title: 'Màu sắc',
                        dataIndex: 'object2',
                        render: (_, data) => (
                            <div className="flex items-center justify-start space-x-2">
                                <ColorPicker value={data.color.code} size="small" disabled={true} />
                                <span>{data.color.label}</span>
                            </div>
                        ),
                        width: 140,
                        fixed: 'left',
                    },
                    {
                        title: 'Kích cỡ',
                        dataIndex: 'object3',
                        render: (_, data) => (
                            <div className="flex items-center justify-start space-x-2">
                                <span>{data.size.code} - </span>
                                <span>{data.size.label}</span>
                            </div>
                        ),
                        width: 140,
                        fixed: 'left',
                    },
                    {
                        title: 'Số lượng',
                        dataIndex: 'object5',
                        render: (_, data) => (
                            <div className="flex items-center justify-start space-x-2">
                                <Input placeholder="Basic usage" value={data.quantity} onChange={(e) => this.changeMultyData(formatNumberWithCommas(e.target.value), 'quantity', data.key)} />
                            </div>
                        ),
                        width: 240,
        
                    },
                    {
                        title: 'Giá nhập',
                        dataIndex: 'object5',
                        render: (_, data) => (
                            <div className="flex items-center justify-start space-x-2">
                                <Input placeholder="Basic usage" value={data.importPrice} onChange={(e) => this.changeMultyData(formatNumberWithCommas(e.target.value), 'importPrice', data.key)} />
                            </div>
                        ),
                        width: 240,
        
                    },
                    {
                        title: 'Giá bán',
                        dataIndex: 'object7',
                        render: (_, data) => (
                            <div className="flex items-center justify-start space-x-2">
                                <Input placeholder="Basic usage" value={data.sellingPrice} onChange={(e) => this.changeMultyData(formatNumberWithCommas(e.target.value), 'sellingPrice', data.key)} />
                            </div>
                        ),
                        width: 240,
        
                    },
                    {
                        title: 'Cân nặng',
                        dataIndex: 'object9',
                        render: (_, data) => (
                            <div className="flex items-center justify-start space-x-2">
                                <Input placeholder="Basic usage" value={data.weight} onChange={(e) => this.changeMultyData(formatNumberWithCommas(e.target.value), 'weight', data.key)} />
                            </div>
                        ),
                        width: 240,
        
                    },
                    {
                        title: 'Loại cân nặng',
                        dataIndex: 'object10',
                        render: (_, data) => (
                            <div className="flex items-center justify-start space-x-2">
                                <Select
                                    showSearch
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Tìm kiếm"
                                    optionFilterProp="label"
                                    value={data.weightType}
                                    onChange={(value) => this.changeMultyData(value, 'weightType', data.key)} // Cập nhật weightType cho tất cả sản phẩm đã chọn
                                    options={convertDataSelected(this.props.weightTypes)}
                                />
                            </div>
                        ),
                        width: 240, // Giới hạn chiều rộng cột
                    },
                    {
                        title: 'Trạng thái',
                        dataIndex: 'object12',
                        render: (_, data) => (
                            <div className="flex items-center justify-start space-x-2">
                                <Switch
                                    onChange={(value) => this.changeMultyData(value ? 1 : 2, 'status', data.key)} // Cập nhật weightType cho tất cả sản phẩm đã chọn
                                    checkedChildren="Hoạt động"
                                    unCheckedChildren="Ngừng hoạt động"
                                    checked={
                                        data.status === 1
                                    }
                                />
                            </div>
                        ),
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
            <BoxTable columnsColor={columns} dataColor={null} checkBoxTable={2} />
        </>)
    }
}

export default withRouter(PageHomeProductDetail);