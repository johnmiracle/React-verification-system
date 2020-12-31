/** @format */

import React from 'react';

const ProgressBar = (props) => {
	const { bgcolor, completed } = props;

	const fillerStyles = {
		height: '100%',
		width: `${completed}%`,
		backgroundColor: bgcolor,
		borderRadius: 'inherit',
		textAlign: 'right',
		transition: 'width 1s ease-in-out',
	};

	return (
		<div className="containerStyles">
			<div style={fillerStyles}>
				<span className="labelStyles">{`${completed}%`}</span>
			</div>
		</div>
	);
};

export default ProgressBar;
