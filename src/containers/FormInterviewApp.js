import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form } from './Forms';
import AppComponent from '../components/AppComponent';
import { fetchScheme, sendResponse, fetchSchemeAndResponse, hideModal } from '../actions';
import { bindFunctions } from '../utils';

class FormInterviewApp extends AppComponent {
	constructor(props) {
		super(props);

		this.formRef = null;
		this.isDisabled = false;
		bindFunctions.call(this, ['handleClick', 'handleSubmit', 'getFormRef',
			'submitCallback']);
	}

	componentWillMount() {
		const type = this.getPageType();
		this.pageType = type;

		const url = this.getUrl('getUrl');

		if (type === 'ANSWER_REVIEW') {
			this.props.fetchSchemeAndResponse(url);
			this.isDisabled = true;
		}
		else
			this.props.fetchScheme(url);
	}

	handleClick() {
		if (this.props.isUploading) {
			console.log('Already uploading...');
			return;
		}

		this.formRef.submitHandler();
	}

	handleSubmit(responses) {
		const urlType = 'postUrl';
		const url = this.getUrl(urlType);
		this.props.sendResponse(url, responses, this.submitCallback);
	}

	submitCallback() {
		const urlType = 'redirectUrl';
		const url = this.getUrl(urlType);
		document.location.pathname = url;
	}

	getFormRef(ref) {
		this.formRef = ref.getWrappedInstance();
	}

	renderSubmitButton() {
		const type = this.pageType;
		const isUploading = this.props.isUploading;

		if (type === 'INTERVIEW_FORM')
			return (
				<button
					type="button"
					className="btn btn-default btn-block super-form__submit-btn"
					disabled={isUploading}
					onClick={this.handleClick}
				>
					Отправить
					{
						isUploading ?
							<i
								className={`fa fa-spinner fa-spin`}
								style={{marginLeft: "5px"}}
								aria-hidden="true">
							</i> :
							null
					}
				</button>
			);
		return null;
	}

	render() {
		if (this.props.scheme === undefined)
			return null;

		return (
			<div className='super-form-wrapper form-interview'>
				<Form formKey='interview'
					disabled={this.isDisabled}
					scheme={this.props.scheme}
					ref={this.getFormRef}
					onSubmit={this.handleSubmit}
					initialState={this.props.response}/>
				{this.renderSubmitButton()}
				{super.render()}
			</div>
		);
	}
}

FormInterviewApp.propTypes = {

}

const mapStateToProps = (state) => {
	return {
		scheme: state.formData.get('scheme'),
		error: state.formData.get('error'),
		response: state.formData.getIn(['response', 'list']),
		modal: state.modal,
		isUploading: state.formData.get('isUploading'),
	};
};

const mapDispatchToProps = {
	fetchScheme,
	sendResponse,
	fetchSchemeAndResponse,
	hideModal
};

export default connect(mapStateToProps, mapDispatchToProps)(FormInterviewApp);