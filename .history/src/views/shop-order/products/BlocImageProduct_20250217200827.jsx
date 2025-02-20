import React from "react";
import productImage from '../../../assets/imagePage/product1.png';  // Đảm bảo rằng đường dẫn này là đúng

class BlocImageProduct extends React.Component {
    componentDidMount() {
        const mainImage = document.getElementById("main-image");
        const images = document.querySelectorAll(".product__image");

        images.forEach((image) => {
            image.addEventListener("click", (event) => {
                mainImage.src = event.target.src;

                document
                    .querySelector(".product__image--active")
                    .classList.remove("product__image--active");

                event.target.classList.add("product__image--active");
            });
        });
    }
    state = {
        mainImage: productImage,  // Đặt ảnh mặc định ban đầu
    };
    handleImageClick = (src) => {
        // Cập nhật ảnh chính khi click vào ảnh trong slider
        this.setState({ mainImage: src });
    };

    render() {
        console.log('dât anh: ', this.props.listImage)
        return (
            <>
                <div className="flex flex-col items-center">
                    <div className="w-[400px] h-[300px] lg:w-[700px] lg:h-[600px]">
                        <this.props.Image
                            id="main-image"
                            width={'100%'}
                            height={'100%'}
                            src={this.state.mainImage}
                            style={{
                                objectFit: 'cover',  // Đảm bảo ảnh không bị méo khi zoom
                                objectPosition: 'center center'  // Căn giữa ảnh
                            }}
                        />
                    </div>
                    <div className="w-[400px] lg:w-[700px]">
                        <div className="product__slider-wrap">
                            <div className="product__slider ">
                                {
                                    
                                }
                                <img
                                    src={productImage}
                                    alt="google pixel 6"
                                    className="product__image product__image--active"
                                    onClick={() => this.handleImageClick(productImage)}
                                />
                                <img
                                    src="https://chillnfree.vn/storage/Product/product_url_673708b9a9c08.webp"
                                    alt="google pixel 6"
                                    className="product__image"
                                    onClick={() => this.handleImageClick("https://chillnfree.vn/storage/Product/product_url_673708b9a9c08.webp")}
                                />
                                <img
                                    src={productImage}
                                    alt="google pixel 6"
                                    className="product__image"
                                    onClick={() => this.handleImageClick(productImage)}
                                />
                                <img
                                    src="https://chillnfree.vn/storage/Product/product_url_673708b9a9c08.webp"
                                    alt="google pixel 6"
                                    className="product__image"
                                    onClick={() => this.handleImageClick("https://chillnfree.vn/storage/Product/product_url_673708b9a9c08.webp")}
                                />
                                <img
                                    src={productImage}
                                    alt="google pixel 6"
                                    className="product__image"
                                    onClick={() => this.handleImageClick(productImage)}
                                />
                                <img
                                    src="https://chillnfree.vn/storage/Product/product_url_673708b9a9c08.webp"
                                    alt="google pixel 6"
                                    className="product__image"
                                    onClick={() => this.handleImageClick("https://chillnfree.vn/storage/Product/product_url_673708b9a9c08.webp")}
                                />
                                <img
                                    src={productImage}
                                    alt="google pixel 6"
                                    className="product__image"
                                    onClick={() => this.handleImageClick(productImage)}
                                />
                                <img
                                    src="https://chillnfree.vn/storage/Product/product_url_673708b9a9c08.webp"
                                    alt="google pixel 6"
                                    className="product__image"
                                    onClick={() => this.handleImageClick("https://chillnfree.vn/storage/Product/product_url_673708b9a9c08.webp")}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default BlocImageProduct;
