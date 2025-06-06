import React from "react";
import { Col, Row, Card, Input } from 'antd';

class LoginForm extends React.Component {
    render() {
        return (<>
            <div className="flex justify-center items-center h-screen">
                <Card type="inner" className="w-[90%] justify-center items-center">
                    <span>
                        Đăng nhập
                    </span>
                    <div>
                        <Row>
                            <Col span={24}>
                                <Input placeholder="Basic usage" />
                            </Col>
                        </Row>
                    </div>
                </Card>
            </div>
        </>)
    }
}

export default LoginForm;