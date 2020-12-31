/** @format */

import React from 'react';

function MessageBox(props) {
	return (
		<div className={`alert alert-${props.variant || 'info'}`}>
			{props.children}
			<button type="button" class="close" data-dismiss="alert" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>
	);
}

export default MessageBox;
