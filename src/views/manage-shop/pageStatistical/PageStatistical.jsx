import React from "react";
import BoxStatisticalToDay from "./boxStatisticalToDay";
import BoxTableStatistical from "./BoxTableStatistical";
import BoxTopProductSellWell from "./BoxTopProductSellWell";
import BoxNotification from './BoxNotification';
import { Col, Row } from 'antd';

class PageStatistical extends React.Component {
    render() {

        return (<>
            <BoxStatisticalToDay />
            <div className="mt-3 h-[600px]">
                <Row gutter={16} style={{ display: 'flex', flexWrap: 'nowrap', width: '100%', alignItems: 'stretch', height: '100%' }}>
                    <Col span={18} style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="mt-3">
                            <BoxTableStatistical />
                        </div>
                        <div className="mt-3">
                            <BoxTopProductSellWell />
                        </div>
                    </Col>

                    <Col span={6} style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
                        <BoxNotification />
                    </Col>
                </Row>

            </div>
        </>)
    }
}

export default PageStatistical;