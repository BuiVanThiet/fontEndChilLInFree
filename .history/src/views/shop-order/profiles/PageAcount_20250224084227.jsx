import React, { Component } from "react";
import {
    TruckOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    ScheduleOutlined,
} from "@ant-design/icons";
import { Menu, Layout, Col, Row } from "antd";
import { Link, Route, Routes } from "react-router-dom";
import { connect } from 'react-redux';
import { START_LOADING, STOP_LOADING } from '../../../store/reducers/RootReducer';

class PageAcount extends Component {

    render() {
        return (
            <>
            @
                <Row>
                    <Col span={24}></Col>
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
