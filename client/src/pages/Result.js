import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_VERIFY_RESET } from "../constants/productConstants";

function Result(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productVerify = useSelector((state) => state.productVerify);
  const { verified } = productVerify;
  const dispatch = useDispatch();

  let redirect = "/product_verify";

  const resetHandler = (e) => {
    e.preventDefault();
    dispatch({ type: PRODUCT_VERIFY_RESET });
    props.history.push(redirect);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="container">
            <div id="myModal" className="">
              <div className="modal-dialog modal-confirm">
                <div className="modal-content">
                  <div className="modal-header-true">
                    <div className="icon-box">
                      <center>
                        <i className="font-circle fa fa-check"></i>
                        <h3 className="pt-3">
                          You have been awarded {verified.points} points
                        </h3>
                      </center>
                    </div>
                  </div>
                  <div className="modal-body text-center">
                    <h4>Great!!!</h4>
                    <p className="model-text">
                      Hello {userInfo.firstName} <br />
                      <div className="">
                        Your Product {verified.product} is Authentic with serial
                        number {verified.serial}, batch number{" "}
                        {verified.batch_no} and product code {verified.pin_code}
                      </div>
                      <button
                        className="btn btn-success"
                        data-dismiss="modal"
                        onClick={resetHandler}
                        type="submit"
                      >
                        Continue
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
}

export default Result;
