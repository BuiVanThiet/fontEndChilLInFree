import React from "react";
import { Card, Space, Input, Button } from 'antd';

class Voucher extends React.Component {
    render() {
        return (
            <>

                <Card type="inner" className="mt-3">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        {/* Hình ảnh sản phẩm */}
                        <img
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            style={{ width: '90px' }}
                            alt="Sản phẩm"
                        />

                        {/* Thông tin sản phẩm */}
                        <div className="flex-1">
                            <h3 className="text-lg font-medium m-0">Tên sản phẩm</h3>
                            <p className="text-sm text-gray-500 m-0">Mô tả sản phẩm ngắn gọn</p>
                            <strong className="text-red-500">Giá: 1,000,000 VNĐ</strong>
                        </div>

                        {/* Nút hành động */}
                        <Button
                            type="dashed"

                        >
                            Thêm vào giỏ
                        </Button>
                    </div>
                </Card>



            </>
        );
    }
}

export default Voucher;