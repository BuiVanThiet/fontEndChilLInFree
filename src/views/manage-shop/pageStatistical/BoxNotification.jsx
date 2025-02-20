import React from "react";
import { Card, Timeline } from 'antd';

class BoxNotification extends React.Component {
    render() {
        return (
            <Card
                title="Thông báo"
                className="w-full"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%', // Đảm bảo khối có chiều cao tối đa
                }}
                bodyStyle={{
                    flex: 1,  // Phần nội dung có thể mở rộng
                    overflowY: 'auto', // Cuộn chỉ phần nội dung
                    maxHeight: '100%' // Giới hạn chiều cao cuộn
                }}
            >
                {/* Nội dung thông báo dài */}
                <div>

                    <Timeline
                        items={[
                            {
                                children: 'Create a services site 2015-09-01',
                            },
                            {
                                children: 'Solve initial network problems 2015-09-01',
                            },
                            {
                                children: 'Technical testing 2015-09-01',
                            },
                            {
                                children: 'Network problems being solved 2015-09-01',
                            },
                            {
                                children: 'Create a services site 2015-09-01',
                            },
                            {
                                children: 'Solve initial network problems 2015-09-01',
                            },
                            {
                                children: 'Technical testing 2015-09-01',
                            },
                            {
                                children: 'Network problems being solved 2015-09-01',
                            },
                            {
                                children: 'Create a services site 2015-09-01',
                            },
                            {
                                children: 'Solve initial network problems 2015-09-01',
                            },
                            {
                                children: 'Technical testing 2015-09-01',
                            },
                            {
                                children: 'Network problems being solved 2015-09-01',
                            },
                        ]}
                    />
                </div>
            </Card>
        );
    }
}

export default BoxNotification;
