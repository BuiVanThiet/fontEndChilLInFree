import React from "react";
import PageProduct from "./PageProduct";
import PageAddProduct from "./PageAddProduct";
import PageUpdateProduct from "./PageUpdateProduct";
import BoxTable from "../BoxTable";
import { Link, Route, Routes, useLocation } from 'react-router-dom';

class PageHomeProductDetail extends React.Component {
    render() {
        const columns = [
            {
                title: 'Mã Sản phẩm',
                dataIndex: 'object2',
                width: 140,
                ...getColumnSearchProps('object2', this.state.searchText, this.state.searchedColumn, this.handleSearch, this.handleReset),
                fixed: 'left',
                render: (_, product) => (
                    this.state.productData?.object1 === product.object1 ?
                        <>
                            <Input placeholder="Nhập mã sản phẩm" value={this.state.productData.object2} onChange={(event) => this.onChangeDataProduct(event.target.value, 'object2')} />
                        </>
                        : product.object2
                ),
            },
            {
                title: 'Tên Sản phẩm',
                dataIndex: 'object3',
                width: 140,
                ...getColumnSearchProps('object3', this.state.searchText, this.state.searchedColumn, this.handleSearch, this.handleReset),
                fixed: 'left',
                render: (_, product) => (
                    this.state.productData?.object1 === product.object1 ?
                        <>
                            <Input placeholder="Nhập tên sản phẩm" value={this.state.productData.object3} onChange={(event) => this.onChangeDataProduct(event.target.value, 'object3')} />
                        </>
                        : product.object3
                ),
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
        return (<>
            <BoxTable />
        </>)
    }
}

export default PageHomeProductDetail;