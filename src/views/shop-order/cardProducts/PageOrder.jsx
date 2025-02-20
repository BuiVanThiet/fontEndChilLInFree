import React from "react";
import ProductOrder from "./ProductOrder";
import BillTotal from "./BillTotal";
import { Pagination } from 'antd';

class PageOrder extends React.Component {
    onChangePage = (pageNumber) => {
        console.log('Page: ', pageNumber);
    };
    render() {
        return (
            <>
                <title>ChillInfree - Đặt hàng</title>
                <this.props.TitlePage titleCustom={"Đặt hàng"} />
                <div className="flex flex-col md:flex-row gap-6 p-4">
                    {/* Cột sản phẩm */}
                    <div className="flex-1">
                        <ProductOrder />
                        <ProductOrder />
                        <ProductOrder />
                        <ProductOrder />
                        <ProductOrder />
                        <Pagination className="mt-3" showQuickJumper defaultCurrent={2} total={500} align="center" onChange={(pageNumber) => this.onChangePage(pageNumber)} />

                    </div>

                    {/* Đường cắt ngang */}
                    <div className="border-l-2 border-red-600 mx-6 h-auto block md:hidden"></div>
                    <BillTotal />
                    {/* Cột thông tin hóa đơn */}

                </div>

                trang dat hang
            </>
        );
    }
}

export default PageOrder;
