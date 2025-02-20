import React from "react";
import PageProduct from "./PageProduct";
import PageAddProduct from "./PageAddProduct";
import PageUpdateProduct from "./PageUpdateProduct";
import PageHomeProductDetail from "./PageHomeProductDetail";
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import BoxAddProductDetail from "./BoxAddProductDetail";
import { validateInteger, validateString, checkDuplicate } from '../../../store/action/ActionRenderData';
import {}
class PageProductRouter extends React.Component {
    validateProduct = (code, name, status, idCategory, idManufacturer, idOrigin, describe, listImage) => {
        let checkCodeProduct = validateString(code);
        if (checkCodeProduct === true) {
            return true;
        } else {
            return false;
        }
    }
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
                    element={<PageHomeProductDetail />}
                />
                <Route
                    path="/:id/home-product-detail/add-new-product-detail"
                    exact
                    element={<BoxAddProductDetail />}
                />
            </Routes>
        </>)
    }
}



export default PageProductRouter;