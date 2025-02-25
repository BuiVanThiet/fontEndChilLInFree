import React, { Component } from "react";
import {
    TruckOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    ScheduleOutlined,
    PlusOutlined
} from "@ant-design/icons";
import { Menu, Layout, Col, Row, Typography, Input, Image, Upload } from "antd";
import { Link, Route, Routes } from "react-router-dom";
import { connect } from 'react-redux';
import { START_LOADING, STOP_LOADING } from '../../../store/reducers/RootReducer';
const { Title } = Typography;

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

class PageAcount extends Component {
    state = {
        previewOpen: false,
        previewImage: '',
        fileList: []
    }

    handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({ previewImage: file.url || file.preview, previewOpen: true })

    };

    handleChange = ({ fileList: newFileList }) => this.setState({ fileList: newFileList });


    render() {

        const uploadButton = (
            <button
                style={{
                    border: 0,
                    background: 'none',
                }}
                type="button"
            >
                <PlusOutlined />
                <div
                    style={{
                        marginTop: 8,
                    }}
                >
                    Upload
                </div>
            </button>
        );

        return (
            <>
                <Title level={5} className="">--Thông tin tài khoản--</Title>
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        Họ và tên:
                        <Input placeholder="Basic usage" />
                    </Col>
                    <Col span={8}>
                        Ngày sinh:
                        <Input placeholder="Basic usage" />
                    </Col>
                    <Col span={8}>
                        <Upload
                            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                            listType="picture-circle"
                            fileList={this.state.fileList}
                            onPreview={() => this.handlePreview*()}
                            onChange={handleChange}
                        >
                            {fileList.length >= 8 ? null : uploadButton}
                        </Upload>
                        {this.state.previewImage && (
                            <Image
                                wrapperStyle={{
                                    display: 'none',
                                }}
                                preview={{
                                    visible: this.state.previewOpen,
                                    onVisibleChange: (visible) => this.setState({ previewOpen: visible }),
                                    afterOpenChange: (visible) => !visible && this.setState({ previewImage: '' }),
                                }}
                                src={this.state.previewImage}
                            />
                        )}
                    </Col>

                </Row>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startLoading: () => dispatch(START_LOADING()),
    stopLoading: () => dispatch(STOP_LOADING()),
});
export default connect(null, mapDispatchToProps)(PageAcount);
