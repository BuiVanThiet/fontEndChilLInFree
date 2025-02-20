import React from "react";
import {
    Card, Col, Row, Input, Flex, Radio, Select, Typography, Button, Image, Upload
} from 'antd';
import {
    PlusOutlined
} from '@ant-design/icons';
import { toast } from 'react-toastify';

const { Title } = Typography;
const { TextArea } = Input;

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });


class BoxAddProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            productData: {
                id: null,
                codeProduct: '',
                nameProduct: '',
                idCategory: null,
                idManufacturer: null,
                idOrigin: null,
                describe: '',
                status: 1
            },
            previewOpen: false,
            previewImage: '',
            fileList: [],
            listImageDelete: []
        };
    }

    componentDidUpdate(prevProps) {
        if(this.propsspinningSpin === false) {

        }
        if (prevProps.productById !== this.props.productById) {
            this.setState({ fileList: this.props.listImage }, () => { console.log('data anh', this.props.fileList) });
        }
        if (prevProps.listImage !== this.props.listImage) {
            this.setState({ fileList: this.props.listImage }, () => { console.log('data anh', this.props.fileList) });
        }
    }


    componentDidMount() {
        console.log('ben trang add', this.props.productById)
        if (this.props.idProduct) {
            this.setState({ productData: this.props.productById, fileList: this.props.listImage })
        }
        console.log('dât anh ben bõ: ', this.props.listImage)
    }

    onChangeDataProduct = (value, objectChange) => {

        this.setState((prevState) => ({
            productData: {
                ...prevState.productData, // Giữ nguyên các object khác
                [objectChange]: value // Cập nhật key động
            }
        }));
    };

    saveProduct = async (checkForm) => {
        console.log('dât anh ', this.state.fileList)
        let productData = {
            id: this.state.productData.id,
            codeProduct: this.state.productData.codeProduct,
            nameProduct: this.state.productData.nameProduct,
            idCategory: this.state.productData.idCategory,
            idManufacturer: this.state.productData.idManufacturer,
            idOrigin: this.state.productData.idOrigin,
            describe: this.state.productData.describe,
            status: this.state.productData.status
        };
        this.props.startLoading();
        if (checkForm === 1) {
            await this.props.getSaveProduct(productData, this.state.fileList);
        } else {
            await this.props.updateProduct(productData);
            await this.props.deleteImagePR(this.state.listImageDelete);
        }
        await this.props.uploadImagePR(this.state.fileList);
        this.props.stopLoading();
        if (checkForm === 1) {
            this.setState({
                productData: {
                    id: null,
                    codeProduct: '',
                    nameProduct: '',
                    idCategory: null,
                    idManufacturer: null,
                    idOrigin: null,
                    describe: '',
                    status: 1
                },
                previewOpen: false,
                previewImage: '',
                fileList: []
            })
        } else {
            this.setState({ listImageDelete: [] })
        }
        toast.success(checkForm === 1 ? 'Thêm mới sản phẩm thành công!' : 'Sửa thông tin sản phẩm thành công!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        });
    }

    //upload anh
    handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({ previewImage: file.url || file.preview, previewOpen: true });
    };

    handleChange = ({ fileList }) => {
        this.setState({ fileList });
    };

    handleRemove = (file) => {
        console.log("Ảnh bị xóa:", file.uid);
        this.setState((prevState) => ({
            listImageDelete: [...prevState.listImageDelete, file.uid],
        }));
    };
    render() {
        let { productData } = this.state;

        const { previewOpen, previewImage, fileList } = this.state;
        const uploadButton = (
            <button
                style={{
                    border: 0,
                    background: 'none',
                }}
                type="button"
            >
                <PlusOutlined />
                <div
                    style={{
                        marginTop: 8,
                    }}
                >
                    Upload
                </div>
            </button>
        );

        return (
            <>
                <Card type="inner">
                    <Row gutter={[16, 16]} align="middle" className="">
                        <Col span={8}>
                            Mã sản phẩm:
                            <Input placeholder="Nhập mã sản phẩm" value={productData.codeProduct} onChange={(e) => this.onChangeDataProduct(e.target.value, 'codeProduct')} />
                        </Col>
                        <Col span={8}>
                            Tên sản phẩm:
                            <Input placeholder="Nhập tên sản phẩm" value={productData.nameProduct} onChange={(e) => this.onChangeDataProduct(e.target.value, 'nameProduct')} />
                        </Col>
                        <Col span={8}>
                            Trạng thái:
                            <Radio.Group
                                value={productData.status}
                                onChange={(e) => this.onChangeDataProduct(e.target.value, 'status')}
                                options={[
                                    {
                                        value: 1,
                                        label: (
                                            <Flex gap="small" justify="center" align="center" vertical>
                                                Hoạt động
                                            </Flex>
                                        ),
                                    },
                                    {
                                        value: 2,
                                        label: (
                                            <Flex gap="small" justify="center" align="center" vertical>
                                                Ngừng hoạt động
                                            </Flex>
                                        ),
                                    },

                                ]}
                            />
                        </Col>
                        <Col span={8}>
                            Danh mục:
                            <Select
                                showSearch
                                style={{
                                    width: '100%',
                                }}
                                onChange={(e) => this.onChangeDataProduct(e, 'idCategory')}
                                value={productData.idCategory}
                                placeholder="Tìm kiếm"
                                optionFilterProp="label"
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={this.props.listCategory}
                            />
                        </Col>
                        <Col span={8}>
                            Nhà sản xuất:
                            <Select
                                showSearch
                                style={{
                                    width: '100%',
                                }}
                                onChange={(e) => this.onChangeDataProduct(e, 'idManufacturer')}
                                value={productData.idManufacturer}
                                placeholder="Tìm kiếm"
                                optionFilterProp="label"
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={this.props.listManufacturer}
                            />
                        </Col>
                        <Col span={8}>
                            Nơi sản xuất:
                            <Select
                                showSearch
                                style={{
                                    width: '100%',
                                }}
                                onChange={(e) => this.onChangeDataProduct(e, 'idOrigin')}
                                value={productData.idOrigin}
                                placeholder="Tìm kiếm"
                                optionFilterProp="label"
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={this.props.listOrigin}
                            />
                        </Col>
                        <Col span={24}>
                            Mô tả:
                            <TextArea
                                rows={4}
                                onChange={(e) => this.onChangeDataProduct(e.target.value, 'describe')}
                                value={productData.describe}
                            />
                        </Col>
                        <Col span={24}>
                            <Upload
                                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                listType="picture-circle"
                                fileList={fileList}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}
                                onRemove={this.handleRemove}
                                multiple
                            >
                                {fileList && fileList.length >= 20 ? null : uploadButton}
                            </Upload>
                            {previewImage && (
                                <Image
                                    wrapperStyle={{
                                        display: 'none',
                                    }}
                                    preview={{
                                        visible: previewOpen,
                                        onVisibleChange: (visible) => this.setState({ previewOpen: visible }),
                                        afterOpenChange: (visible) => !visible && this.setState({ previewImage: '' }),
                                    }}
                                    src={previewImage}
                                />
                            )}
                        </Col>
                        <Col span={24} className="flex justify-end gap-3">
                            {this.props.idProduct ? (
                                <>
                                    <Button color="danger" variant="dashed">
                                        Thông tin biến thể
                                    </Button>
                                    <Button color="danger" variant="dashed" onClick={() => this.saveProduct(2)}>
                                        Cập nhật sản phẩm
                                    </Button>
                                </>

                            ) : (<Button color="danger" variant="dashed" onClick={() => this.saveProduct(1)}>
                                Thêm mới sản phẩm
                            </Button>)}

                        </Col>
                    </Row>
                </Card>
            </>
        );
    }
}


export default BoxAddProduct;

// import React from "react";


// class BoxAddProduct extends React.Component {

//     render() {

//         return (
//             <>
//                 as
//             </>
//         );
//     }
// }


// export default BoxAddProduct;