/** @format */

import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { dashboardForAdmin } from '../actions/adminActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function AdminDashboard(props) {
	const adminDashBoardInfo = useSelector((state) => state.adminDashBoardInfo);
	const { loading, dashboardInfo, error } = adminDashBoardInfo;

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(dashboardForAdmin());

		return () => {
			//
		};
	}, [dispatch]);

	const options = {
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true
					}
				}
			]
		}
	};
	return (
		<div className="">
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
				<div className="container-fluid">
					<div className="row mt-5 mb-3">
						<div className="col-lg-3 col-sm-6 mt-2 mb-2">
							<div className="info_box_var_1 box_bg_a">
								<div className="info_box_body">
									<span className="info_box_icon fa fa-users"></span>
									<span
										className="countUpMe"
										data-endval={dashboardInfo.registeredUsersToday}
									>
										{dashboardInfo.registeredUsersToday}
									</span>
								</div>
								<div className="info_box_footer">
									New Users <small>(last 24h)</small>
								</div>
							</div>
						</div>
						<div className="col-lg-3 col-sm-6 mt-2 mb-2">
							<div className="info_box_var_1 box_bg_b">
								<div className="info_box_body">
									<span className="info_box_icon fa fa-users"></span>
									<span className="countUpMe" data-endval={dashboardInfo.registeredUsers}>
										{dashboardInfo.registeredUsers}
									</span>
								</div>
								<div className="info_box_footer">Registered Users</div>
							</div>
						</div>
						<div className="col-lg-3 col-sm-6 mt-2 mb-2">
							<div className="info_box_var_1 box_bg_c">
								<div className="info_box_body">
									<span className="info_box_icon fa fa-list"></span>
									<span className="countUpMe" data-endval={dashboardInfo.products}>
										{dashboardInfo.products}
									</span>
								</div>
								<div className="info_box_footer">Products</div>
							</div>
						</div>
						<div className="col-lg-3 col-sm-6 mt-2 mb-2">
							<div className="info_box_var_1 box_bg_d">
								<div className="info_box_body">
									<span className="info_box_icon icon_mail_alt"></span>
									<span className="countUpMe" data-endval={dashboardInfo.usedPin}>
										{dashboardInfo.usedPin}
									</span>
								</div>
								<div className="info_box_footer">Used Products</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-6 mt-2 mb-2">
							<div className="info_box_var_1 box_bg_e">
								<div className="info_box_body_bg">
									<span className="info_box_icon icon_mail_alt"></span>
									<span className="countUpMe" data-endval={dashboardInfo.registeredFarms}>
										{dashboardInfo.registeredFarms}
									</span>
								</div>
								<div className="info_box_footer">Registered Farms</div>
							</div>
						</div>
						<div className="col-md-6 mt-2 mb-2">
							<div className="info_box_var_1 box_bg_f">
								<div className="info_box_body_bg">
									<span className="info_box_icon icon_mail_alt"></span>
									<span
										className="countUpMe"
										data-endval={dashboardInfo.registeredFarmsToday}
									>
										{dashboardInfo.registeredFarmsToday}
									</span>
								</div>
								<div className="info_box_footer">
									Registered Farms <small>(last 24h)</small>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-12 mb-5 mt-5">
						<Bar
							data={{
								labels: [
									'Products',
									'Used Products',
									'Registered Farms',
									'Registered Users',
									'Registered Users Today',
									'Registered Farms Today'
								],
								datasets: [
									{
										label: '# of Items',
										data: [
											dashboardInfo.products,
											dashboardInfo.usedPin,
											dashboardInfo.registeredFarms,
											dashboardInfo.registeredUsers,
											dashboardInfo.registeredUsersToday,
											dashboardInfo.registeredFarmsToday
										],
										backgroundColor: [
											'rgba(255, 99, 132, 0.2)',
											'rgba(54, 162, 235, 0.2)',
											'rgba(255, 206, 86, 0.2)',
											'rgba(75, 192, 192, 0.2)',
											'rgba(153, 102, 255, 0.2)',
											'rgba(255, 159, 64, 0.2)'
										],
										borderColor: [
											'rgba(255, 99, 132, 1)',
											'rgba(54, 162, 235, 1)',
											'rgba(255, 206, 86, 1)',
											'rgba(75, 192, 192, 1)',
											'rgba(153, 102, 255, 1)',
											'rgba(255, 159, 64, 1)'
										],
										borderWidth: 1
									}
								]
							}}
							options={options}
						/>
					</div>
					{/* <div className="col-md-6">
						<div className="mt-3">
							<p className="">Used Products</p>
							<Line
								data={{
									labels: [
										dashboardInfo.groupData[0]['createdAt'],
										dashboardInfo.groupData[1]['createdAt'],
										dashboardInfo.groupData[2]['createdAt']
									],
									datasets: [
										{
											label: '# of Votes',
											data: [
												dashboardInfo.groupData[0]['counts'],
												dashboardInfo.groupData[1]['counts'],
												dashboardInfo.groupData[2]['counts']
											],
											fill: false,
											backgroundColor: 'rgb(255, 99, 132)',
											borderColor: 'rgba(255, 99, 132, 0.2)'
										}
									]
								}}
								options={options}
							/>
						</div>
						)}
					</div> */}
				</div>
			)}
		</div>
	);
}

export default AdminDashboard;
