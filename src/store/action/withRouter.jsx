import React from "react";
import { useLocation } from "react-router-dom";

// HOC để chuyển `location` vào như prop
export const withRouter = (Component) => {
    return (props) => {
        const location = useLocation();
        return <Component {...props} location={location} />;
    };
};
