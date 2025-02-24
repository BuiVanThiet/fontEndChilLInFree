import React from "react";
import { Col, Row, Card, Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import iconBird from '../assets/logo-bird.png'
import chillnfreelogo from '../assets/chillnfreelogo-1.png'


class LoginForm extends React.Component {
    render() {
        return (<>
            <div className="flex justify-center items-center h-screen ">
                <Card type="inner" className="w-[50%]">
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
                                <Col span={24} className="mt-3">
                                    Tên đăng nhập:
                                    <Input size="large" className="mt-1" placeholder="Tên đăng nhập, SĐT, Email..." />
                                </Col>
                                <Col span={24} className="mt-3">
                                    Mật khẩu:
                                    <Input.Password size="large" className="mt-1" placeholder="Mật khẩu..." />
                                </Col>
                                <Col span={24} className="mt-3 flex flex-col xl:flex-row justify-between items-center gap-3">
                                    <Button color="danger" variant="dashed" className="w-full xl:w-auto block xl:inline-block">
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

        </>)
    }
}

export default LoginForm;