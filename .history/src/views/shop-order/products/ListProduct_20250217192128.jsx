import React from "react";
import Product from "./Product";
import { Pagination } from "antd";
import { connect } from 'react-redux';
import WebSocketService from '../../../service/WebSocketService';
import { fetchProduct } from '../../../store/action/ProductAction';
//attribute
import { fetchColor } from '../../../store/action/ColorActions';
import { fetchCategory } from '../../../store/action/CategoryActions';
import { fetchManufacturer } from '../../../store/action/ManufacturerActions';
import { fetchOrigin } from '../../../store/action/OriginActions';
import { fetchSize } from '../../../store/action/SizeActions';
import { fetchWeightType } from '../../../store/action/WeightTypeAction';
import {
    convertData,
    getColumnSearchProps,
    convertDataFillter,
    convertDataSelected,
    validateSelect, validateString, checkDuplicate,
} from '../../../store/action/ActionRenderData';
const onChangePage = (pageNumber) => {
    console.log('Page: ', pageNumber);
};
class ListProduct extends React.Component {

    componentDidMount() {
        WebSocketService.connect(() => {
            WebSocketService.subscribeSocket(() => this.props.fetchProduct(), '/topic/product'); // Sử dụng arrow function
            WebSocketService.subscribeSocket(() => this.props.fetchColor(), '/topic/color');
            WebSocketService.subscribeSocket(() => this.props.fetchCategory(), '/topic/category');
            WebSocketService.subscribeSocket(() => this.props.fetchManufacturer(), '/topic/manufacturer');
            WebSocketService.subscribeSocket(() => this.props.fetchOrigin(), '/topic/origin');
            WebSocketService.subscribeSocket(() => this.props.fetchSize(), '/topic/size');
            WebSocketService.subscribeSocket(() => this.props.fetchWeightType(), '/topic/weight-type');
            this.loadDataAttribute();
        });
    }

    loadDataAttribute = () => {
        if (!this.props.colors.length) {
            this.props.fetchColor();
        }
        if (!this.props.categores.length) {
            this.props.fetchCategory();
        }
        if (!this.props.manufacturers.length) {
            this.props.fetchManufacturer();
        }
        if (!this.props.origins.length) {
            this.props.fetchOrigin();
        }
        if (!this.props.sizes.length) {
            this.props.fetchSize();
        }
        if (!this.props.weightTypes.length) {
            this.props.fetchWeightType();
        }
        if (!this.props.products.length) {
            this.props.fetchProduct();
        }
    }

    render() {
        return (
            <>
                <div className="product-store w-[90%] mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
                        {
                            this.props.products.map((item) => (

                                <>
                                    <Product
                                        nameProduct={item}
                                    />
                                </>
                            ))
                        }
                    </div>
                    <Pagination showQuickJumper defaultCurrent={2} total={500} align="center" onChange={onChangePage} />

                </div >
            </>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        products: state.product.products,
        //attribute
        colors: state.color.colors,
        categores: state.category.categores,
        manufacturers: state.manufacturer.Manufacturers,
        origins: state.origin.origins,
        sizes: state.size.sizes,
        weightTypes: state.weightType.weightTypes
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchProduct: () => dispatch(fetchProduct()),
    //attribute
    fetchColor: () => dispatch(fetchColor()),
    fetchCategory: () => dispatch(fetchCategory()),
    fetchManufacturer: () => dispatch(fetchManufacturer()),
    fetchOrigin: () => dispatch(fetchOrigin()),
    fetchSize: () => dispatch(fetchSize()),
    fetchWeightType: () => dispatch(fetchWeightType()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListProduct);

// export default ListProduct;
