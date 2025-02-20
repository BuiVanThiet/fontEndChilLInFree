import React from "react";
import { withRouter } from "./withRouter";

class ScrollToTop extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            window.scrollTo(0, 0); // Cuộn lên đầu trang khi thay đổi đường dẫn
        }
    }

    render() {
        return null;
    }
}

export default withRouter(ScrollToTop);
