import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import * as contentActions from "../../redux/actions";
import * as contentSelectors from "../../redux/selectors";

import EditModal from "./EditModal";

class EditModalContainer extends Component {
  constructor(props) {
    super(props);
    this.updateRecordDetails = this.updateRecordDetails.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);

    this.state = {
      openModal: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.updateRecordDetailsProcess.status !== "SUCCESS" &&
      this.props.updateRecordDetailsProcess.status === "SUCCESS"
    ) {
      setTimeout(() => {
        this.props.contentActions.resetUpdateRecordDetails();
        this.closeModal();
      }, 2500);
    }

    if (
      prevProps.updateRecordDetailsProcess.status !== "ERROR" &&
      this.props.updateRecordDetailsProcess.status === "ERROR"
    ) {
      setTimeout(() => {
        this.props.contentActions.resetUpdateRecordDetails();
      }, 2500);
    }
  }

  // function to update details
  updateRecordDetails = (id, recordDetails) => {
    this.props.contentActions.updateRecordDetails(id, recordDetails);
  };

  // funtions to close and open the modal
  closeModal = () => {
    this.setState({ openModal: false });
  };

  openModal = () => {
    this.setState({ openModal: true });
  };

  render() {
    return (
      <EditModal
        {...this.props}
        updateRecordDetails={this.updateRecordDetails}
        modalStatus={this.state.openModal}
        closeModal={this.closeModal}
        openModal={this.openModal}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  updateRecordDetailsProcess: contentSelectors.getUpdateRecordDetailsProcess(
    state
  ),
});

const mapDispatchToProps = (dispatch) => ({
  contentActions: bindActionCreators(contentActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditModalContainer);

EditModalContainer.propTypes = {
  contentActions: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  ),
  updateRecordDetailsProcess: PropTypes.object,
};
