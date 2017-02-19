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
import * as formsList from '../redux/modules/formsList';
import * as modal from '../redux/modules/mainPageModal';
import * as appConfig from '../redux/modules/mainPageApp';
import * as config from '../redux/modules/config';
import * as colSets from '../config/mainPageTable/sets';

const ALL = 'ВСЕ ФОРМЫ';
const PERSONAL = 'МОИ ФОРМЫ';

class MainPageApp extends AppComponent {
  constructor(props) {
    super(props);

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

  componentWillMount() {
    this.props.getConfig([
      'user',
      'defaultTab'
    ]).then(
      (result) => {
        const {
          user,
          defaultTab
        } = this.props.config;

        this.user = user;
        this.props.tabInit(defaultTab);
        this.props.fetchForms();
      },
      (error) => console.error(error)
    );
  }

  redirectToResponsesPage(formId) {
    document.location.pathname = `/forms/${formId}/responses`;
  }

  redirectToEditPage(formId) {
    document.location.pathname = `/forms/${formId}/edit`;
  }

  redirectToPreviewPage(formId) {
    document.location.pathname = `/forms/${formId}/preview`;
  }

  copy(formId, name) {
    const submitHandler = (value) => (this.props.sendCopyForm(formId, value, this.props.config.user));
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
      this.props.fetchForms();
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

  render() {
    const {
      applySearchFilter,
      aForms,
      pForms,
      isFetching
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
              isFetching ?
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
              isFetching ?
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
  const cfg = config.getConfig(state.config);
  const aForms = formsList.getForms(state.app.formsList);

  return {
    config: cfg,
    isFetching: formsList.getStatus(state.app.formsList),
    aForms: aForms,
    pForms: formsList.getFormsByUser(state.app.formsList, cfg.user && cfg.user.id),
    tab: appConfig.getTab(state.app),
    modal: modal.getModal(state.modal)
  };
};

const mapDispatchToProps = {
  applySearchFilter: formsList.filter,
  getConfig: config.get,
  fetchForms: formsList.fetch,
  showModal: modal.show,
  hideModal: modal.hide,
  sendDeleteForm: formsList.remove,
  sendCopyForm: formsList.copy,
  sendForm: formsList.send,
  tabChange: appConfig.tabChange,
  tabInit: appConfig.tabInit
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPageApp);

