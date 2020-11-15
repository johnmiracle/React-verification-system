import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fab} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Link } from "react-router-dom";
import QrScan from "react-qr-reader";
import { verify } from "../actions/productActions";
import { PRODUCT_VERIFY_RESET } from "../constants/productConstants";

function QRscanner(props) {

  const productVerify = useSelector((state) => state.productVerify);

  const { codeResult, error } = productVerify;

  const dispatch = useDispatch();
  const handleScan = (code) => {
    if (code) {
      dispatch(verify(code));
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  let redirect = "/result_fail";

  useEffect(() => {
    if (codeResult) {
      props.history.push("/result");
      dispatch({ type: PRODUCT_VERIFY_RESET });
    }
    if (error) {
      dispatch({ type: PRODUCT_VERIFY_RESET });
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [codeResult]);

  return (
    <div className="container">
      <div className="mt-4">
        <Link to="/product_verify">
          <Fab style={{ marginRight: 10 }} color="primary">
            <ArrowBack />
          </Fab>
        </Link>
      </div>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <center>
            <span>QR Scanner</span>
            <div style={{ marginTop: 30 }}>
              <QrScan
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ height: 240, width: 320 }}
              />
            </div>
          </center>

          {/* <TextareaAutosize
            style={{ fontSize: 18, width: 320, height: 100, marginTop: 100 }}
            rowsMax={4}
            defaultValue={qrscan}
            value={qrscan}
          /> */}
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
}

export default QRscanner;
