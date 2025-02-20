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
                        </>
                        : product.object5
                ),
            },
            {
                title: 'Nhà sản xuất',
                dataIndex: 'object7',
                width: 140,
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
                        </>
                        : product.object7
                ),
            },
            {
                title: 'Quốc gia',
                dataIndex: 'object9',
                width: 140,
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
                    <TextArea
                        rows={4}
                        value={((this.state.productData?.object10 && this.state.productData?.object1 === product.object1) ? this.state.productData.object10 : product.object10).replace(/\\n/g, '\n')}  // Loại bỏ tất cả dấu '\\' không phải là \\n
                        onChange={(event) => this.onChangeDataProduct(event.target.value, 'object10')}
                        disabled={!(this.state.productData?.object1 === product.object1)}
                    />
                ),


            },
            {
                title: 'Trạng thái',
                dataIndex: 'object12',
                width: 190,
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
                                    <Button color="danger" variant="dashed" onClick={() => this.saveUpdateProduct(this.state.productData)}>Lưu</Button>
                                    <Button color="danger" variant="dashed" onClick={() => this.onClickCancelDataProduct()}>Hủy</Button>
                                </>
                            ) :
                            <Button color="danger" variant="dashed" onClick={() => this.onClickDataProduct(product)}>Chỉnh sửa</Button>
                        }
                        <Link to={`/manage/product/${product.object1}`}>
                            <Button color="danger" variant="dashed" onClick={() => this.props.resetDataProductEdit()}>Thông tin chi tiết</Button>
                        </Link>
                    </Space>
                ),
            },
        ];
        return (<>
            <BoxTable />
        </>)
    }
}

export default PageHomeProductDetail;