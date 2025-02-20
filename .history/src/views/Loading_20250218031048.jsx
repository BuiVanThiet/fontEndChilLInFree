
// import React from "react";
// import { connect } from "react-redux";
// import iconLoad from "../assets/logo-bird.png"; // Import ảnh đúng cách
// import { ACTION_LOAD_SPIN } from "../store/reducers/RootReducer";

// class App extends React.Component {
//     state = {
//         showOverlay: false, // Điều khiển hiển thị overlay
//     };

//     componentDidUpdate(prevProps) {
//         if (prevProps.spinning !== this.props.spinning) {
//             if (this.props.spinning) {
//                 // Nếu spinning = true, hiển thị overlay ngay lập tức
//                 this.setState({ showOverlay: true });
//             } else {
//                 // Nếu spinning = false, trì hoãn 3s trước khi ẩn overlay
//                 setTimeout(() => {
//                     this.setState({ showOverlay: false });
//                 }, 1000);
//             }
//         }
//     }

//     render() {
//         return (
//             <>
//                 {this.state.showOverlay && (
//                     <div className="overlay">
//                         <img
//                             src={iconLoad} // ✅ Đúng
//                             alt="Loading..."
//                             className="loading-image"
//                         />
//                         {/* <div className="progress">{this.props.percent}%</div> */}
//                     </div>
//                 )}
//             </>
//         );
//     }
// }

// const mapStateToProps = (state) => ({
//     spinning: state.root.spinningSpin,
//     percent: state.root.percentSpin,
// });

// const mapDispatchToProps = (dispatch) => ({
//     start: () => dispatch(ACTION_LOAD_SPIN()),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(App);
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import iconLoad from "../assets/logo-bird.png"; // Import ảnh

const App = () => {
    const spinning = useSelector((state) => state.root.spinningSpin);
    const percent = useSelector((state) => state.root.percentSpin);
    const [showOverlay, setShowOverlay] = useState(true); // Mặc định hiển thị khi reload

    useEffect(() => {
        // Khi reload, hiển thị overlay trong 1 giây
        const initTimer = setTimeout(() => {
            setShowOverlay(false);
        }, 1000);

        return () => clearTimeout(initTimer);
    }, []); // Chạy 1 lần duy nhất khi component mount

    useEffect(() => {
        if (spinning) {
            setShowOverlay(true);
        } else {
            const timer = setTimeout(() => {
                setShowOverlay(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [spinning]);

    return (
        <div className={`overlay ${showOverlay ? "show" : ""}`}>
            <img src={iconLoad} alt="Loading..." className="loading-image" />
            {percent > 0 && <div className="progress">{percent}%</div>}
        </div>
    );
};

export default App;
