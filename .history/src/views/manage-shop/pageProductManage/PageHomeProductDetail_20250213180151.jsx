import React from "react";
import PageProduct from "./PageProduct";
import PageAddProduct from "./PageAddProduct";
import PageUpdateProduct from "./PageUpdateProduct";
import BoxTable from "../BoxTable";
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { Space, Button, Typography, ColorPicker, Input, Switch, Select } from 'antd';
import {
    SearchOutlined, HighlightOutlined, PlusOutlined
} from '@ant-design/icons';

class PageHomeProductDetail extends React.Component {
    render() {
        const columns = [
            {
                title: 'Mã Sản phẩm',
                dataIndex: 'object2',
                width: 140,
                fixed: 'left',
            },
            {
                title: 'Tên Sản phẩm',
                dataIndex: 'object3',
                width: 140,
                fixed: 'left',
            },
            {
                title: 'Danh mục',
                dataIndex: 'object5',
                width: 140,

            },
            {
                title: 'Nhà sản xuất',
                dataIndex: 'object7',
                width: 140,
            },
            {
                title: 'Quốc gia',
                dataIndex: 'object9',
                width: 140,
            },
            {
                title: 'Mô tả',
                dataIndex: 'object10',
                width: 540, // Giới hạn chiều rộng cột

            },
            {
                title: 'Trạng thái',
                dataIndex: 'object12',
                width: 190,

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

            },
        ];
        // const { id } = this.props.params;
        return (<>
            <Link to={`/manage/product/${1}`}>
                <Button color="danger" variant="dashed" >Về trang thông tin sản phẩm</Button>
            </Link>
            <BoxTable columnsColor={columns} dataColor={null} checkBoxTable={2} />
        </>)
    }
}

export default PageHomeProductDetail;