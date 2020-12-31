/** @format */

import { Button } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiKeyboard, mdiQrcodeScan } from '@mdi/js';
import { Link } from 'react-router-dom';

function ProductVerify() {
	return (
		<div className="container mb-5">
			<div>
				<div className="center">
					<h2 className="verify-text">Verify Product</h2>
				</div>
				<div className="center">
					<div className="row verify">
						<div className="col-md-6">
							<Link to="/code_verify/">
								<Button
									variant="contained"
									size="large"
									color="primary"
									className="Code-Input"
								>
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
						<div className="col-md-6">
							<Link to="/qr_scanner">
								<Button
									variant="contained"
									size="large"
									color="primary"
									className="QR-Scanner"
								>
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
		</div>
	);
}

export default ProductVerify;
