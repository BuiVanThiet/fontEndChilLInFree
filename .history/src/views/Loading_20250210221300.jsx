import React from "react";
import { Button } from "antd";
import iconLoad from "../assets/logo-bird.png"; // Import ảnh đúng cách
import { connect } from 'react-redux';
import { ACTION_LOAD_SPIN } from '../store/reducers/RootReducer';

// const App = () => {
//     const [spinning, setSpinning] = React.useState(false);
//     const [percent, setPercent] = React.useState(0);

//     const showLoader = () => {
//         setSpinning(true);
//         let ptg = -10;
//         const interval = setInterval(() => {
//             ptg += 5;
//             setPercent(ptg);
//             if (ptg > 100) {
//                 clearInterval(interval);
//                 setSpinning(false);
//                 setPercent(0);
//             }
//         }, 100);
//     };

//     return (
//         <>
//             <Button onClick={showLoader}>Show fullscreen</Button>

//             {spinning && (
//                 <div className="overlay">
//                     <img
//                         src={iconLoad} // ✅ Đúng
//                         alt="Loading..."
//                         className="loading-image"
//                     />
//                     <div className="progress">{percent}%</div>
//                 </div>
//             )}
//         </>
//     );
// };

class App extends React.Component {
    render() {
        return (<>

            {this.props.spinning && (
                <div className="overlay">
                    <img
                        src={iconLoad} // ✅ Đúng
                        alt="Loading..."
                        className="loading-image"
                    />
                    {/* <div className="progress">{this.props.percent}%</div> */}
                </div>
            )}
        </>)
    }
}

const mapStateToProps = (state) => {
    return {
        spinning: state.root.spinningSpin,
        percent: state.root.percentSpin
    }
}

const mapDispatchToProps = (dispatch) => ({
    start: () => dispatch(ACTION_LOAD_SPIN())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;
