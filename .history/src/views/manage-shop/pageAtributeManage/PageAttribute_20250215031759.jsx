import React from "react";
import BoxTable from "../BoxTable";
import FormAddAtribute from "./FormAddAtribute";
import { Space, Button, Typography, ColorPicker, Input, Switch, Image, Upload } from 'antd';
import { fetchAttribute, addAttribute, updateAttributeAction } from '../../../store/action/AttributeActions';
import WebSocketService from '../../../service/WebSocketService';
import { connect } from 'react-redux';
import { CLICK_ATTIBUTE_TYPE } from '../../../store/reducers/RootReducer';
import { toast } from 'react-toastify';
import {
    SearchOutlined, HighlightOutlined, PlusOutlined
} from '@ant-design/icons';

import { convertData, getColumnSearchProps } from '../../../store/action/ActionRenderData';
//attribute
import { fetchColor, addColor, updateColor } from '../../../store/action/ColorActions';
import { fetchCategory, addCategory, updateCategory } from '../../../store/action/CategoryActions';
import { fetchManufacturer, addManufacturer, updateManufacturer } from '../../../store/action/ManufacturerActions';
import { fetchOrigin, addOrigin, updateOrigin } from '../../../store/action/OriginActions';
import { fetchSize, addSize, updateSize } from '../../../store/action/SizeActions';
import { fetchWeightType, addWeightType, updateWeightType } from '../../../store/action/WeightTypeAction';

const { Title } = Typography;

