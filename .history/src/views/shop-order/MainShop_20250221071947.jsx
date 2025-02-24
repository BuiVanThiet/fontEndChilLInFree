import React from "react";
import PageHome from "./PageHome";
import MenuShop from "./MenuShop";
import FooterShop from "./FooterShop";
import IconBrid from "../../assets/logo-bird.png";
import Logo from "../../assets/chillnfreelogo-1.png";
import gifImage from "../../assets/imagePage/bird-animation-mobile.gif";
import PageProduct from "./products/PageProduct";
import PageContact from "./PageContact";
import PageMagazine from "./PageMagazine";
import TitleCategory from "./TitleCategory";
import TitlePage from "./TitlePage";
import PageAlbum from "./albums/PageAlbum";
import PageIntroduce from "./PageIntroduce";
import PageExchangeReturnProduct from "./PageExchangeReturnProduct";
import PageProductDetail from "./products/PageProductDetail";
import ScrollToTop from "../../store/action/ScrollToTop";
import PageOrder from "./cardProducts/PageOrder";
import PageProfile from "./PageProfile";
import MainManage from "../manage-shop/MainManage";
import LoginForm from "../../JWT/LoginForm";
import Loading from '../Loading';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "../../utils/withRouter"; // Tạo helper này để hỗ trợ class component


class MainShop extends React.Component {
    render() {
        const { location } = this.props; // Lấy thông tin location từ props
        const isManagePage = location.pathname.startsWith("/manage"); // Kiểm tra nếu URL bắt đầu với "/manage"
        const isLogin = location.pathname.startsWith("/login"); // Kiểm tra nếu URL bắt đầu với "/manage"

        return (
            <>
                <Routes>
                    <Route
                        path="/login"
                        exact
                        element={<LoginForm />}
                    />
                </Routes>
                {/* Hiển thị GIF loading */}

                {
                    (!isManagePage && !isLogin) && (
                        <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
                            <img
                                src={gifImage}
                                alt="Loading..."
                                className="w-[50%] h-[50%] object-cover object-center"
                            />
                        </div>
                    )
                }

                {/* Wrapper chính */}
                {
                    
                }
            </>
        );
    }
}

// Helper để sử dụng withRouter
const mapStateToProps = (state) => {
    return {
        active_card_order: state.root.active_card_order,
    };
};

export default connect(mapStateToProps)(withRouter(MainShop));
