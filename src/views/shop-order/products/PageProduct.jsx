import React from "react";
import Product from "./Product";
import { Button, Drawer, Input, Select, Space, Slider, Switch } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ListProduct from "./ListProduct";

const options = [
    {
        label: (
            <Space>
                Áo
            </Space>
        ),
        value: "1",
    },
    {
        label: (
            <Space>
                Quần
            </Space>
        ),
        value: "2",
    },
    {
        label: (
            <Space>
                Phụ kiện
            </Space>
        ),
        value: "3",
    },

];


class PageProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            disabled: false,
            priceRange: [0, 5000000], // Giá trị khoảng giá mặc định
        };
    }

    showDrawer = () => {
        this.setState({ open: true });
    };

    onClose = () => {
        this.setState({ open: false });
    };

    handleSwitchChange = (checked) => {
        this.setState({ disabled: checked });
    };

    handleSliderChange = (value) => {
        this.setState({ priceRange: value });
    };

    render() {
        const { open, disabled, priceRange } = this.state;

        return (
            <>
                <title>ChillInfree - Sản phẩm</title>
                <this.props.TitlePage titleCustom={'Tất cả sản phẩm'} />
                <Button
                    type="dashed"
                    danger
                    icon={<SearchOutlined />}
                    onClick={this.showDrawer}
                >
                    Bộ lọc sản phẩm
                </Button>
                <Drawer
                    onClose={this.onClose}
                    title={
                        <div className="flex justify-between items-center w-full">
                            <span>Bộ lọc</span>
                            <Button onClick={this.onClose} danger>
                                X
                            </Button>
                        </div>
                    }
                    open={open}
                    placement="left"
                    closable={false}
                >
                    <div className="mb-2">
                        Tên sản phẩm:
                        <Input placeholder="Tên sản phẩm" />
                    </div>
                    <div className="mb-2">
                        Chọn danh mục:
                        <Select
                            mode="multiple"
                            style={{
                                width: "100%",
                            }}
                            placeholder="Chọn loại sản phẩm"
                            options={options}
                        />
                    </div>
                    <div className="mb-2">
                        Điều chỉnh giá:
                        <Slider
                            range
                            min={0} // Giá trị tối thiểu
                            max={5000000} // Giá trị tối đa (5 triệu)
                            defaultValue={[0, 5000000]} // Giá trị mặc định từ 0 đến 5 triệu
                            disabled={disabled} // Trạng thái kích hoạt
                            tooltip={{
                                formatter: (value) =>
                                    `${value.toLocaleString("vi-VN")} VNĐ`, // Định dạng VNĐ
                            }}
                            onChange={this.handleSliderChange} // Cập nhật giá trị khoảng giá
                        />
                        <div className="text-center mt-2">
                            <strong>
                                Từ: {priceRange[0].toLocaleString("vi-VN")} VNĐ -{" "}Đến:{" "}
                                {priceRange[1].toLocaleString("vi-VN")} VNĐ
                            </strong>
                        </div>
                    </div>
                    <div className="mb-2">
                        Sắp xếp:
                        <Select
                            className="mb-2"
                            style={{
                                width: "100%",
                            }}
                            allowClear
                            placeholder="Sắp xếp sản phẩm"
                            options={[
                                {
                                    label: "Theo chữ cái",
                                    value: "1",
                                },
                                {
                                    label: "Giá tăng dần",
                                    value: "2",
                                },
                                {
                                    label: "Giá giảm dần",
                                    value: "3",
                                },

                            ]}
                        />
                    </div>
                    <Button type="dashed" block danger>
                        Tìm kiếm
                    </Button>
                </Drawer>

                <ListProduct />
            </>
        );
    }
}

export default PageProduct;
