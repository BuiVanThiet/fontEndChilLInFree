import React from "react";
import BannerSlider from './BannerSlider';
import ListProduct from "./products/ListProduct";
import Contact from "./Contact";
import bannerSlide from '../../assets/imagePage/baner_slider.png';

class PageHome extends React.Component {
    render() {
        return (<>
            <title>ChillInfree - Trang chủ</title>
            <BannerSlider />
            <this.props.TitleCategory titleCustom={'Sản Phẩm Bán Chạy'} />
            <ListProduct />
            <this.props.TitleCategory titleCustom={'Sản Phẩm Mới'} />
            <ListProduct />
            <this.props.TitleCategory titleCustom={'Phụ Kiện'} />
            <ListProduct />
            <div
                className="mt-5 bvt-parallax-section bg-cover bg-no-repeat bg-center bg-fixed h-[340px] w-full relative flex items-center justify-center"
                style={{ backgroundImage: `url(${bannerSlide})` }}
            >
            </div>


            <this.props.TitleCategory titleCustom={'Liên Hệ'} />
            <Contact />
        </>)
    }
}

export default PageHome;
