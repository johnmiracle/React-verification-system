/** @format */

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
			<div>
				<nav className="mb-1 navbar navbar-expand-lg navbar-dark info-color">
					{userInfo ? (
						<div className="navbar-nav ">
							<Link className="navbar-brand" to="/product_verify">
								Navbar
							</Link>
							<button
								className="navbar-toggler"
								type="button"
								data-toggle="collapse"
								data-target="#navbarSupportedContent-1"
								aria-controls="navbarSupportedContent-1"
								aria-expanded="false"
								aria-label="Toggle navigation"
							>
								<span className="navbar-toggler-icon"></span>
							</button>
						</div>
					) : (
						<div className="navbar-nav">
							<Link className="navbar-brand" to="/">
								Navbar
							</Link>
							<button
								className="navbar-toggler"
								type="button"
								data-toggle="collapse"
								data-target="#navbarSupportedContent-2"
								aria-controls="navbarSupportedContent-2"
								aria-expanded="false"
								aria-label="Toggle navigation"
							>
								<span className="navbar-toggler-icon"></span>
							</button>
						</div>
					)}
					<div className="collapse navbar-collapse" id="navbarSupportedContent-3">
						<ul className="navbar-nav mr-auto">
							{userInfo && userInfo.account === 'admin' && (
								<div>
									<li className="nav-item dropdown">
										<Link
											className="nav-link dropdown-toggle"
											id="navbarDropdownMenuLink-3"
											data-toggle="dropdown"
											aria-haspopup="true"
											aria-expanded="false"
										>
											<i className="fas fa-list"></i> Products
										</Link>
										<div
											className="dropdown-menu dropdown-menu-right dropdown-info"
											aria-labelledby="navbarDropdownMenuLink-3"
										>
											<Link className="dropdown-item" to="/products">
												Products
											</Link>
											<Link className="dropdown-item" to="/add_product">
												Add Products
											</Link>
											<Link className="dropdown-item" to="/used_product">
												Used Products
											</Link>
										</div>
									</li>
									<li className="nav-item dropdown">
										<div className="nav-item dropdown">
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
										</div>
									</li>
								</div>
							)}
						</ul>
						<ul className="navbar-nav ml-auto">
							{userInfo ? (
								<li className="nav-item dropdown">
									<Link
										className="nav-link dropdown-toggle"
										id="navbarDropdownMenuLink-5"
										data-toggle="dropdown"
										aria-haspopup="true"
										aria-expanded="false"
									>
										<i className="fas fa-user"></i> Profile
									</Link>
									<div
										className="dropdown-menu dropdown-menu-right dropdown-info"
										aria-labelledby="navbarDropdownMenuLink-5"
									>
										<Link className="dropdown-item" to="/transaction">
											Transaction
										</Link>
										<Link className="dropdown-item" onClick={signoutHandler}>
											Log out
										</Link>
									</div>
								</li>
							) : (
								<li className="nav-item">
									<Link to="/" className="nav-link " id="navbarItem">
										Sign In
									</Link>
								</li>
							)}
						</ul>
						<ul className="navbar-nav">
							{userInfo && userInfo.account === 'admin' && (
								<li className="nav-item">
									<Link className="nav-link">
										<i className="fas fa-user"></i> Admin
									</Link>
								</li>
							)}
						</ul>
					</div>
				</nav>
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
						<AdminRoute path="/used_product" component={ProductUsed} />
						<Route exact path="/register" component={Register} />
						<Route path="/qr_generator" component={QRgen} />
						<Route path="/product_verify" component={ProductVerify} />
						<Route exact path="/" exact={true} component={Login} />
					</Switch>
				</main>
			</div>
		</Router>
	);
}

export default App;
