import { Button, Typography } from "@material-ui/core";
import Icon from "@mdi/react";
import { mdiKeyboard, mdiQrcodeScan } from "@mdi/js";
import { Link } from "react-router-dom";

function ProductVerify() {
  return (
    <div className="container">
      <div className="center">
        <Typography style={{ margin: 30 }} variant="h2">
          Verify Product
        </Typography>
      </div>
      <div className="center">
        <div className="row">
          <div className="col-md-6 p-4">
            <Link to="/code_verify">
              <Button variant="contained" size="large" color="primary">
                <Icon
                  style={{ padding: 10 }}
                  path={mdiKeyboard}
                  title="Code Input"
                  size={10}
                  color="white"
                />
              </Button>
            </Link>
          </div>
          <div className="col-md-6 p-4">
            <Link to="/qr_scanner">
              <Button variant="contained" size="large" color="primary">
                <Icon
                  style={{ padding: 10 }}
                  path={mdiQrcodeScan}
                  title="QR Scanner"
                  size={10}
                  color="white"
                />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductVerify;
