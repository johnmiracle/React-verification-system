import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  listProducts,
  productListDownload,
} from "../actions/adminActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_CREATE_RESET } from "../constants/adminConstants";

function ProductList(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [productName, setProductName] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [point, setPoint] = useState(10);

  const adminProductList = useSelector((state) => state.adminProductList);
  const { loading, error, products } = adminProductList;

  //To Open the Add Product Modal
  const openModal = (product) => {
    setModalVisible(true);
    setProductName(product.name);
    setBatchNumber(product.price);
    setSerialNumber(product.description);
  };

  // Handles the Submit account for product adding
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addProduct(productName, batchNumber, serialNumber, point));
  };

  // Getting the return from state after productcreat
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  // Hanldes the product download action
  const handleDownload = (e) => {
    e.preventDefault();
    dispatch(productListDownload());
  };

  // Use Effect
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      setModalVisible(false);
    }
    dispatch(listProducts());
  }, [createdProduct, dispatch, successCreate]);
  return (
    <div className="container">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : (
        <div className="mt-5">
          <div className="row">
            <div className="col-md-12 pb-4">
              <h2 className="">Products</h2>
            </div>
            <div className="col-ml-6">
              <button className="btn btn-primary" onClick={() => openModal({})}>
                Create Product
              </button>
            </div>

            <div className="col-ml-6 ml-auto">
              <button className="btn btn-primary" onClick={handleDownload}>
                Download CSV
              </button>
            </div>
          </div>
          {loadingCreate && <LoadingBox></LoadingBox>}
          {errorCreate && (
            <MessageBox variant="danger">{errorCreate}</MessageBox>
          )}
          <div className="content content-margined mt-3">
            {modalVisible && (
              <div className="form">
                <div className="row mt-5 h-100">
                  <div className="col-md-3"></div>
                  <div className="col-md-6">
                    <div className="card">
                      <h5 className="card-header info-color white-text text-center py-4">
                        <strong>Product Unique Pin Generator</strong>
                      </h5>

                      <div className="card-body px-lg-5 pt-0">
                        <form className="text-center" onSubmit={submitHandler}>
                          <div className="md-form">
                            <input
                              type="text"
                              id="materialLoginFormText"
                              className="form-control"
                              onChange={(e) => setProductName(e.target.value)}
                            />
                            <label htmlFor="materialLoginFormText">
                              Product Name
                            </label>
                          </div>

                          <div className="md-form">
                            <input
                              type="number"
                              id="materialLoginFormNumber"
                              className="form-control"
                              onChange={(e) => setBatchNumber(e.target.value)}
                            />
                            <label htmlFor="materialLoginFormNumber">
                              Batch Number
                            </label>
                          </div>

                          <div className="md-form">
                            <input
                              type="number"
                              id="materialLoginFormNumber"
                              className="form-control"
                              onChange={(e) => setSerialNumber(e.target.value)}
                            />
                            <label htmlFor="materialLoginFormNumber">
                              Serial Number
                            </label>
                          </div>

                          <div className="md-form">
                            <input
                              type="number"
                              id="materialLoginFormNumber"
                              className="form-control"
                              onChange={(e) => setPoint(e.target.value)}
                            />
                            <label htmlFor="materialLoginFormNumber">
                              Point
                            </label>
                          </div>

                          <button
                            className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
                            type="button"
                            onClick={submitHandler}
                          >
                            Generate
                          </button>
                          <button
                            type="button"
                            onClick={() => setModalVisible(false)}
                            className="btn btn-primary"
                          >
                            Back
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3"></div>
                </div>
              </div>
            )}
            <div className="product-list mt-4">
              {products.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Product Name</th>
                      <th>Serial No</th>
                      <th>Batch No</th>
                      <th>Pin Code</th>
                      <th>Point</th>
                      <th>QRcode</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.product}</td>
                        <td>{product.serial}</td>
                        <td>{product.batch_no}</td>
                        <td>{product.pin_code}</td>
                        <td>{product.points}</td>
                        <td>QRcode</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="">Products Empty</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
