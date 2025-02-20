import React from "react";
import { connect } from 'react-redux';
import { START_LOADING, STOP_LOADING } from '../../store/reducers/RootReducer';

class FooterShop extends React.Component {
    onClickPage = async () => {
        await this.props.startLoading();
        await this.props.stopLoading();
    }
    render() {
        return (
            <>
                <br />
                <div className="flex justify-center border-t-2 border-red-600">
                    <footer className=" grid grid-cols-1 p-2 lg:grid-cols-4 md:grid-cols-2 gap-8 lg:gap-4 h-[150px] w-[95%]">
                        <div className="text-black flex flex-col items-center md:items-start">
                            <div className="uppercase text-xl">
                                Về chúng tôi
                            </div>
                            <div className="text-sm flex flex-col ml-0">
                                <a href="" onClick={() => this.onClickPage()}>--Giới thiệu</a>
                                <a href="" onClick={() => this.onClickPage()}>--Điều khoản sử dụng</a>
                                <a href="" onClick={() => this.onClickPage()}>--Chính sách bảo mật</a>
                                <a href="" onClick={() => this.onClickPage()}>--Tin tức</a>
                                <a href="" onClick={() => this.onClickPage()}>--Liên hệ</a>
                            </div>
                        </div>

                        <div className="text-black flex flex-col items-center md:items-start">
                            <div className="uppercase text-xl">
                                Khách hàng
                            </div>
                            <div className="text-sm flex flex-col">
                                <a href="">--Hướng dẫn mua hàng</a>
                                <this.props.Link to="/return-exchange-product"><div onClick={() => this.onClickPage()}>--Chính sách đổi trả</div></this.props.Link>
                                <a href="" onClick={() => this.onClickPage()}>--Chính sách bảo hành</a>
                                <a href="" onClick={() => this.onClickPage()}>--Hướng dẫn chọn size</a>
                            </div>
                        </div>

                        <div className="text-black flex flex-col items-center md:items-start">
                            <div className="uppercase text-xl">
                                Trang mạng xã hội
                            </div>
                            <div className="text-sm flex flex-col">
                                <a href="https://www.facebook.com/chillnfreeshop?ref=embed_page" target="_blank" className="flex justify-start items-center gap-2">
                                    <i className="bi bi-facebook text-2xl"></i>
                                    facebook
                                </a>
                                <a href="https://www.tiktok.com/@chillnfree.clean_custom?lang=vi-VN" target="_blank" className="flex justify-start items-center gap-2">
                                    <i className="bi bi-tiktok text-2xl"></i>
                                    tiktok
                                </a>
                            </div>
                        </div>

                        <div className="text-black flex justify-center md:justify-start space-x-4 items-center md:items-start">
                            <div className="flex justify-center items-center">
                                <img
                                    src={this.props.IconBrid}
                                    alt="ChillnFree Logo"
                                    className="w-[100px] h-[100px] object-contain" // Điều chỉnh kích thước và kiểu hiển thị ảnh
                                />
                            </div>

                            <div className="basis-1/2 text-sm">
                                Đ/c: <br></br>Số 25 ngõ 38 Yên Lãng, phường Láng Hạ, quận Đống Đa, thành phố Hà Nội
                            </div>
                        </div>

                    </footer>
                </div>
            </>
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
    startLoading: () => dispatch(START_LOADING()),
    stopLoading: () => dispatch(STOP_LOADING()),
});

export default connect(null, mapDispatchToProps)(FooterShop);
