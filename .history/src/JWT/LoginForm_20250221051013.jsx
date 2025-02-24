import React from "react";
import { Card } from 'antd';

class LoginForm extends React.Component {
    render() {
        return (<>
            <div className="items-center ">
                <Card title="Card title">
                    <Card type="inner" title="Inner Card title" extra={<a href="#">More</a>}>
                        Inner Card content
                    </Card>
                    <Card
                        style={{ marginTop: 16 }}
                        type="inner"
                        title="Inner Card title"
                        extra={<a href="#">More</a>}
                    >
                        Inner Card content
                    </Card>
                </Card>
            </div>
        </>)
    }
}

export default LoginForm;