class PageColor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attribute: {
                key: '',
                object1: '',
                object2: '',
                object3: '',
                object4: '',
                object5: '',
                object6: '',
            },
            errorCode: '',
            errorName: '',
            shouldFetch: !props.attributes.length,
            searchText: '',
            searchedColumn: '',
            checkValidateUpdateAttribute: true
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.atTribute_type !== this.props.atTribute_type) {
            this.loadDataAttribute(); // Chạy khi giá trị Redux thay đổi
        }
    }

    componentDidMount() {
        WebSocketService.connect(() => {
            // if (this.props.atTribute_type === 1) {
            // WebSocketService.subscribeToColorUpdates(() => this.props.fetchAttribute(this.props.atTribute_type), this.props.atTribute_type); // Sử dụng arrow function
            WebSocketService.subscribeSocket(() => this.props.fetchColor(), '/topic/color');
            WebSocketService.subscribeSocket(() => this.props.fetchCategory(), '/topic/category');
            WebSocketService.subscribeSocket(() => this.props.fetchManufacturer(), '/topic/manufacturer');
            WebSocketService.subscribeSocket(() => this.props.fetchOrigin(), '/topic/origin');
            WebSocketService.subscribeSocket(() => this.props.fetchSize(), '/topic/size');
            WebSocketService.subscribeSocket(() => this.props.fetchWeightType(), '/topic/weight-type');
            this.loadDataAttribute();

            // }
            // if (this.state.shouldFetch) {
            //     this.props.fetchAttribute(this.props.atTribute_type);
            // }
        });
    }

    editAtribute = (attribute) => {
        this.setState({
            attribute: {
                key: attribute.key,
                object1: attribute.object1,
                object2: attribute.object2,
                object3: attribute.object3,
                object4: attribute.object4,
                object5: attribute.object5,
                object6: attribute.object6,
            }
        });
    };

    onChangeCodeColorAtribute = (color) => {
        this.setState({
            attribute: { object1: this.state.attribute.object1, object2: color.toHexString(), object3: this.state.attribute.object3, object4: this.state.attribute.object4 } // Lấy mã màu dạng hex (VD: #ff0000)
        }, () => { this.validateAddNew(); });

    };

    onChangeCodeAtribute = (event) => {
        this.setState({
            attribute: { object1: this.state.attribute.object1, object2: event.target.value, object3: this.state.attribute.object3, object4: this.state.attribute.object4 } // Lấy mã màu dạng hex (VD: #ff0000)
        }, () => { this.validateAddNew(); });
    };

    onChangeNameAtribute = (event) => {
        this.setState({
            attribute: { object1: this.state.attribute.object1, object2: this.state.attribute.object2, object3: event.target.value, object4: this.state.attribute.object4 } // Lấy mã màu dạng hex (VD: #ff0000)
        }, () => { this.validateAddNew(); });
    }

    onChangeStatus = (e) => {
        this.setState({
            attribute: { object1: this.state.attribute.object1, object2: this.state.attribute.object2, object3: this.state.attribute.object3, object4: e ? 1 : 2 } // Lấy mã màu dạng hex (VD: #ff0000)
        }, () => { this.validateAddNew(); });
    }
    //them moi
    addNewAttribute = (data) => {
        if (this.props.atTribute_type === 1) {
            this.props.saveColor(data);
        } else if (this.props.atTribute_type === 2) {
            this.props.saveCategory(data);
        } else if (this.props.atTribute_type === 3) {
            this.props.saveManufacturer(data);
        } else if (this.props.atTribute_type === 4) {
            this.props.saveOrigin(data);
        } else if (this.props.atTribute_type === 5) {
            this.props.saveSize(data);
        } else if (this.props.atTribute_type === 6) {
            this.props.saveWeightType(data);
        }
    }

    // Sửa lại hàm `saveUpdateAtribute`
    saveUpdateAtribute = () => {
        let atributeSave = {
            id: this.state.attribute.object1,
            code: this.state.attribute.object2,
            name: this.state.attribute.object3,
            status: this.state.attribute.object4
        };
        // this.props.updateAttribute(atributeSave, this.props.atTribute_type); // Truyền typeAttribute vào
        if (this.props.atTribute_type === 1) {
            this.props.updateColor(atributeSave);
        } else if (this.props.atTribute_type === 2) {
            this.props.updateCategory(atributeSave);
        } else if (this.props.atTribute_type === 3) {
            this.props.updateManufacturer(atributeSave);
        } else if (this.props.atTribute_type === 4) {
            this.props.updateOrigin(atributeSave);
        } else if (this.props.atTribute_type === 5) {
            this.props.updateSize(atributeSave);
        } else if (this.props.atTribute_type === 6) {
            this.props.updateWeightType(atributeSave);
        }
        this.setState({
            attribute: {
                key: '',
                object1: '',
                object2: '',
                object3: '',
                object4: '',
                object5: '',
                object6: '',
            },
            errorCode: '',
            errorName: ''
        });
        toast.success('Sửa thuộc tính thành công!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        });
    };

    cancelUpdateAtribute = () => {
        this.setState({ attribute: {} });
    };



    onClickAttributeType = (type) => {
        this.props.clickAttributeType(type);
        this.loadDataAttribute();
        // this.props.fetchAttribute(type);
        this.setState({ attribute: {} })
    }

    loadDataAttribute = () => {
        if (!this.props.colors.length && this.props.atTribute_type === 1) {
            this.props.fetchColor();
        }
        if (!this.props.categores.length && this.props.atTribute_type === 2) {
            this.props.fetchCategory();
        }
        if (!this.props.manufacturers.length && this.props.atTribute_type === 3) {
            this.props.fetchManufacturer();
        }
        if (!this.props.origins.length && this.props.atTribute_type === 4) {
            this.props.fetchOrigin();
        }
        if (!this.props.sizes.length && this.props.atTribute_type === 5) {
            this.props.fetchSize();
        }
        if (!this.props.weightTypes.length && this.props.atTribute_type === 6) {
            this.props.fetchWeightType();
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

    //validate 
    checkCodeAttribute = (code) => {
        if (code.trim() === '') {
            return '*Mời nhập mã thuộc tính!';
        } else if (code.trim().length > 255) {
            return '*Mã thuộc tính không được quá 255 ký tự!';
        }
        return '';
    }

    checkNameAttribute = (name) => {
        if (name.trim() === '') {
            return '*Mời nhập tên thuộc tính!';
        } else if (name.trim().length > 255) {
            return '*Tên thuộc tính không được quá 255 ký tự!';
        }
        return '';
    }

    checkStatusAttribute = (status) => {
        if (status !== 1 && status !== 2) {
            return '*Mời chọn trạng thái thuộc tính!';
        }
        return '';
    }

    validateAddNew = () => {
        const checkCode = this.checkCodeAttribute(this.state.attribute.object2);
        const checkName = this.checkNameAttribute(this.state.attribute.object3);
        const checkStatus = this.checkStatusAttribute(this.state.attribute.object4);
        this.setState({ errorCode: checkCode, errorName: checkName });
        if (checkCode.trim() === '' && checkName.trim() === '' && checkStatus.trim() === '') {
            this.setState({ checkValidateUpdateAttribute: true });
        } else {
            this.setState({ checkValidateUpdateAttribute: false });
        }
    };

    render() {
        const columns = [
            {
                title: 'Mã thuộc tính',
                dataIndex: 'object2',
                width: '25%',
                ...getColumnSearchProps('object2', this.state.searchText, this.state.searchedColumn, this.handleSearch, this.handleReset),
                // ...this.getColumnSearchProps('object2'),
                render: (_, attribute) => (
                    this.props.atTribute_type === 1 ? (
                        <>
                            <ColorPicker
                                value={!this.state.attribute?.object1 ? attribute.object2 : (this.state.attribute?.object1 === attribute.object1 ? this.state.attribute.object2 : attribute.object2)}
                                showText
                                onChange={this.onChangeCodeColorAtribute}
                                disabled={this.state.attribute?.object1 !== attribute.object1}
                            />

                            <span className="text-red-600">{this.state.errorCode}</span>

                        </>
                    ) : (
                        this.state.attribute?.object1 === attribute.object1 ?
                            <>
                                <Input
                                    placeholder="Nhập mã thuộc tính"
                                    value={this.state.attribute.object2 || ''}
                                    onChange={this.onChangeCodeAtribute}
                                />
                                <span className="text-red-600">{this.state.errorCode}</span>
                            </>

                            : attribute.object2
                    )
                ),
            },
            {
                title: 'Tên thuộc tính',
                dataIndex: 'object3',
                width: '25%',
                ...getColumnSearchProps('object3', this.state.searchText, this.state.searchedColumn, this.handleSearch, this.handleReset),
                render: (_, attribute) => (
                    this.state.attribute?.object1 === attribute.object1 ?
                        <>
                            <Input placeholder="Nhập mã thuộc tính" value={this.state.attribute.object3} onChange={this.onChangeNameAtribute} />
                            <span className="text-red-600">{this.state.errorName}</span>
                        </>
                        : attribute.object3
                ),
            },
            {
                title: 'Trạng thái',
                dataIndex: 'object4',
                width: '25%',
                render: (_, attribute) => {
                    return (
                        <div>
                            <Switch
                                onChange={this.onChangeStatus}
                                checkedChildren="Hoạt động"
                                unCheckedChildren="Ngừng hoạt động"
                                checked={
                                    (this.state.attribute?.object1 && this.state.attribute?.object1 === attribute.object1)
                                        ? (this.state.attribute.object4 === 1)
                                        : (attribute.object4 === 1)
                                }
                                disabled={this.state.attribute?.object1 !== attribute.object1}
                            />
                        </div>
                    );
                },
                sorter: (a, b) => {
                    const statusA = a.object4 === 1 ? "Hoạt động" : "Ngừng hoạt động";
                    const statusB = b.object4 === 1 ? "Hoạt động" : "Ngừng hoạt động";
                    return statusA.length - statusB.length;  // Sắp xếp theo độ dài chuỗi
                },
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Chức năng',
                width: '25%',
                render: (_, attribute) => (
                    <Space size="middle">
                        {this.state.attribute?.object1 === attribute.object1 ?
                            (
                                <>
                                    <Button color="danger" variant="dashed" onClick={this.saveUpdateAtribute} disabled={!this.state.checkValidateUpdateAttribute}>Lưu</Button>
                                    <Button color="danger" variant="dashed" onClick={this.cancelUpdateAtribute}>Hủy</Button>
                                </>
                            ) :
                            <Button color="danger" variant="dashed" onClick={() => this.editAtribute(attribute)}>Chỉnh sửa</Button>
                        }
                    </Space>
                ),
            },
        ];

        // let listAtribute = convertData(this.props.attributes);
        let listAtribute;
        if (this.props.atTribute_type === 1) {
            listAtribute = convertData(this.props.colors);
        } else if (this.props.atTribute_type === 2) {
            listAtribute = convertData(this.props.categores);
        } else if (this.props.atTribute_type === 3) {
            listAtribute = convertData(this.props.manufacturers);
        } else if (this.props.atTribute_type === 4) {
            listAtribute = convertData(this.props.origins);
        } else if (this.props.atTribute_type === 5) {
            listAtribute = convertData(this.props.sizes);
        } else if (this.props.atTribute_type === 6) {
            listAtribute = convertData(this.props.weightTypes);
        } else {
            listAtribute = convertData([]);
        }

        return (
            <>
                <Title level={4} className="">--Danh sách thuộc tính--</Title>
                <FormAddAtribute
                    // addNewColor={this.props.saveAttribute}
                    addNewAttribute={this.addNewAttribute}
                    clickAttributeType={this.onClickAttributeType}
                    atTribute_type={this.props.atTribute_type}
                    checkCodeAttribute={this.checkCodeAttribute}
                    checkNameAttribute={this.checkNameAttribute}
                    checkStatusAttribute={this.checkStatusAttribute}
                />
                <BoxTable columnsColor={columns} dataColor={listAtribute} checkBoxTable={2} />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        attributes: state.attribute.attributes,
        atTribute_type: state.root.atTribute_type,
        active_card_order: state.root.active_card_order,
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
    clickAttributeType: (type) => dispatch(CLICK_ATTIBUTE_TYPE(type)),
    // fetchAttribute: (typeAttribute) => dispatch(fetchAttribute(typeAttribute)),
    saveAttribute: (newColor, typeAttribute) => dispatch(addAttribute(newColor, typeAttribute)),
    updateAttribute: (color, typeAttribute) => dispatch(updateAttributeAction(color, typeAttribute)),
    //attribute
    fetchColor: () => dispatch(fetchColor()),
    fetchCategory: () => dispatch(fetchCategory()),
    fetchManufacturer: () => dispatch(fetchManufacturer()),
    fetchOrigin: () => dispatch(fetchOrigin()),
    fetchSize: () => dispatch(fetchSize()),
    fetchWeightType: () => dispatch(fetchWeightType()),
    //add attribute
    saveColor: (data) => dispatch(addColor(data)),
    saveCategory: (data) => dispatch(addCategory(data)),
    saveManufacturer: (data) => dispatch(addManufacturer(data)),
    saveOrigin: (data) => dispatch(addOrigin(data)),
    saveSize: (data) => dispatch(addSize(data)),
    saveWeightType: (data) => dispatch(addWeightType(data)),
    //update attribute
    updateColor: (data) => dispatch(updateColor(data)),
    updateCategory: (data) => dispatch(updateCategory(data)),
    updateManufacturer: (data) => dispatch(updateManufacturer(data)),
    updateOrigin: (data) => dispatch(updateOrigin(data)),
    updateSize: (data) => dispatch(updateSize(data)),
    updateWeightType: (data) => dispatch(updateWeightType(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageColor);
