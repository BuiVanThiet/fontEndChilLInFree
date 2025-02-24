import React from "react";
import { Col, Row, Card, Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import iconBird from '../assets/logo-bird.png'
import chillnfreelogo from '../assets/chillnfreelogo-1.png'


class LoginForm extends React.Component {
    render() {
        return (<>
            <div
                className="flex justify-center items-center h-screen bg-cover bg-center relative"
                style={{ backgroundImage: `url(${chillnfreelogo})` }}
            >
                {/* Lớp overlay mờ */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Nội dung chính */}
                <div className="relative z-10 max-w-[1200px] w-full text-center text-white p-6">
                    <h1 className="text-3xl font-bold">Chào mừng bạn!</h1>
                    <p className="mt-2">Vui lòng đăng nhập để tiếp tục</p>
                </div>
            </div>

        </>)
    }
}

export default LoginForm;