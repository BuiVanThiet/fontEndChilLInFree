import React from "react";
import { Button, Space, Input, Modal, Pagination } from 'antd';
import Voucher from "./Voucher";

class ModalVoucher extends React.Component {
    state = {
        openModalVoucher: false
    }
    onChangePage = (pageNumber) => {
        console.log('Page: ', pageNumber);
    };
    render() {
        return (
            <>
                <Space.Compact
                    style={{
                        width: '100%',
                    }}
                >
                    <Button type="dashed" onClick={() => this.setState({ openModalVoucher: true })}>
                        Mã giảm giá
                    </Button>
                    <Input disabled />
                </Space.Compact>
                <Modal
                    title="Mã giảm giá"
                    centered
                    open={this.state.openModalVoucher}
                    onCancel={() => this.setState({ openModalVoucher: false })}
                    width={'90%'}
                    footer={null}
                >
                    <p>
                        <Space.Compact
                            style={{
                                width: '100%',
                            }}
                        >
                            <Input placeholder="Tìm kiếm mã giảm giá" />
                            <Button type="dashed" danger>Tìm kiếm</Button>
                        </Space.Compact>
                    </p>
                    <p className="mt-3">
                        <Voucher />
                        <Voucher />
                        <Voucher />
                        <Voucher />
                        <Voucher />
                    </p>
                    <p className="mt-3">
                        <Pagination showQuickJumper defaultCurrent={2} total={500} align="center" onChange={(pageNumber) => this.onChangePage(pageNumber)} />
                    </p>

                </Modal>
            </>
        );
    }
}

export default ModalVoucher;