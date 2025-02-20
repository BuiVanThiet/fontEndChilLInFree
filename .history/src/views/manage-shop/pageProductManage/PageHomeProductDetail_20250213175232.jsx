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
                    path="/add-product-new"
                    exact
                    element={<PageAddProduct />}
                />
                <Route
                    path="/:id"
                    exact
                    element={<PageUpdateProduct />}
                />
                <Route
                    path="/:id/home-product-detail"
                    exact
                    element={<PageUpdateProduct />}
                />
                <Route
                    path="/:id/home-product-detail/add-new-product-detail"
                    exact
                    element={<PageUpdateProduct />}
                />
            </Routes>
        </>)
    }
}

export default PageHomeProductDetail;