import React from "react";
import { Card } from 'antd';

class LoginForm extends React.Component {
    render() {
        return (<>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Card type="inner" title="Inner Card title" extra={<a href="#">More</a>}>
                    Inner Card content
                </Card>
            </div>
        </>)
    }
}

export default LoginForm;