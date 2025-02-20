import React from "react";
import { Carousel } from 'antd';
import Banner1 from '../../assets/imagePage/banner1.png';
import Banner2 from '../../assets/imagePage/banner2.png';
import Banner3 from '../../assets/imagePage/banner3.png';
import Banner4 from '../../assets/imagePage/banner4.png';
import Banner5 from '../../assets/imagePage/banner5.png';
import Banner6 from '../../assets/imagePage/banner6.png';

class BannerSlider extends React.Component {
    render() {
        return (<>
            <div className="flex w-full z-[-1]">
                <div className="hidden md:flex w-1/2 m-4">
                    <div className="relative w-full h-full">
                        <img
                            src={Banner1}
                            alt="Banner 1"
                            className="w-full h-full object-cover shadow-lg" // Loại bỏ rounded-lg để ảnh có góc vuông
                        />
                        {/* Khung viền bóng mờ */}
                        <div className="absolute inset-0 border-[20px] border-white/60 shadow-xl"></div> {/* Loại bỏ rounded-lg */}
                    </div>
                </div>

                <div className="w-full md:w-1/2 md:m-4">
                    <Carousel autoplay className="w-full h-full bg-orange-300">
                        <div>
                            <img
                                src={Banner1}
                                alt="Banner 1"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <img
                                src={Banner2}
                                alt="Banner 2"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <img
                                src={Banner3}
                                alt="Banner 3"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <img
                                src={Banner4}
                                alt="Banner 4"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <img
                                src={Banner5}
                                alt="Banner 5"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <img
                                src={Banner6}
                                alt="Banner 6"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </Carousel>
                </div>
            </div>
        </>);
    }
}
export default BannerSlider;