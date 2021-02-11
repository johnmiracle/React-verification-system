/** @format */

import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import QRscan from './pages/QRscanner';
import Login from './pages/Login';
import ProductVerify from './pages/ProductVerify';
import Register from './pages/Register';
import CodeVerify from './pages/CodeVerify';
import Result from './pages/Result';
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
import Profile from './pages/Profile';
import Package from './pages/Package';
import AddFarm from './pages/AddFarm';
import MyFarms from './pages/MyFarms';
import NewFarm from './pages/NewFarm';
import AdminDashboard from './pages/AdminDashboard';
import ProductVerifyFail from './pages/ProductVerifyFail';

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
					<nav className="navbar navbar-expand-lg navbar-dark">
						<div className="container">
							{userInfo && userInfo.account === 'user' ? (
								<div>
									<Link className="navbar-brand" to="/my_farms">
										<img
											src="/farmsured!.png"
											alt="FarmSured"
											className=""
											style={{ width: 160 }}
										/>
									</Link>
								</div>
							) : userInfo && userInfo.account === 'admin' ? (
								<div>
									<Link className="navbar-brand" to="/admin_dashboard">
										<img
											src="/farmsured!.png"
											alt="FarmSured"
											className=""
											style={{ width: 160 }}
										/>
									</Link>
								</div>
							) : (
								<div>
									<Link className="navbar-brand" to="/">
										<img
											src="/farmsured!.png"
											alt="FarmSured"
											className=""
											style={{ width: 160 }}
										/>
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
									{userInfo && userInfo.account === 'user' && (
										<ul class="navbar-nav me-auto mb-2 mb-lg-0">
											<li class="nav-item">
												<Link className="nav-link" to="/my_farms">
													My Farms
												</Link>
											</li>
											<li class="nav-item">
												<Link className="nav-link" to="/transaction">
													Transaction
												</Link>
											</li>
											<li class="nav-item">
												<Link className="nav-link" to="/profile">
													Profile
												</Link>
											</li>
										</ul>
									)}
								</ul>
								<ul className="navbar-nav ml-auto">
									{userInfo ? (
										<li className="nav-item dropdown">
											<button
												className="nav-link dropdown-toggle btn-primary-outline"
												id="navbarDropdownMenuLink-4"
												data-toggle="dropdown"
												aria-expanded="false"
											>
												<i className="fa fa-user"></i>
											</button>
											<div
												className="dropdown-menu dropdown-menu-right dropdown-info"
												aria-labelledby="navbarDropdownMenuLink-4"
											>
												{userInfo.account === 'user' ? (
													<div>
														<a href="#" className="dropdown-item">
															Welcome {userInfo.firstName}
														</a>
														<a
															className="dropdown-item"
															href={signoutHandler}
															onClick={signoutHandler}
														>
															Log out
														</a>
													</div>
												) : (
													<div>
														<a
															className="dropdown-item"
															href={signoutHandler}
															onClick={signoutHandler}
														>
															Log out
														</a>
													</div>
												)}
											</div>
										</li>
									) : (
										<li className="nav-item">
											<Link to="/" className="sign-color nav-link">
												Sign In
											</Link>
										</li>
									)}
								</ul>
							</div>
						</div>
					</nav>
				</div>
				<main>
					<Switch>
						<PrivateRoute path="/qr_scanner" component={QRscan} />
						<PrivateRoute path="/code_verify" component={CodeVerify} />
						<PrivateRoute path="/result" component={Result} />
						<PrivateRoute path="/results" component={ProductVerifyFail} />
						<PrivateRoute path="/transaction" component={Transaction} />
						<PrivateRoute path="/profile" component={Profile} />
						<PrivateRoute path="/product_verify" component={ProductVerify} />
						<PrivateRoute path="/new_farm" component={NewFarm} />
						<PrivateRoute path="/farm_package/:id" component={Package} />
						<PrivateRoute path="/my_farms" component={MyFarms} />
						<PrivateRoute path="/add_package/:id" component={AddFarm} />
						<AdminRoute path="/products" component={ProductList} />
						<AdminRoute path="/add_product" component={AddProduct} />
						<AdminRoute path="/users" component={AdminUserView} />
						<AdminRoute path="/user/:id" component={AdminUserDetail} />
						<AdminRoute path="/used_products" component={ProductUsed} />
						<AdminRoute path="/admin_dashboard" component={AdminDashboard} />
						<Route path="/register" component={Register} />
						<Route path="/" exact={true} component={Login} />
					</Switch>
				</main>

				<footer className="footer">
					<div className="">All right reserved. Powered by AgDyna</div>
				</footer>
			</div>
		</Router>
	);
}

export default App;
