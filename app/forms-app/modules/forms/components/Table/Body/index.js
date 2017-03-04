import React, { Component, PropTypes } from 'react';

import Row from './Row';
import Column from './Column';

export default class Body extends Component {
	static propTypes = {
		columns: PropTypes.array.isRequired,
		data: PropTypes.array
	};

	constructor(props) {
		super(props);
	};

	render() {
		const {
			columns,
			data
		} = this.props;

		return (
			<tbody>
				{
					data.map((rowData, rowIndex) => (
						<Row key={rowData.id} >
							{
								columns.map((col, colIndex) => (
									<Column key={`${rowData.id}_${col.key}`} >
										{
											(function(){
												const colValue = rowData[col.key] || '';

												if (col.renderCell) {
													return col.renderCell(colValue, rowData);
												} else {
													return colValue;
												}
											})()
										}
									</Column>
								))
							}
						</Row>
					))
				}
			</tbody>
		);
	}
}