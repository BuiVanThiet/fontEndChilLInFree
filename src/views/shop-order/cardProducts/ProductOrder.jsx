import React from "react";
import { Card, Image } from "antd";
import { CloseOutlined } from "@ant-design/icons";

class ProductOrder extends React.Component {
    render() {
        return (
            <>
                <Card className="relative">
                    {/* Nút "X" ở góc trên cùng bên phải */}
                    <CloseOutlined
                        className="absolute top-2 right-2 text-lg text-red-500 cursor-pointer hover:text-red-700"
                        onClick={() => {
                            // Hành động khi nhấn nút X (ví dụ: xóa sản phẩm)
                            alert("Sản phẩm đã được xóa!");
                        }}
                    />

                    <div className="flex items-center gap-4">
                        {/* Hình ảnh sản phẩm */}
                        <Image
                            width={100}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />

                        {/* Thông tin sản phẩm */}
                        <div>
                            <h3 className="text-lg font-medium m-0">Tên sản phẩm</h3>
                            <p className="text-sm text-gray-500 m-0">Mô tả sản phẩm ngắn gọn</p>
                            <strong className="text-red-500">Giá: 1,000,000 VNĐ</strong>
                        </div>
                    </div>
                </Card>
            </>
        );
    }
}

export default ProductOrder;
