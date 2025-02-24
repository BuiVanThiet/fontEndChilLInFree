import React from "react";
import { Card } from 'antd';

class LoginForm extends React.Component {
    render() {
        return (<>
            <div className="flex justify-center items-center h-screen">
                <Card type="inner" className="w-[90%]">
                    Đăng nhập
                </Card>
            </div>
        </>)
    }
}

export default LoginForm;