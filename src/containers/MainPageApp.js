import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AppComponent from '../components/AppComponent';
import { bindFunctions } from '../utils';
import { removeFMConfig, copyFMConfig, statusFMConfig } from '../config';
import { modalTypes } from '../constants';
import Table from '../components/Table/Table';
import ControlButtons from '../components/ControlButtons';
import Tabs from '../components/journal/Tabs';
import SearchBar from '../components/journal/SearchBar';
import Spinner from '../components/LoadingSpinner';
import * as myFormsList from '../redux/modules/myFormsList';
import * as allFormsList from '../redux/modules/formsList';
import * as modal from '../redux/modules/mainPageModal';
import * as appConfig from '../redux/modules/mainPageApp';
import * as colSets from '../config/mainPageTable/sets';

const ALL = 'ВСЕ ФОРМЫ';
const PERSONAL = 'МОИ ФОРМЫ';

class MainPageApp extends AppComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPersonalFetched: false
    }

    this.tabs = [ALL, PERSONAL];

    this.tableSpinner = (
      <Spinner
        iconSize='lg'
      />
    );

    bindFunctions.call(this, ['redirectToResponsesPage', 'redirectToEditPage',
      'redirectToPreviewPage', 'remove', 'copy', 'send', 'showStatus',
      'tableRowClickHandler', 'tabClickHandler']);

    this.columns = {
      org: colSets.org(this),
      personal: colSets.personal(this)
    }
  }

  redirectToResponsesPage(formId) {
    const urlType = 'reportUrl';
    const url = this.getUrl(urlType);
    document.location.pathname = url.replace('id', formId);
  }

  redirectToEditPage(formId) {
    const urlType = 'editUrl';
    const url = this.getUrl(urlType);
    document.location.pathname = url.replace('id', formId);
  }

  redirectToPreviewPage(formId) {
    const urlType = 'previewUrl';
    const url = this.getUrl(urlType);
    document.location.pathname = url.replace('id', formId);
  }

  copy(formId, name) {
    const submitHandler = (value) => (this.props.sendCopyForm(formId, value, "gBR4arJn"));
    const payload = copyFMConfig;
    payload.label = `Введите название для копии формы "${name}"`;
    payload.submitHandler = submitHandler;
    this.props.showModal(modalTypes.SINGLE_INPUT_MODAL, payload);
  }

  remove(formId) {
    const confirmHandler = this.props.sendDeleteForm.bind(this, formId);
    const payload = removeFMConfig;
    payload.confirmHandler = confirmHandler;
    this.props.showModal(modalTypes.CONFIRM_MODAL, payload);
  }

  send(formId) {
    const sendHandler = (config) => this.props.sendForm(formId, config);
    const payload = {};
    payload.sendHandler = sendHandler;
    this.props.showModal(modalTypes.SEND_MODAL, payload);
  }

  showStatus(formId, formName) {
    const payload = statusFMConfig(formId, formName);
    this.props.showModal(modalTypes.MESSAGE_MODAL, payload);
  }

  tabClickHandler(tab) {
    const currTableMode = this.props.tab;
    if (currTableMode === tab)
      return;

    if (tab === ALL) {
      const urlType = 'getAllUrl';
      const url = this.getUrl(urlType);
      this.props.fetchAllForms(url);
    } else {
      if (this.state.isPersonalFetched == false) {
        this.props.fetchPersonalForms();
        this.setState({
          isPersonalFetched: true
        });
      }
    }

    this.props.tabChange(tab);
  }

  tableRowClickHandler(e, data) {
    let target = e.target;

    while (target.classList.contains(Table.classes.TABLE) === false) {
      if (target.classList.contains(ControlButtons.className)) {
        return;
      }
      target = target.parentNode;
    }

    this.redirectToPreviewPage(data.id);
  }

  componentWillMount() {
    const tab = this._extraData['tab'] || this.props.tab;

    this.props.tabInit(tab);

    if (tab == ALL) {
      this.props.fetchAllForms();
    } else {
      this.props.fetchPersonalForms();
      this.setState({
        isPersonalFetched: true
      });
    }
  }

  render() {
    const {
      applySearchFilter,
      aForms,
      pForms,
      aFetching,
      pFetching
    } = this.props;

    if (pForms === undefined)
      return null;

    const tableMode = this.props.tab;

    const pTableStyle = tableMode === PERSONAL ? null : {'display' : 'none'};
    const aTableStyle = tableMode === ALL ? null : {'display' : 'none'};

    return (
      <div>

        <Tabs
          active={tableMode}
          className={'nav-pretable'}
          clickHandler={this.tabClickHandler}
          tabs={this.tabs}
        />

        <div style={aTableStyle}>
          <SearchBar
            onSearch={applySearchFilter}
          />

          <Table
            columns={this.columns.org}
            data={aForms}
            defaultSortBy={'index'}
            emptyDataMessage={
              aFetching ?
              this.tableSpinner :
              null
            }
            name='journal'
            onRowClick={this.tableRowClickHandler}
          />
        </div>
        <div style={pTableStyle}>
          <Table
            columns={this.columns.personal}
            data={pForms}
            defaultSortBy={'index'}
            emptyDataMessage={
              pFetching ?
              this.tableSpinner :
              null
            }
            name='form-list'
            onRowClick={this.tableRowClickHandler}
          />
        </div>
        {super.render()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // aFetching: allFormsList.getStatus(state.app.allFormsList),
    pFetching: myFormsList.getStatus(state.app.myFormsList),
    // aForms: allFormsList.isFilterEmpty(state.app.allFormsList) ?
    aForms: allFormsList.getForms(state.app.allFormsList), //:
      // allFormsList.getFormsFilteredByUser(state.app.allFormsList),
    pForms: myFormsList.getForms(state.app.myFormsList),
    error: null,
    tab: appConfig.getTab(state.app),
    modal: modal.getModal(state.modal)
  };
};

const mapDispatchToProps = {
  // applySearchFilter: allFormsList.filter,
  fetchAllForms: allFormsList.fetch,
  fetchPersonalForms: myFormsList.fetch,
  showModal: modal.show,
  hideModal: modal.hide,
  sendDeleteForm: myFormsList.remove,
  sendCopyForm: allFormsList.copy,
  sendForm: myFormsList.send,
  tabChange: appConfig.tabChange,
  tabInit: appConfig.tabInit
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPageApp);

