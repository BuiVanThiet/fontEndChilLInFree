import React from "react";
import { PayCircleOutlined, UndoOutlined, FallOutlined, RiseOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';

class BoxStatisticalToDay extends React.Component {
    render() {

        return (<>
            <Card title="Kết quả bán hàng hôm nay" bordered={false}>
                <Row gutter={16} style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <Col span={6} style={{ display: 'flex' }}>
                        <Card bordered={false} style={{ flex: 1 }}>
                            <div className="flex items-center">
                                <div className="mr-4 text-blue-600 text-2xl">
                                    <PayCircleOutlined />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">1 hóa đơn</div>
                                    <div className="mt-1 mb-1 text-lg text-blue-600">
                                        1,000,000 VNĐ
                                    </div>
                                    <div className="text-sm text-gray-500">Doanh thu</div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col span={6} style={{ display: 'flex' }}>
                        <Card bordered={false} style={{ flex: 1 }}>
                            <div className="flex items-center">
                                <div className="mr-4 text-orange-500 text-2xl">
                                    <UndoOutlined />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">2 phiếu</div>
                                    <div className="mt-1 mb-1 text-lg text-orange-500">
                                        1,000,000 VNĐ
                                    </div>
                                    <div className="text-sm text-gray-500">Trả hàng</div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col span={6} style={{ display: 'flex' }}>
                        <Card bordered={false} style={{ flex: 1 }}>
                            <div className="flex items-center">
                                <div className="mr-4 text-green-600 text-2xl">
                                    <RiseOutlined />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">2 phiếu</div>
                                    <div className="mt-1 mb-1 text-lg text-green-600">
                                        55.7 %
                                    </div>
                                    <div className="text-sm text-gray-500">So với cùng kỳ tháng trước</div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col span={6} style={{ display: 'flex' }}>
                        <Card bordered={false} style={{ flex: 1 }}>
                            <div className="flex items-center">
                                <div className="mr-4 text-orange-500 text-2xl">
                                    <FallOutlined />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">2 phiếu</div>
                                    <div className="mt-1 mb-1 text-lg text-red-600">
                                        -90.9 %
                                    </div>
                                    <div className="text-sm text-gray-500">So với hôm qua</div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Card>
        </>)
    }
}

export default BoxStatisticalToDay;