import React from "react";
import Banner1 from '../../../assets/imagePage/banner1.png';
import Banner2 from '../../../assets/imagePage/banner2.png';
import Banner3 from '../../../assets/imagePage/banner3.png';
import Banner4 from '../../../assets/imagePage/banner4.png';
import Banner5 from '../../../assets/imagePage/banner5.png';
import Banner6 from '../../../assets/imagePage/banner6.png';

class Album extends React.Component {
    render() {
        const idSlide = this.props.idSlide; // Nhận prop isOdd
        console.log(idSlide)
        const groupClass = idSlide % 2 === 0 ? 'group group-1' : 'group group-2'; // Kiểm tra idSlide và quyết định class

        return (
            <>
                <div className="carousel m-4">
                    <div className={groupClass}>
                        <div className="card bg-cover bg-center" style={{ backgroundImage: `url(${Banner1})` }}></div>
                        <div className="card bg-cover bg-center" style={{ backgroundImage: `url(${Banner2})` }}></div>
                        <div className="card bg-cover bg-center" style={{ backgroundImage: `url(${Banner3})` }}></div>
                        <div className="card bg-cover bg-center" style={{ backgroundImage: `url(${Banner4})` }}></div>
                        <div className="card bg-cover bg-center" style={{ backgroundImage: `url(${Banner5})` }}></div>
                        <div className="card bg-cover bg-center" style={{ backgroundImage: `url(${Banner6})` }}></div>
                    </div>
                    <div aria-hidden className={groupClass}>
                        <div className="card bg-cover bg-center" style={{ backgroundImage: `url(${Banner1})` }}></div>
                        <div className="card bg-cover bg-center" style={{ backgroundImage: `url(${Banner2})` }}></div>
                        <div className="card bg-cover bg-center" style={{ backgroundImage: `url(${Banner3})` }}></div>
                        <div className="card bg-cover bg-center" style={{ backgroundImage: `url(${Banner4})` }}></div>
                        <div className="card bg-cover bg-center" style={{ backgroundImage: `url(${Banner5})` }}></div>
                        <div className="card bg-cover bg-center" style={{ backgroundImage: `url(${Banner6})` }}></div>
                    </div>
                </div>

            </>
        )
    }
}

export default Album;