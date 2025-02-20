import React from "react";
import productImage from '../../../assets/imagePage/product1.png';  // Đảm bảo rằng đường dẫn này là đúng
import { Link } from 'react-router-dom';
import {
    formatNumberWithCommasText
} from '../../../store/action/ActionRenderData';
class Product extends React.Component {
    render() {
        console.log(this.props.priceMin)
        return (
            <>
                <div className="bvt-product-card h-[600px] flex flex-col items-center">
                    <div
                        className="h-[70%] w-full duration-500 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${productImage})` }}>
                        <div
                            className="w-full h-full hover:bg-gray-900 hover:bg-opacity-10 hover:transition-all hover:ease-in-out hover:duration-1000 relative group">

                            <div className="absolute w-full bottom-4 hidden justify-center group-hover:flex">
                                <button
                                    className="relative overflow-hidden text-black uppercase font-medium px-4 py-2 bg-white rounded-none group w-11/12 hidden group-hover:block group-hover:animate-fadeIn">
                                    <span className="relative z-10">
                                        <Link to={`/product/product_detail/${this.props.idProduct}`}>Sản phẩm</Link>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <Link to={`/product/product_detail/${this.props.idProduct}`}>
                            <div className="text-xl mb-3 hover:text-red-700">{this.props.nameProduct}</div>
                        </Link>
                        <div className="bvt-price justify-center">
                            {
                                this.props.priceMin === this.props.priceMax
                                    ? <span className="ml-2 text-red-500 ">{formatNumberWithCommasText(this.props.priceMin)} VNĐ</span>
                                    : <span className="ml-2 text-red-500">{formatNumberWithCommasText(this.props.priceMin)} VNĐ -> {formatNumberWithCommasText(this.props.priceMax)} VNĐ</span>
                            }
                            {/* 
                             <span className="text-lg text-red-500 ">10,000,000 VNĐ</span>
                            <span className="ml-2 line-through text-gray-600 ">100,000,000 VNĐ</span> */}
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default Product;
