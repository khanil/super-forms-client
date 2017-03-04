import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import forms from '../modules/forms';
const FormsTable = forms.components.FormsTable;
import { org, personal } from '../modules/forms/utils/sets';

class FormsListApp extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<FormsTable
					data={this.props.forms}
					header={personal(this)}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		forms: forms.selectors.getForms(state)
	}
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(FormsListApp);

