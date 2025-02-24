import React from "react";
import { Card } from 'antd';

class LoginForm extends React.Component {
    render() {
        return (<>
            <div className="m">
                <Card type="inner" title="Inner Card title" extra={<a href="#">More</a>}>
                    Inner Card content
                </Card>
            </div>
        </>)
    }
}

export default LoginForm;