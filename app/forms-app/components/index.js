import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import forms from '../modules/forms';
import { org, personal } from '../modules/forms/utils/sets';
import ModalHOC from '../modules/modal/components/HOC';

const FormsTable = forms.components.FormsTable;

const mapStateToProps = (state) => {
	return {
		forms: forms.selectors.getForms(state),
		sortCfg: forms.selectors.getSort(state),
	}
};

const mapDispatchToProps = {
	sort: forms.actions.sort,
};

@ModalHOC
@connect(mapStateToProps, mapDispatchToProps)
export default class FormsListApp extends Component {

	constructor(props) {
		super(props);

		this.rowClickHandler = this.rowClickHandler.bind(this);
	}

	render() {
		return (
			<div>
				<FormsTable
					data={this.props.forms}
					header={personal(this)}
					onRowClick={this.rowClickHandler}
					onSort={this.props.sort}
					sort={this.props.sortCfg}
				/>
			</div>
		);
	}

	redirect(uri) {
		document.location.pathname = uri;
	}

	rowClickHandler(formId) {
		this.redirect(`/forms/${formId}/preview`);
	}
}

