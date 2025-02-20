import React from "react";

class PageExchangeReturnProduct extends React.Component {
    render() {
        return (<>
            <title>ChillInfree - Chính sách đổi trả sản phẩm</title>
            <this.props.TitlePage titleCustom={'Chính sách đổi trả sản phẩm'} />
            <div className="p-2">
                <p>*Quý khách vui lòng quay video lại quá trình bóc hàng để được hỗ trợ đổi trả, trường hợp không có video mọi quyết định thuộc về Chillnfree, thời hạn đổi trả tối đa 48h kể từ khi nhận hàng
                </p>
                <p>
                    *Hàng đổi trả còn nguyên tem mác, chưa có dấu hiệu qua sử dụng
                </p>
                <p>
                    *Chillnfree chỉ nhận đổi trả sang size khác, trường hợp hết size có thể đổi sang sản phẩm bằng hoặc cao hơn giá trị sản phẩm đổi , KHÔNG HOÀN TIỀN với trường hợp này
                </p>
                <p>
                    *Quý khách vui lòng thanh toán phí ship 2 chiều nếu muốn đổi size hoặc sang sản phẩm khác (trừ trường hợp lỗi từ phía Chillnfree)
                </p>
                <p>
                    *Vui lòng inbox và gửi ảnh/video trực tiếp vào Facebook hoặc Instagram của shop để được nhân viên hỗ trợ!
                </p>
            </div>
        </>)
    }
}

export default PageExchangeReturnProduct;