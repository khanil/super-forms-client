import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import form from '../modules/form';
import responses from '../modules/responses';
import ControlPanel from './ControlPanel';
const Form = form.components.Form;
const ResponsesTable = responses.components.ResponsesTable;

class ResponsesApp extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const formId = this.props.form.id;
    const respAmount = this.props.responses.length;
    this.props.subscribeForUpdates(formId, respAmount);
  }

  render() {
    const {
      fetchedLast,
      fetchResponses,
      fetchXLSX,
      form,
      responses
    } = this.props;

    return (
      <div>
        <Form {...form.scheme} />
        <ControlPanel
          fetchedLast={fetchedLast}
          fetchResponses={fetchResponses.bind(null, form.id)}
          fetchXLSX={fetchXLSX.bind(null, form.id)}
        />
        <ResponsesTable responses={responses} items={form.scheme.items} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fetchedLast: responses.selectors.getFetchedLast(state),
    form: form.selectors.getAll(state),
    responses: responses.selectors.getResponses(state)
  };
};

const mapDispatchToProps = {
  fetchResponses: responses.actions.fetch,
  fetchXLSX: responses.actions.fetchXLSX,
  subscribeForUpdates: responses.actions.subscribeForUpdates
};

export default connect(mapStateToProps, mapDispatchToProps)(ResponsesApp);