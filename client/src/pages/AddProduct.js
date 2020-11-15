import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../actions/adminActions";

function AddProduct(props) {
  const [productName, setProductName] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [point, setPoint] = useState(10);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addProduct(productName, batchNumber, serialNumber, point));
  };

  return (
    <div className="container">
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
                  <label htmlFor="materialLoginFormText">Product Name</label>
                </div>

                <div className="md-form">
                  <input
                    type="number"
                    id="materialLoginFormNumber"
                    className="form-control"
                    onChange={(e) => setBatchNumber(e.target.value)}
                  />
                  <label htmlFor="materialLoginFormNumber">Batch Number</label>
                </div>

                <div className="md-form">
                  <input
                    type="number"
                    id="materialLoginFormNumber"
                    className="form-control"
                    onChange={(e) => setSerialNumber(e.target.value)}
                  />
                  <label htmlFor="materialLoginFormNumber">Serial Number</label>
                </div>

                <div className="md-form">
                  <input
                    type="number"
                    id="materialLoginFormNumber"
                    className="form-control"
                    onChange={(e) => setPoint(e.target.value)}
                  />
                  <label htmlFor="materialLoginFormNumber">Point</label>
                </div>

                <button
                  className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
                  type="submit"
                  onClick={submitHandler}
                >
                  Generate
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
}
export default AddProduct;
