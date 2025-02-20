
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

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100 %;
    height: 100 %;
    background - color: rgba(255, 255, 255, 0.8); /* Màu nền có độ mờ */
    display: flex;
    justify - content: center;
    align - items: center;
    opacity: 0; /* Lúc ban đầu ẩn đi */
    transition: opacity 1s ease; /* Thêm hiệu ứng mờ dần */
    z - index: 1000;
}

.overlay.show {
    opacity: 1; /* Khi lớp phủ cần hiển thị */
}
