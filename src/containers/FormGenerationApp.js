import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormGenerator, Form } from './Forms';
import AppComponent from '../components/AppComponent';
import PreviewButton from '../components/PreviewButton';
import { sendScheme, fetchScheme, hideModal } from '../actions';
import { basisTypes, formTypes } from '../constants';
import { bindFunctions } from '../utils';

class FormGenerationApp extends AppComponent {
	constructor(props) {
		super(props);

		this.state = {
			isGVisible: true,
			isPVisible: true
		}

		this.generatorRef = null;
		bindFunctions.call(this, ['handleClick', 'handleSubmit', 'getGeneratorRef',
			'hidePreview', 'showPreview', 'hideGenerator', 'showBoth']);
	}

	componentWillMount() {
		const type = this.getPageType();
		this.pageType = type;

		if (type === 'EDIT_FORM') {
			const url = this.getUrl('getUrl');
			this.props.fetchScheme(url);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.formId !== nextProps.formId)
			this.setUrlId(nextProps.formId);
	}

	handleClick() {
		this.generatorRef.submitHandler();
	}

	handleSubmit(scheme) {
		const urlType = this.pageType === 'EDIT_FORM' || this.props.formId !== undefined ? 'updateUrl' : 'createUrl';
		const url = this.getUrl(urlType);
		this.props.sendScheme(url, scheme);
	}

	getGeneratorRef(ref) {
		this.generatorRef = ref.getWrappedInstance();
	}

	hidePreview() {
		this.setState({
			isGVisible: true,
			isPVisible: false
		});
	}

	showPreview() {
		this.setState({
			isGVisible: true,
			isPVisible: true
		});
	}

	hideGenerator() {
		this.setState({
			isGVisible: false,
			isPVisible: true
		});
	}

	showBoth() {
		this.setState({
			isGVisible: true,
			isPVisible: true
		});
	}

	render() {
		if (this.pageType === 'EDIT_FORM' && this.props.initialScheme === undefined && this.props.previewScheme === undefined)
			return null;

		const {
			isGVisible,
			isPVisible
		} = this.state;

		let gClass, pClass;

		if (isGVisible && isPVisible) {
			gClass = 'col-md-7';
			pClass = 'col-md-4 col-md-offset-1';
		} else {
			if (isGVisible) {
				gClass = 'col-md-12';
				pClass = 'col-md-0';
			} else {
				gClass = 'col-md-0';
				pClass = 'col-md-12'
			}
		}

		const pull = isGVisible ? 'pull-right' : 'pull-left';

		return (
			<div>
				{/*<div className='row'>
					<div className={`${gClass}`}>
					</div>
					<div className={`${pClass} ${pull}`}>
						<PreviewButton
							isGVisible={isGVisible}
							isPVisible={isPVisible}
							hidePreview={this.hidePreview}
							showPreview={this.showPreview}
							hideGenerator={this.hideGenerator}
							showBoth={this.showBoth}
						/>
					</div>
				</div>*/}

				<section className='form-generator-container'>
					<section className='form-generator-section'>
						<h2>Генератор</h2>
						<div className='form-generator-wrapper'>
							<FormGenerator
								basisTypes={basisTypes.ALL}
								formTypes={formTypes.ALL}
								ref={this.getGeneratorRef}
								onSubmit={this.handleSubmit}
								initialState={this.props.initialScheme}
								previewKey='preview'/>
							{super.render()}
						</div>
					</section>
					<section className='form-preview-section'>
						<h2>Предпросмотр</h2>
						<div className='form-preview-wrapper'>
							<Form
								formKey='preview'
								scheme={this.props.previewScheme}
							/>
						</div>
					</section>
					<button
						type="button"
						className="btn btn-primary btn-block form-generator__submit-btn"
						onClick={this.handleClick}
					>
						Сохранить
					</button>
				</section>

				{/*<div className='row'>
					<div className={`form-generator-wrapper ${gClass}`} style={{display: isGVisible ? 'inline-block' : 'none'}}>
						<h2>Генератор</h2>
						<FormGenerator
							basisTypes={basisTypes.ALL}
							formTypes={formTypes.ALL}
							ref={this.getGeneratorRef}
							onSubmit={this.handleSubmit}
							initialState={this.props.initialScheme}
							previewKey='preview'/>
						{super.render()}
					</div>
					<div className={`form-generator-preview-wrapper form-interview ${pClass}`} style={{display: isPVisible ? 'block' : 'none'}}>
						<h2>Предпросмотр</h2>
						<Form
							formKey='preview'
							scheme={this.props.previewScheme}
						/>
					</div>
				</div>*/}

				{/*<div className='row'>
					<button type="button" className="btn btn-default btn-block form-generator__submit-btn" onClick={this.handleClick}>
							Сохранить</button>
				</div>*/}
			</div>
		);
	}
}

FormGenerationApp.propTypes = {

}

const mapStateToProps = (state) => {
	return {
		isFetching: state.formData.get('isFetching'),
		initialScheme: state.formData.get('scheme'),
		formId: state.formData.get('id'),
		error: state.formData.get('error'),
		modal: state.modal,
		previewScheme: state.forms.scheme
	};
};

const mapDispatchToProps = {
	sendScheme,
	fetchScheme,
	hideModal
};

export default connect(mapStateToProps, mapDispatchToProps)(FormGenerationApp);