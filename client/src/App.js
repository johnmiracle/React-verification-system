import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import QRgen from './pages/QRgenerator';
import QRscan from './pages/QRscanner';
import Login from './pages/Login';
import ProductVerify from './pages/ProductVerify';
import Register from './pages/Register';
import CodeVerify from './pages/CodeVerify';
import Result from './pages/Result';
import ProductVerifyFail from './pages/ProductVerifyFail';
import Transaction from './pages/Transaction';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './actions/userActions';
import PrivateRoute from './components/PrivateRoute';
import ProductList from './pages/ProductList';
import AdminUserView from './pages/AdminUserView';
import AdminRoute from './components/AdminRoute';
import ProductUsed from './pages/ProductUsed';
import AdminUserDetail from './pages/AdminUserDetail';
import AddProduct from './pages/AddProduct';

function App(props) {
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	const dispatch = useDispatch();

	const signoutHandler = () => {
		dispatch(logout());
	};
	return (
		<Router>
			<div className="grid-container">
				<div className="header">
					{' '}
					<nav className="mb-1 navbar navbar-expand-lg navbar-dark info-color">
						{userInfo ? (
							<div>
								<Link className="navbar-brand" to="/product_verify">
									Navbar
								</Link>
							</div>
						) : (
							<div>
								<Link className="navbar-brand" to="/">
									Navbar
								</Link>
							</div>
						)}
						<button
							className="navbar-toggler"
							type="button"
							data-toggle="collapse"
							data-target="#navbarSupportedContent-4"
							aria-controls="navbarSupportedContent-4"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse" id="navbarSupportedContent-4">
							<ul className="navbar-nav mr-auto">
								{userInfo && userInfo.account === 'admin' && (
									<div>
										<li className="nav-item dropdown">
											<Link
												className="nav-link dropdown-toggle"
												id="navbarDropdownMenuLink-4"
												data-toggle="dropdown"
												aria-haspopup="true"
												aria-expanded="false"
											>
												<i className="fas fa-list"></i> Products
											</Link>
											<div
												className="dropdown-menu dropdown-menu-left dropdown-info"
												aria-labelledby="navbarDropdownMenuLink-4"
											>
												<Link className="dropdown-item" to="/add_product">
													New Product
												</Link>
												<Link className="dropdown-item" to="/products">
													All Products
												</Link>
												<Link className="dropdown-item" to="/used_products">
													Used Products
												</Link>
											</div>
										</li>
										<li className="nav-item dropdown">
											<Link
												className="nav-link dropdown-toggle"
												id="navbarDropdownMenuLink-4"
												data-toggle="dropdown"
												aria-haspopup="true"
												aria-expanded="false"
											>
												<i className="fas fa-user"></i> Users
											</Link>
											<div
												className="dropdown-menu dropdown-menu-right dropdown-info"
												aria-labelledby="navbarDropdownMenuLink-4"
											>
												<Link className="dropdown-item" to="/users">
													All Users
												</Link>
											</div>
										</li>
									</div>
								)}
							</ul>
							<ul className="navbar-nav ml-auto">
								{userInfo ? (
									<li className="nav-item dropdown">
										<a
											className="nav-link dropdown-toggle"
											id="navbarDropdownMenuLink-4"
											data-toggle="dropdown"
											aria-haspopup="true"
											aria-expanded="false"
											href=""
										>
											<i className="fas fa-user"></i>
										</a>
										<div
											className="dropdown-menu dropdown-menu-right dropdown-info"
											aria-labelledby="navbarDropdownMenuLink-4"
										>
											<Link className="dropdown-item" to="/transaction">
												Transaction
											</Link>
											<a className="dropdown-item" href="" onClick={signoutHandler}>
												Log out
											</a>
										</div>
									</li>
								) : (
									<li className="nav-item">
										<Link to="/" className="sign-color">
											Sign In
										</Link>
									</li>
								)}
							</ul>
						</div>
					</nav>
				</div>
				<main>
					<Switch>
						<PrivateRoute path="/qr_scanner" component={QRscan} />
						<PrivateRoute path="/code_verify" component={CodeVerify} />
						<PrivateRoute path="/result" component={Result} />
						<PrivateRoute path="/result_fail" component={ProductVerifyFail} />
						<PrivateRoute path="/transaction" component={Transaction} />
						<AdminRoute path="/products" component={ProductList} />
						<AdminRoute path="/add_product" component={AddProduct} />
						<AdminRoute path="/users" component={AdminUserView} />
						<AdminRoute path="/user/:id" component={AdminUserDetail} />
						<AdminRoute path="/used_products" component={ProductUsed} />
						<Route exact path="/register" component={Register} />
						<Route path="/qr_generator" component={QRgen} />
						<Route path="/product_verify" component={ProductVerify} />
						<Route path="/" exact={true} component={Login} />
					</Switch>
				</main>
				<footer className="footer">All right reserved. Powered by AgDyna, Miracle Anaje</footer>
			</div>
		</Router>
	);
}

export default App;
