import React from "react";
import PageProduct from "./PageProduct";
import PageAddProduct from "./PageAddProduct";
import PageUpdateProduct from "./PageUpdateProduct";
import { Link, Route, Routes, useLocation } from 'react-router-dom';

class PageProductRouter extends React.Component {
    render() {
        return (<>
            <Routes>
                <Route
                    path="/home"
                    exact
                    element={<PageProduct />}
                />
                <Route
                    path="/add"
                    exact
                    element={<PageProduct />}
                />
            </Routes>
        </>)
    }
}

export default PageProductRouter;