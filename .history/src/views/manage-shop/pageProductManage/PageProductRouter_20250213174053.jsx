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
                                path="/"
                                exact
                                element={<PageHome TitleCategory={TitleCategory} />}
                            />
                            <Route
                                path="/product"
                                exact
                                element={
                                    <PageProduct
                                        TitleCategory={TitleCategory}
                                        TitlePage={TitlePage}
                                    />
                                }
                            />
                            <Route
                                path="/contact"
                                exact
                                element={
                                    <PageContact
                                        TitleCategory={TitleCategory}
                                        TitlePage={TitlePage}
                                    />
                                }
                            />
                            <Route
                                path="/magazine"
                                exact
                                element={
                                    <PageMagazine
                                        TitleCategory={TitleCategory}
                                        TitlePage={TitlePage}
                                    />
                                }
                            />
                            <Route
                                path="/album"
                                exact
                                element={
                                    <PageAlbum
                                        TitleCategory={TitleCategory}
                                        TitlePage={TitlePage}
                                    />
                                }
                            />
                            <Route
                                path="/introduce"
                                exact
                                element={
                                    <PageIntroduce
                                        TitleCategory={TitleCategory}
                                        TitlePage={TitlePage}
                                    />
                                }
                            />
                            <Route
                                path="/return-exchange-product"
                                exact
                                element={
                                    <PageExchangeReturnProduct
                                        TitleCategory={TitleCategory}
                                        TitlePage={TitlePage}
                                    />
                                }
                            />
                            <Route
                                path="/product/product_detail/:id"
                                exact
                                element={
                                    <PageProductDetail
                                        TitlePage={TitlePage}
                                        TitleCategory={TitleCategory}
                                        Link={Link}
                                    />
                                }
                            />
                            <Route
                                path="/order"
                                exact
                                element={
                                    <PageOrder
                                        TitlePage={TitlePage}
                                        TitleCategory={TitleCategory}
                                    />
                                }
                            />

                            <Route path="/profile/*" element={<PageProfile />} />
                            <Route
                                path="/manage/*"
                                exact
                                element={<MainManage />}
                            />
                        </Routes>
            </>)
    }
}

export default PageProductRouter;