import React from "react";
import { Card, ColorPicker, Col, Row, Input, Flex, Radio, Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { START_LOADING, STOP_LOADING } from '../../../store/reducers/RootReducer';
import { validateInteger, validateString, checkDuplicate, convertData } from '../../../store/action/ActionRenderData';

class FormAddAtribute extends React.Component {
    state = {
        valueAtribute: 1,
        valueStatus: 1,
        code: '',
        name: '',
        openModalAddAtribute: false,
        checkValidateAddNewAttribute: false,
    };

    validateAdd = () => {
        let { code, name, valueStatus } = this.state;
        const checkLenght = (validateString(code) === true && validateString(name) === true) ? true : false;
        let listCheck = [];
        if (this.props.atTribute_type === 1) {
            listCheck = convertData(this.props.colors);
        } else if (this.props.atTribute_type === 2) {
            listCheck = convertData(this.props.categores);
        } else if (this.props.atTribute_type === 3) {
            listCheck = convertData(this.props.manufacturers);
        } else if (this.props.atTribute_type === 4) {
            listCheck = convertData(this.props.origins);
        } else if (this.props.atTribute_type === 5) {
            listCheck = convertData(this.props.sizes);
        } else if (this.props.atTribute_type === 6) {
            listCheck = convertData(this.props.weightTypes);
        }
        const checkSameCode = checkDuplicate();

        console.log('data kiem tra: ', listCheck)
        if (checkLenght === true && checkSameCode === true && (valueStatus === 1 || valueStatus === 2)) {
            this.setState({ checkValidateAddNewAttribute: true });
        } else {
            this.setState({ checkValidateAddNewAttribute: false });
        }
    }

    // Cập nhật thuộc tính
    onChangeAtribute = (e) => {
        const { atTribute_type } = this.props;
        if (e.target.value === 1 || atTribute_type === 1) {
            this.setState({ code: '' });
        }
        this.props.clickAttributeType(e.target.value);
        this.setState({ valueAtribute: e.target.value });
    };

    // Cập nhật trạng thái thuộc tính
    onChangeStatus = (e) => {
        this.setState({ valueStatus: e.target.value }, () => this.validateAdd());
    };

    // Cập nhật mã thuộc tính dạng text
    onChangeCodeAtribute = (event) => {
        this.setState({ code: event.target.value }, () => this.validateAdd());
    };

    // Cập nhật mã màu thuộc tính
    onChangeCodeColorAtribute = (color) => {
        this.setState({ code: color.toHexString() }, () => this.validateAdd());
    };

    // Cập nhật tên thuộc tính
    onChangeNameAtribute = (event) => {
        this.setState({ name: event.target.value }, () => this.validateAdd());
    };

    // Lưu thuộc tính mới
    saveAtribute = async () => {
        const { code, name, valueStatus } = this.state;
        await this.props.startLoading();
        const atribute = {
            code,
            name,
            status: valueStatus
        };

        this.setState({
            code: '',
            name: '',
            valueStatus: 1,
            openModalAddAtribute: false
        });
        // this.props.addNewColor(atribute, this.props.atTribute_type);
        await this.props.addNewAttribute(atribute);
        toast.success('Thêm mới thuộc tính thành công!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        });
        await this.props.stopLoading();
    };

    render() {
        return (
            <>
                <Button className="m-3" color="danger" variant="dashed"
                    onClick={() => {
                        this.setState({ openModalAddAtribute: true });
                        this.validateAdd();
                    }}>
                    <PlusOutlined /> Thêm mới
                </Button>
                <Modal
                    title="Thêm mới thuộc tính"
                    centered
                    open={this.state.openModalAddAtribute}
                    onCancel={() => this.setState({ openModalAddAtribute: false })}
                    footer={null}
                    width={{
                        xs: '90%',
                        sm: '80%',
                        md: '70%',
                        lg: '60%',
                        xl: '50%',
                        xxl: '40%',
                    }}
                >
                    <Row gutter={[16, 16]} >
                        <Col span={12} >
                            Mã thuộc tính:
                            <br />
                            {this.props.atTribute_type === 1 ? (
                                <ColorPicker
                                    className="w-full items-start justify-start"
                                    value={this.state.code}
                                    onChange={this.onChangeCodeColorAtribute}
                                    showText
                                />
                            ) : (
                                <Input
                                    placeholder="Nhập mã thuộc tính"
                                    value={this.state.code}
                                    onChange={this.onChangeCodeAtribute}
                                />
                            )}
                            <span className="text-red-600">{validateString(this.state.code) === true ? '' : '*Mã thuộc tính ' + validateString(this.state.code)}</span>
                        </Col>
                        <Col span={12} >
                            Tên thuộc tính:
                            <br />
                            <Input
                                placeholder="Nhập tên thuộc tính"
                                value={this.state.name}
                                onChange={this.onChangeNameAtribute}
                            />
                            <span className="text-red-600">{validateString(this.state.name) === true ? '' : '*Tên thuộc tính ' + validateString(this.state.name)}</span>
                        </Col>
                        <Col span={24} >
                            Trạng thái:
                            <br />
                            <Radio.Group
                                onChange={this.onChangeStatus}
                                value={this.state.valueStatus}
                                options={[
                                    {
                                        value: 1,
                                        label: (
                                            <Flex gap="small" justify="center" align="center" vertical>
                                                Hoạt động
                                            </Flex>
                                        ),
                                    },
                                    {
                                        value: 2,
                                        label: (
                                            <Flex gap="small" justify="center" align="center" vertical>
                                                Ngừng hoạt động
                                            </Flex>
                                        ),
                                    },
                                ]}
                            />
                            <br />
                            <span className="text-red-600">{ }</span>

                        </Col>
                        <Col span={24}>
                            <Button
                                color="danger"
                                variant="dashed"
                                onClick={this.saveAtribute}
                                block
                                disabled={!this.state.checkValidateAddNewAttribute}
                            >
                                Thêm mới
                            </Button>
                        </Col>
                    </Row>
                </Modal>
                <Row gutter={[16, 16]} align="middle" className="mb-9">
                    <Col span={24}>
                        Loại thuộc tính:
                        <br />
                        <Radio.Group
                            onChange={this.onChangeAtribute}
                            value={this.props.atTribute_type}
                            options={[
                                {
                                    value: 1,
                                    label: (
                                        <Flex gap="small" justify="center" align="center" vertical>
                                            Màu sắc
                                        </Flex>
                                    ),
                                },
                                {
                                    value: 2,
                                    label: (
                                        <Flex gap="small" justify="center" align="center" vertical>
                                            Danh mục sản phẩm
                                        </Flex>
                                    ),
                                },
                                {
                                    value: 3,
                                    label: (
                                        <Flex gap="small" justify="center" align="center" vertical>
                                            Nhà sản xuất
                                        </Flex>
                                    ),
                                },
                                {
                                    value: 4,
                                    label: (
                                        <Flex gap="small" justify="center" align="center" vertical>
                                            Quốc gia
                                        </Flex>
                                    ),
                                },
                                {
                                    value: 5,
                                    label: (
                                        <Flex gap="small" justify="center" align="center" vertical>
                                            Kích cỡ
                                        </Flex>
                                    ),
                                },
                                {
                                    value: 6,
                                    label: (
                                        <Flex gap="small" justify="center" align="center" vertical>
                                            Loại cân nặng
                                        </Flex>
                                    ),
                                },
                            ]}
                        />
                    </Col>
                </Row>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    //attribute
    colors: state.color.colors,
    categores: state.category.categores,
    manufacturers: state.manufacturer.Manufacturers,
    origins: state.origin.origins,
    sizes: state.size.sizes,
    weightTypes: state.weightType.weightTypes
});

const mapDispatchToProps = (dispatch) => ({
    startLoading: () => dispatch(START_LOADING()),
    stopLoading: () => dispatch(STOP_LOADING()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormAddAtribute);
