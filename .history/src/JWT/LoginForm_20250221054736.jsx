import React from "react";
import { Col, Row, Card, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import iconBird from '../assets/logo-bird.png'
import chillnfreelogo from '../assets/chillnfreelogo-1.png'


class LoginForm extends React.Component {
    render() {
        return (<>
            <div className="flex justify-center items-center h-screen">
                <Card type="inner" className="w-[90%] h-max">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Cột 1 */}
                        <div>
                            <Row>
                                <Col span={24} className="flex items-center justify-center">
                                    Đăng nhập
                                </Col>
                                <Col span={24} className="mt-3">
                                    Tên đăng nhập:
                                    <Input className="mt-1" placeholder="Tên đăng nhập, SĐT, Email..." />
                                </Col>
                                <Col span={24} className="mt-3">
                                    Mật khẩu:
                                    <Input.Password className="mt-1" placeholder="Mật khẩu..." />
                                </Col>
                            </Row>
                        </div>

                        {/* Cột 2 */}
                        <div className="flex items-center justify-center grid">
                            <img src={iconBird} className="w-52" alt="React logo" />
                            <img src={chillnfreelogo} className="w-52" alt="React logo" />
                        </div>
                    </div>
                </Card>
            </div>

        </>)
    }
}

export default LoginForm;