import React from "react";
import { Col, Row, Card, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

class LoginForm extends React.Component {
    render() {
        return (<>
            <div className="flex justify-center items-center h-screen">
                <Card type="inner" className="w-[90%]">

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
                                <Input.Password placeholder="input password" />
                            
                            </Col>
                        </Row>
                    </div>
                </Card>
            </div>
        </>)
    }
}

export default LoginForm;