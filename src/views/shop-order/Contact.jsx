import React from "react";
import Video from '../../assets/videoBaner.mp4'; // Đảm bảo đường dẫn đúng

class Contact extends React.Component {
    render() {
        return (
            <>
                <div className="question-for-shop h-[500px] text-white flex pt-10 items-center flex-col relative">
                    <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover z-[-1]">
                        <source src={Video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    <div className="mb-5 text-sm text-center z-10 ">
                        Hãy liên hệ với chúng tôi bằng biểu mẫu ở bên dưới để nhận được tư vấn và giải đáp các thắc mắc ngay nhé!
                    </div>
                    <div className="mb-5 uppercase text-2xl text-center z-10 ">
                        Biểu mẫu đặt câu hỏi
                    </div>
                    <div className="w-full flex justify-center flex-col items-center z-10 ">
                        <div className="w-[50%] mb-4">
                            <label className="block text-sm font-medium">Họ và tên:</label>
                            <div className="mt-2">
                                <input type="text" className="text-black mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                                        invalid:border-pink-500 invalid:text-pink-600
                                        focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                                        " placeholder="Nhập tên của bạn" />
                            </div>
                        </div>

                        <div className="w-[50%] mb-4">
                            <label className="block text-sm font-medium">Địa chỉ email:</label>
                            <div className="mt-2">
                                <input type="email" className="text-black mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                                        invalid:border-pink-500 invalid:text-pink-600
                                        focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                                        " placeholder="Nhập email của bạn" />
                            </div>
                        </div>

                        <div className="w-[50%] mb-4">
                            <label className="block text-sm font-medium">Lời nhắn:</label>
                            <div className="mt-2">
                                <textarea className="text-black mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                                        invalid:border-pink-500 invalid:text-pink-600
                                        focus:invalid:border-pink-500 focus:invalid:ring-pink-500 resize-none
                                    " placeholder="Nhập lời nhắn của bạn" rows="3"></textarea>
                            </div>
                        </div>

                        <div className="w-[50%] mt-3 mb-3">
                            <button
                                className="relative overflow-hidden text-black uppercase font-medium px-4 py-2 bg-white group w-[150px] text-center items-center justify-center rounded-full group-hover:block group-hover:animate-fadeIn">
                                Gửi
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Contact;
