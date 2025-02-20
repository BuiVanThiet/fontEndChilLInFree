import React from "react";
import { Button } from 'antd';
import ModalVoucher from "../vouchers/ModalVoucher";

class BillTotal extends React.Component {
    state = {
        activeButtonCash: 'cash',
        openModalVoucher: false
    }
    render() {
        return (
            <>
                <div className="flex-1">
                    <div className="mb-3">
                        <span className="text-xl font-semibold">Cộng giỏ hàng</span>
                        <hr />
                    </div>
                    <div className="mb-3">
                        <ModalVoucher />
                    </div>
                    <div className="mb-3">
                        <div className="flex justify-between items-center">
                            <span className="text-start">Tạm tính:</span>
                            <span className="text-end font-semibold">100.000.000 vnđ</span>
                        </div>
                        <hr />
                    </div>
                    <div className="mb-3">
                        <div className="flex justify-between items-center">
                            <span className="text-start">Phí vận chuyển:</span>
                            <span className="text-end font-semibold">100.000.000 vnđ</span>
                        </div>
                        <hr />
                    </div>
                    <div className="mb-3">
                        <div className="flex justify-between items-center">
                            <span className="text-start">Phí được giảm:</span>
                            <span className="text-end font-semibold">100.000.000 vnđ</span>
                        </div>
                        <hr />
                    </div>
                    <div className="mb-3">
                        <div className="flex justify-between items-center">
                            <span className="text-start">Tổng cộng:</span>
                            <span className="text-end font-semibold">100.000.000 vnđ</span>
                        </div>
                        <hr />
                    </div>
                    <div className="mb-3 flex gap-2" style={{ height: '50px' }}>
                        {/* Nút Thanh toán khi nhận hàng */}
                        <Button
                            className={`w-1/2 h-full ${this.state.activeButtonCash !== "cash" ? "bg-red-500" : "bg-transparent border-red-500 text-red-500"} text-center`}
                            block
                            type="dashed"

                            onClick={() => this.setState({ activeButtonCash: "cash" })}
                            style={{ whiteSpace: "normal" }}
                        >
                            Thanh toán khi nhận hàng
                        </Button>

                        {/* Nút Thanh toán ngân hàng */}
                        <Button
                            className={`w-1/2 h-full ${this.state.activeButtonCash !== "bank" ? "bg-red-500 " : "bg-transparent border-red-500 text-red-500"} text-center`}
                            block

                            type="dashed"
                            onClick={() => this.setState({ activeButtonCash: "bank" })}
                            style={{ whiteSpace: "normal" }}
                        >
                            Thanh toán ngân hàng
                        </Button>
                    </div>



                    <Button type="dashed" block className="mt-2" danger style={{ height: '50px' }}>
                        Tiến hành thanh toán
                    </Button>
                </div>
            </>
        );
    }
}

export default BillTotal;