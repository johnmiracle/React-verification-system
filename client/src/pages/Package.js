/** @format */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userFarmDetail } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import ProgressBar from '../components/ProgressBar';
import Moment from 'react-moment';
import moment from 'moment';
import { saveFarmDetail } from '../actions/productActions';

function Package(props) {
	const userFarmDetails = useSelector((state) => state.userFarmDetails);
	const { loading, error, farm } = userFarmDetails;

	const date = moment().format('DD MMMM YYYY hh:mm');
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(userFarmDetail(props.match.params.id));
		dispatch(saveFarmDetail(props.match.params.id));
		return () => {
			//
		};
	}, [dispatch, props.match]);

	return (
		<>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox>{error}</MessageBox>
			) : (
				<div className="container mb-5">
					<div className="mt-4 mb-3">
						<Link className="btn btn-primary btn-sm" to="/my_farms">
							Back
						</Link>
					</div>
					<div className="mt-5">
						<div className="row">
							<div className="col-md-12">
								<p className="">Farm Name: {farm.farm_name}</p>
								<p className="">Farm Capacity: {farm.farm_capacity} Capacity</p>
								<p className="">Farm Size: {farm.farm_size} Size</p>
							</div>
						</div>
						<div className="contain-box">
							<ul className="border-bottom">
								<li className="">
									<h5 className="">{farm.poultry_type}</h5>
								</li>
								<li className="verify-input">
									<div className="">
										<Link to="/product_verify" className="btn btn-primary btn-sm">
											VERIFY INPUT
										</Link>
									</div>
								</li>
							</ul>
						</div>
						<div className="">
							<span className="today-date">
								Today's Date & Time:
								<span className=""> {date}</span>
							</span>

							<p className="expected-points mt-3">Expected Points: {farm.expected_points}</p>
							<p className="">Accrued Points: {farm.accured_points} Points </p>
							<ProgressBar
								striped
								completed={Math.round(
									(farm.accured_points * 100) / farm.expected_points || 0
								)}
								bgcolor="#00695c"
							/>
						</div>
						<div className="row">
							<div className="col-md-6">
								<div className="info-container">
									<p className="">Date Subscribed: 15th April, 2020</p>
									<p className="">
										Stocking Date:{' '}
										<Moment format="YYYY/MM/DD" date={farm.stocking_date} />
									</p>
									<p className="">Expected End of Cycle: {farm.stock_due_date} </p>
									<p className="">Duration: {farm.duration || '0'}</p>
									<p className="">
										Expected Av. Weight:
										{farm.poultry_type === 'Broiler'
											? ' 1.2kg LW'
											: farm.poultry_type === 'Layer'
											? ' 1.7Kg LW'
											: farm.poultry_type === 'Noiler'
											? ' 1.5Kg LW'
											: '0Kg LW'}
									</p>
								</div>
							</div>
							<div className="col-md-6">
								<div className="info-contain">
									<p className="">Stocking Qty.: {farm.num_bird_stocked || '0'} Birds</p>
									<p className="">Mortality: 0 Birds</p>
									<p className="">Total: {farm.num_bird_stocked || '0'} Birds</p>
								</div>
							</div>
							<div className="col-md-12 mt-3 standard">
								<h4 className="">
									<i className=""></i> Expected Standared
								</h4>
								<p className=""> - Total Bags of Feed: {farm.num_of_feeds || '0'} Bags</p>
								<p className=""> - Drugs & Vaccine: 0</p>
								<p className=""> - Other Activities: 0</p>
								<p className=""> - Farm Equipment: 0</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default Package;
