import React, { PropTypes } from 'react';

import FetchResponses from './FetchResponses';
import FetchXLSX from './FetchXLSX';

export default function ControlPanel(props) {
	const {
		fetchedLast,
		fetchResponses,
		fetchXLSX
	} = props;

	return (
		<div className="row">
			<div className="col-xs-6">
				<FetchXLSX
					fetchXLSX={fetchXLSX}
				/>
			</div>
			<div className="col-xs-6">
				<FetchResponses
					fetchedLast={fetchedLast}
					fetchResponses={fetchResponses}
				/>
			</div>
		</div>
	);
}

ControlPanel.propTypes = {
	fetchedLast: PropTypes.number.isRequired,
	fetchResponses: PropTypes.func.isRequired,
	fetchXLSX: PropTypes.func.isRequired
}