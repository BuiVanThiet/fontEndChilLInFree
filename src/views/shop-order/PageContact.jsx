import React from "react";

class PageContact extends React.Component {
    render() {
        return (
            <>
                <title>ChillInfree - Liên hệ</title>
                <this.props.TitlePage titleCustom={'Hệ thống cửa hàng'} />

                <div className="flex flex-col md:flex-row gap-4 items-center">
                    {/* Bên trái: Google Map */}
                    <div className="flex-1 relative pb-[56.25%] h-0 w-full md:w-[400px]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d276.12256007889084!2d105.81655057090468!3d21.013790855520373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab0000585a3b%3A0x97498f0da7a424e8!2sChillnfree%20Store!5e1!3m2!1svi!2sus!4v1737131235092!5m2!1svi!2sus"
                            className="absolute top-0 left-0 w-full h-full border-0"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Map"
                        ></iframe>
                    </div>

                    {/* Bên phải: Thông tin liên hệ */}
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-4">Thông tin liên hệ</h2>
                        <p className="text-lg">📍 Địa chỉ: Số 25 ngõ 38 Yên Lãng, phường Láng Hạ, quận Đống Đa, thành phố Hà Nội.</p>
                        <p className="text-lg">📞 Số điện thoại: 0326661994</p>
                        <p className="text-lg">📧 Email: chilinfree@qnt.chillnfree</p>
                    </div>
                </div>


            </>
        )
    }
}

export default PageContact;