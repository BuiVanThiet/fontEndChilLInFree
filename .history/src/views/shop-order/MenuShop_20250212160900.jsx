import React from "react";
import CardProduct from "./cardProducts/CardProduct";
import { connect } from 'react-redux';
class MenuShop extends React.Component {
    componentDidMount() {
        // Khi component được mount, thực hiện các thao tác với DOM
        const topMenu = document.getElementById('98-shop-top-menu');
        const selectTopMenu = document.getElementById('98-select-top-menu');

        if (!topMenu || !selectTopMenu) {
            console.error('Một trong các phần tử #98-shop-top-menu hoặc #98-select-top-menu không tồn tại!');
            return;
        }

        // Lắng nghe sự kiện click trên toàn bộ tài liệu
        document.addEventListener('click', this.handleDocumentClick);

        // Gọi hàm handleResize khi component được mount
        this.handleResize(topMenu);

        // Lắng nghe sự kiện thay đổi kích thước cửa sổ
        window.addEventListener('resize', this.handleResize.bind(this, topMenu));
    }

    componentWillUnmount() {
        // Xóa sự kiện khi component bị unmount
        document.removeEventListener('click', this.handleDocumentClick);
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize(topMenu) {
        if (window.innerWidth >= 1024) {
            // Nếu kích thước màn hình >= 1024px, ẩn menu và xóa class `bvt-shop-menu-expended`
            topMenu.classList.remove('bvt-shop-menu-expended');
            topMenu.classList.add('hidden');
        }
    }

    handleDocumentClick = (e) => {
        const topMenu = document.getElementById('98-shop-top-menu');
        const selectTopMenu = document.getElementById('98-select-top-menu');

        if (!topMenu || !selectTopMenu) {
            return;
        }

        this.handleResize(topMenu); // Gọi lại handleResize để đảm bảo trạng thái menu đúng với kích thước màn hình

        if (selectTopMenu.contains(e.target)) {
            // Click vào nút menu
            topMenu.classList.toggle('hidden');
            topMenu.classList.toggle('bvt-shop-menu-expended');
            console.log('Đã vào menu');
        } else {
            // Click bên ngoài menu
            if (topMenu.classList.contains('bvt-shop-menu-expended')) {
                topMenu.classList.remove('bvt-shop-menu-expended');
                topMenu.classList.add('hidden');
            }
            console.log('Đã thoát khỏi menu');
        }
    };

    render() {
        return (
            <>
                <header className="py-4 fixed top-0 w-[100%] max-w-screen-2xl z-50 bg-white border-b-2 border-red-600 mx-auto left-0 right-0">
                    <div className="flex border-b-2 border-red-600 text-black text-base mx-auto w-auto mb-1">
                        <span className="ml-auto mr-4">
                            Xin chào, <this.props.Link to="/profile/3">Bui Van Thiet</this.props.Link> | <a href="" className="">Đăng xuất</a>
                        </span>
                    </div>
                    <nav className="flex flex-row justify-between items-center relative">
                        <div className="logo basis-1/8 text-start text-xl font-semibold cursor-pointer ms-[60px]">
                            <this.props.Link to="/">
                                <img src={this.props.Logo} className="w-52" alt="React logo" />
                            </this.props.Link>
                        </div>

                        <ul id="98-shop-top-menu"
                            className="basis-5/8 hidden lg:flex lg:items-center lg:justify-start lg:gap-8 uppercase text-sm text-gray-500 font-medium">
                            <li className="top-menu-item-custom">
                                <this.props.Link to="/">Trang chủ</this.props.Link>
                                {/* <a href="" className="">Trang chủ</a> */}
                            </li>
                            <li className="top-menu-item-custom">
                                <this.props.Link to="/product">Sản phẩm</this.props.Link>
                                {/* <a href="" className="">Sản phẩm</a> */}
                            </li>
                            <li className="top-menu-item-custom">
                                <this.props.Link to="/album">Album</this.props.Link>
                                {/* <a href="" className="">Sản phẩm</a> */}
                            </li>
                            <li className="top-menu-item-custom-icon hidden lg:flex">
                                <this.props.Link to="/">
                                    <img src={this.props.IconBrid} className="w-20" alt="React logo" />
                                </this.props.Link>
                            </li>
                            <li className="top-menu-item-custom">
                                <this.props.Link to="/magazine">Tin tức - Sự kiện</this.props.Link>
                                {/* <a href="" className="">Tin tức - sự kiện</a> */}
                            </li>
                            <li className="top-menu-item-custom">
                                <this.props.Link to="/contact">Liên hệ</this.props.Link>
                                {/* <a href="" className="">Liên hệ</a> */}
                            </li>
                            <li className="top-menu-item-custom">
                                <this.props.Link to="/introduce">Giới thiệu</this.props.Link>
                                {/* <a href="" className="">Giới thiệu</a> */}
                            </li>
                        </ul>
                        <CardProduct Link={this.props.Link} />

                        <div className="lg:hidden basis-1/8 text-center cursor-pointer px-2 sm:px-4">
                            <svg id="98-select-top-menu" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                className="icon-card-custom">
                                <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </nav>
                </header >

            </>
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
    uploadImagePR: (list) => dispatch(uploadImagePR(list)),
    deleteImagePR: (list) => dispatch(deleteImagePR(list)),
    getProduct: (id) => dispatch(getProduct(id)),
    getListImage: (id) => dispatch(getImageProduct(id)),
    updateProduct: (data) => dispatch(updateProduct(data)),
    //attribute
    fetchColor: () => dispatch(fetchColor()),
    fetchCategory: () => dispatch(fetchCategory()),
    fetchManufacturer: () => dispatch(fetchManufacturer()),
    fetchOrigin: () => dispatch(fetchOrigin()),
    fetchSize: () => dispatch(fetchSize()),
    fetchWeightType: () => dispatch(fetchWeightType()),
    startLoading: () => dispatch(START_LOADING()),
    stopLoading: () => dispatch(STOP_LOADING()),
});

export default connect(MenuShop;