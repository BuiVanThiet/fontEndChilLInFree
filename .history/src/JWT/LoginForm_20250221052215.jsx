import React from "react";
import { Card } from 'antd';

class LoginForm extends React.Component {
    render() {
        return (<>
            <div className="flex justify-center items-center h-screen">
                <Card type="inner" title="Inner Card title" className="w-[1000px]">
                    Inner Card content
                </Card>
            </div>
        </>)
    }
}

export default LoginForm;