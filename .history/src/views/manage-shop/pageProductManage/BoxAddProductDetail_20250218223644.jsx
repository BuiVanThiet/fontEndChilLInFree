import React from "react";
import { Space, Button, Typography, ColorPicker, Input, Switch, Select, Row, Col, Card, Image, Upload } from 'antd';
import { toast } from 'react-toastify';
import BoxTable from "../BoxTable";
import { convertDataSelected, formatNumberWithCommas } from '../../../store/action/ActionRenderData';
import { connect } from 'react-redux';
import {
    SearchOutlined, HighlightOutlined, PlusOutlined, ArrowLeftOutlined
} from '@ant-design/icons';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import WebSocketService from '../../../service/WebSocketService';
//attribute
import { fetchColor } from '../../../store/action/ColorActions';
import { fetchSize } from '../../../store/action/SizeActions';
import { fetchWeightType } from '../../../store/action/WeightTypeAction';
// import { data } from "autoprefixer";
import { withRouter } from "../../../utils/withRouter";
import { getAddProductDetail } from '../../../store/action/ProductDetailAction'
import { START_LOADING, STOP_LOADING } from '../../../store/reducers/RootReducer';


const { Title } = Typography;

class PageAddProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            searchedColumn: '',
            selectedRowKeysProductDetail: [],
            selectedColors: [],
            selectedSizes: [],
            productVariations: null,
            checkDataAddProductDetail: false,
        };
    }

    componentDidMount() {
        WebSocketService.connect(() => {
            WebSocketService.subscribeSocket(() => this.props.fetchColor(), '/topic/color');
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

        if (!this.props.sizes.length) {
            this.props.fetchSize();
        }
        if (!this.props.weightTypes.length) {
            this.props.fetchWeightType();
        }
    }

    //lay nhieu data
    onSelectChange = (selectedRowKeysProductDetail) => {
        this.setState({ selectedRowKeysProductDetail })
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

    //delete productdetail
    onClickDeleteProductDetail = (productDetail) => {
        let { productVariations } = this.state;
        productVariations = productVariations.filter(data => data.key !== productDetail.key);
        this.setState({
            productVariations: productVariations
        }, () => this.checkColorsAndSizes())
    }

    checkColorsAndSizes = () => {
        let { productVariations, selectedColors, selectedSizes } = this.state;
        const filteredColors = selectedColors.filter(color => {
            // Kiểm tra xem color.value có tồn tại trong productVariations hay không
            return productVariations.some(pr => pr.color.value === color.value);
        });
        const filteredSize = selectedSizes.filter(size => {
            // Kiểm tra xem color.value có tồn tại trong productVariations hay không
            return productVariations.some(pr => pr.size.value === size.value);
        });
        this.setState({
            selectedColors: filteredColors,
            selectedSizes: filteredSize
        });
    };


    //đổi nhiều cùng lúc
    changeMultyData = (value, objectChange, key) => {
        const { productVariations, selectedRowKeysProductDetail } = this.state;

        const updatedVariations = productVariations.map(variation => {
            // Kiểm tra xem variation.key có nằm trong selectedRowKeysProductDetail không
            if (selectedRowKeysProductDetail.includes(variation.key)) {
                return {
                    ...variation,
                    [objectChange]: value // Cập nhật giá trị mới cho trường được chỉ định
                };
            } else {
                if (variation.key === key) {
                    return {
                        ...variation,
                        [objectChange]: value
                    };
                }
            }
            return variation;
        });

        // Cập nhật state với giá trị đã thay đổi
        this.setState({ productVariations: updatedVariations });
    };

    saveProductDetail = async () => {
        const { id } = this.props.params;

        const newData = this.state.productVariations.map(({ color, size, quantity, importPrice, sellingPrice, weight, weightType, status }) => ({
            idProduct: id ? id : null,
            idColor: color.value,
            idSize: size.value,
            quantity: quantity,
            importPrice: importPrice,
            sellingPrice: sellingPrice,
            weight: weight,
            idWeight: weightType,
            status: status
        }));
        if (id) {
            await this.props.startLoading();
        }
        await this.props.getAddProductDetail(newData);
        if (id) {
            await this.props.stopLoading();
        }
        await this.setState({
            productVariations: null,
            selectedColors: [],
            selectedSizes: [],
        });
        if (id) {
            toast.success('Thêm mới biến thể sản phẩm thành công!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
        }
    }


    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

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
                render: (_, data) => (
                    <div className="flex items-center justify-start space-x-2">
                        <Button color="danger" variant="dashed" onClick={() => this.onClickDeleteProductDetail(data)}>
                            Xóa bỏ
                        </Button>
                    </div>
                ),
                fixed: 'right',

            },
        ];
        let listData = this.state.productVariations;
        const { id } = this.props.params;
        return (
            <>
                <>
                    {
                        id ? <Link to={`/manage/product/${id}/home-product-detail`}>
                            <Button color="default" variant="text" className="mb-3" onClick={async () => { await this.props.startLoading(); await this.props.stopLoading(); }}>
                                <ArrowLeftOutlined />  Về trang thông tin biến thể
                            </Button>
                        </Link> : ''
                    }
                    <Card type="inner" className="mt-3 mb-3">
                        <Title level={5} className="">--Biến thể sản phẩm---</Title>
                        <Row gutter={[16, 16]} >
                            <Col span={12} >
                                Màu sắc:
                                <Select
                                    mode="multiple"
                                    style={{
                                        width: '100%',
                                    }}
                                    value={this.state.selectedColors}
                                    placeholder="Tìm kiếm"
                                    filterOption={(input, option) =>
                                        option.label.toLowerCase().includes(input.toLowerCase()) // Tìm theo label
                                    }
                                    onChange={this.onChangeMultyColors}
                                    options={convertDataSelected(this.props.colors)}
                                    optionRender={(option) => (
                                        <Space>
                                            <ColorPicker defaultValue={option.data.code} size="small" disabled={true} />
                                            {option.data.label}
                                        </Space>
                                    )}
                                />
                            </Col>
                            <Col span={12} >
                                Kích cỡ:
                                <Select
                                    mode="multiple"
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Tìm kiếm"
                                    filterOption={(input, option) =>
                                        option.label.toLowerCase().includes(input.toLowerCase()) // Tìm theo label
                                    }
                                    value={this.state.selectedSizes}
                                    onChange={this.onChangeMultySizes}
                                    options={convertDataSelected(this.props.sizes)}
                                    optionRender={(option) => (
                                        <Space>
                                            {option.data.code} - {option.data.label}
                                        </Space>
                                    )}
                                />
                            </Col>
                        </Row>
                    </Card>
                    <BoxTable columnsColor={columns} dataColor={listData} checkBoxTable={1} rowSelection={rowSelection} />
                    <div className="flex items-end justify-end mt-3">
                        <Button
                            color="danger" variant="dashed"
                            disabled={
                                !id ? 
                                (!this.props.checkDataAddProduct && ) 
                                : ''
                            }
                            onClick={() => !id ? this.props.saveProduct(1, this.saveProductDetail) : this.saveProductDetail()}
                        >
                            {
                                !id ? 'Thêm sản phẩm và biến thể' : ' Thêm biến thể'
                            }

                        </Button>

                    </div>
                </>

            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        colors: state.color.colors,
        sizes: state.size.sizes,
        weightTypes: state.weightType.weightTypes
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchColor: () => dispatch(fetchColor()),
    fetchSize: () => dispatch(fetchSize()),
    fetchWeightType: () => dispatch(fetchWeightType()),
    getAddProductDetail: (list) => dispatch(getAddProductDetail(list)),
    startLoading: () => dispatch(START_LOADING()),
    stopLoading: () => dispatch(STOP_LOADING()),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageAddProductDetail));