import React from "react";
import Product from "./Product";
import { Pagination } from "antd";



const onChangePage = (pageNumber) => {
    console.log('Page: ', pageNumber);
};
class ListProduct extends React.Component {
    render() {
        return (
            <>
                <div className="product-store w-[90%] mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                    </div>
                    <Pagination showQuickJumper defaultCurrent={2} total={500} align="center" onChange={onChangePage} />

                </div>
            </>
        )
    }
}



export default ListProduct;
