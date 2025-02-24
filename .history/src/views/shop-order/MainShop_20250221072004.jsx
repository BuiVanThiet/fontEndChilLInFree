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
                    !isLogin ?
                        <div className="content-wrapper max-w-screen-2xl text-base mx-auto px-2 flex flex-col min-h-screen ">
                            <ScrollToTop />
                            {/* Ẩn MenuShop nếu là trang /manage */}
                            {(!isManagePage && !isLogin) && (
                                <MenuShop Logo={Logo} IconBrid={IconBrid} />
                            )}
                            <main className={!isManagePage && !isLogin ? 'flex-grow mt-[180px]' : 'flex-grow '}>
                                <Routes>
                                    <Route
                                        path="/"
                                        exact
                                        element={<PageHome TitleCategory={TitleCategory} />}
                                    />
                                    <Route
                                        path="/product/home"
                                        exact
                                        element={
                                            <PageProduct
                                                TitleCategory={TitleCategory}
                                                TitlePage={TitlePage}
                                            />
                                        }
                                    />
                                    <Route
                                        path="/product/product_detail/:id"
                                        exact
                                        element={
                                            <PageProductDetail
                                                TitlePage={TitlePage}
                                                TitleCategory={TitleCategory}
                                                Link={Link}
                                            />
                                        }
                                    />
                                    <Route
                                        path="/contact"
                                        exact
                                        element={
                                            <PageContact
                                                TitleCategory={TitleCategory}
                                                TitlePage={TitlePage}
                                            />
                                        }
                                    />
                                    <Route
                                        path="/magazine"
                                        exact
                                        element={
                                            <PageMagazine
                                                TitleCategory={TitleCategory}
                                                TitlePage={TitlePage}
                                            />
                                        }
                                    />
                                    <Route
                                        path="/album"
                                        exact
                                        element={
                                            <PageAlbum
                                                TitleCategory={TitleCategory}
                                                TitlePage={TitlePage}
                                            />
                                        }
                                    />
                                    <Route
                                        path="/introduce"
                                        exact
                                        element={
                                            <PageIntroduce
                                                TitleCategory={TitleCategory}
                                                TitlePage={TitlePage}
                                            />
                                        }
                                    />
                                    <Route
                                        path="/return-exchange-product"
                                        exact
                                        element={
                                            <PageExchangeReturnProduct
                                                TitleCategory={TitleCategory}
                                                TitlePage={TitlePage}
                                            />
                                        }
                                    />

                                    <Route
                                        path="/order"
                                        exact
                                        element={
                                            <PageOrder
                                                TitlePage={TitlePage}
                                                TitleCategory={TitleCategory}
                                            />
                                        }
                                    />

                                    <Route path="/profile/*" element={<PageProfile />} />
                                    <Route
                                        path="/manage/*"
                                        exact
                                        element={<MainManage />}
                                    />
                                </Routes>
                                <Loading />
                            </main>
                            {/* Ẩn FooterShop nếu là trang /manage */}
                            {(!isManagePage && !isLogin) && (
                                <FooterShop IconBrid={IconBrid} Link={Link} />
                            )}
                        </div > : ''
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
