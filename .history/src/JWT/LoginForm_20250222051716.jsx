import React from "react";
import { Col, Row, Card, Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, ArrowLeftOutlined } from '@ant-design/icons';
import iconBird from '../assets/logo-bird.png'
import chillnfreelogo from '../assets/chillnfreelogo-1.png'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { START_LOADING, STOP_LOADING } from '../store/reducers/RootReducer';
import { getLogin } from '../API/LoginAPI';

class LoginForm extends React.Component {

    state = {
        username: '',
        password: ''
    }

    onClickPage = async () => {
        await this.props.startLoading();
        await this.props.stopLoading();
    }

    onchangeAcount = (object, value) {
        this.setState({ [object]: value });
    }
    getLoginForm = () {
        console.log('data login: ', this.state)
    }

    render() {
        return (<>
            <div
                className="flex justify-center items-center h-screen bg-cover bg-center relative"
                style={{ backgroundImage: `url(${chillnfreelogo})` }}
            >

                {/* Lớp overlay mờ */}
                <div className="absolute inset-0 bg-black/70"></div>
                <Link to="/">
                    <div className="absolute z-11 top-4 left-4 text-red-600" onClick={() => this.onClickPage()}>
                        <ArrowLeftOutlined /> Về trang chủ
                    </div>
                    {/* <Button variant="text" className="absolute z-11 top-4 left-4 text-red-600 px-4 py-2 rounded-lg shadow-md font-semibold" onClick={() => this.onClickPage()}>
                        <ArrowLeftOutlined /> Về trang chủ
                    </Button> */}
                </Link>
                {/* Nội dung chính */}
                <div className="relative z-10  w-full text-white p-6">
                    <div className="flex justify-center items-center ">
                        <Card type="inner" className="w-[50%] inset-0 bg-white/80">
                            <div className="flex flex-col xl:flex-row gap-4">
                                {/* Cột 2 - Ảnh (Trên đầu khi màn hình nhỏ, bên phải khi màn hình lớn) */}
                                <div className="flex flex-col items-center justify-center xl:border-l-4 xl:border-red-600 order-first xl:order-last w-full xl:w-1/2">
                                    <img src={iconBird} className="w-max h-32 xl:h-48 object-contain max-h-[90px]" alt="React logo" />
                                    <img src={chillnfreelogo} className="w-max h-32 xl:h-48 object-contain max-h-[90px]" alt="React logo" />
                                </div>

                                {/* Cột 1 - Đăng nhập */}
                                <div className="w-full xl:w-1/2">
                                    <Row>
                                        <Col span={24} className="flex font-bold text-[30px] items-center justify-center text-red-600">
                                            Đăng nhập
                                        </Col>
                                        <Col span={24} className="mt-3 text-lg">
                                            Tên đăng nhập:
                                            <Input size="large" className="mt-1" placeholder="Tên đăng nhập, SĐT, Email..." value={this.state.username} onChange={(e) => this.onchangeAcount('username', e.target.value)} />
                                        </Col>
                                        <Col span={24} className="mt-3 text-lg">
                                            Mật khẩu:
                                            <Input.Password size="large" className="mt-1" placeholder="Mật khẩu..." value={this.state.password} onChange={(e) => this.onchangeAcount('password', e.target.value)} />
                                        </Col>
                                        <Col span={24} className="mt-3 flex flex-col xl:flex-row justify-between items-center gap-3">
                                            <Button color="danger" variant="dashed" className="w-full xl:w-auto block xl:inline-block " onClick={() => this.getLoginForm()}>
                                                Đăng nhập
                                            </Button>
                                            <div className="text-center xl:text-left xl:order-first">
                                                Đăng ký tài khoản | Quên mật khẩu?
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

        </>)
    }
}

const mapDispatchToProps = (dispatch) => ({
    startLoading: () => dispatch(START_LOADING()),
    stopLoading: () => dispatch(STOP_LOADING()),
});

export default connect(null, mapDispatchToProps)(LoginForm);
