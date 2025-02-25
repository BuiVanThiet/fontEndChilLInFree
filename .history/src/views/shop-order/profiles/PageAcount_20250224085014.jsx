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
    previewImage: ''
}


    render() {
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
                        Ngày sinh:
                        <Input placeholder="Basic usage" />
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
