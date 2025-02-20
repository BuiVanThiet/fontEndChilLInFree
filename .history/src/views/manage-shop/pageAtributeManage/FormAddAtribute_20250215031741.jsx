import React from "react";
import { Card, ColorPicker, Col, Row, Input, Flex, Radio, Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

class FormAddAtribute extends React.Component {
    state = {
        valueAtribute: 1,
        valueStatus: 1,
        code: '',
        name: '',
        openModalAddAtribute: false,
        checkValidateAddNewAttribute: false,
    };

    // Hàm validate các điều kiện thêm mới thuộc tính
    validateAddNew = () => {
        const { code, name, valueStatus } = this.state;
        const checkCode = this.props.checkCodeAttribute(code);
        const checkName = this.props.checkNameAttribute(name);
        const checkStatus = this.props.checkStatusAttribute(valueStatus);
        if (checkCode.trim() === '' && checkName.trim() === '' && checkStatus.trim() === '') {
            this.setState({ checkValidateAddNewAttribute: true });
        } else {
            console.log('sai')
            this.setState({ checkValidateAddNewAttribute: false });
        }
        console.log(this.state.checkValidateAddNewAttribute)
    };

    // Cập nhật thuộc tính
    onChangeAtribute = (e) => {
        const { atTribute_type } = this.props;
        if (e.target.value === 1 || atTribute_type === 1) {
            this.setState({ code: '' });
        }
        this.props.clickAttributeType(e.target.value);
        this.setState({ valueAtribute: e.target.value }, this.validateAddNew);
    };

    // Cập nhật trạng thái thuộc tính
    onChangeStatus = (e) => {
        this.setState({ valueStatus: e.target.value }, this.validateAddNew);
    };

    // Cập nhật mã thuộc tính dạng text
    onChangeCodeAtribute = (event) => {
        this.setState({ code: event.target.value }, this.validateAddNew);
    };

    // Cập nhật mã màu thuộc tính
    onChangeCodeColorAtribute = (color) => {
        this.setState({ code: color.toHexString() }, this.validateAddNew);
    };

    // Cập nhật tên thuộc tính
    onChangeNameAtribute = (event) => {
        this.setState({ name: event.target.value }, this.validateAddNew);
    };

    // Lưu thuộc tính mới
    saveAtribute = () => {
        const { code, name, valueStatus } = this.state;
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
        this.props.addNewAttribute(atribute);
        this.validateAddNew();
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
    };

    render() {
        return (
            <>
                <Button className="m-3" color="danger" variant="dashed"
                    onClick={() => {
                        this.setState({ openModalAddAtribute: true });
                        this.validateAddNew();
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
                            <span className="text-red-600">{this.props.checkCodeAttribute(this.state.code)}</span>
                        </Col>
                        <Col span={12} >
                            Tên thuộc tính:
                            <br />
                            <Input
                                placeholder="Nhập tên thuộc tính"
                                value={this.state.name}
                                onChange={this.onChangeNameAtribute}
                            />
                            <span className="text-red-600">{this.props.checkNameAttribute(this.state.name)}</span>
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
                            <span className="text-red-600">{this.props.checkStatusAttribute(this.state.valueStatus)}</span>

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
    dataReduxs: state.users,
});

const mapDispatchToProps = (dispatch) => ({
    deleteRedux: (userDelete) => dispatch({ type: 'DELETE_USER', payload: userDelete }),
    createRedux: () => dispatch({ type: 'CREATE_USER' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormAddAtribute);
