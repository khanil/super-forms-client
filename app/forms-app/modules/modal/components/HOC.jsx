import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import modal from '../index';
import modals from './index';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName ||
         WrappedComponent.name ||
         'Component';
}

export default function modalHOC(WrappedComponent) {

  class ModalEnchaser extends Component {
    static displayName = `ModalHOC(${getDisplayName(WrappedComponent)})`;

    render() {
      const {
        modal,
        payload,
        hideModal,
        showModal,
      } = this.props;

      const ActiveModal = modals[modal];

      return (
        <div>
          <WrappedComponent
            showModal={showModal}
          />

          {
            modal ?
            <ActiveModal
              hideModal={hideModal.bind(null, modal)}
              {...payload}
            /> :
            null
          }
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      modal: modal.selectors.getId(state),
      payload: modal.selectors.getPayload(state),
    }
  };

  const mapDispatchToProps = {
    showModal: modal.actions.show,
    hideModal: modal.actions.hide,
  };

  return connect(mapStateToProps, mapDispatchToProps)(ModalEnchaser);
}