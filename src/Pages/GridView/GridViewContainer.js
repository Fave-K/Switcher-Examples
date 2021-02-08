import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import * as contentActions from "../../redux/actions";
import * as contentSelectors from "../../redux/selectors";

import GridView from "./GridView";

export class GridViewContainer extends Component {
  constructor(props) {
    super(props);
    this.deleteRecord = this.deleteRecord.bind(this);
  }

  deleteRecord = (id) => {
    this.props.contentActions.deleteRecord(id);
  };

  render() {
    return <GridView {...this.props} deleteRecord={this.deleteRecord} />;
  }
}

const mapStateToProps = (state) => ({
  deleteRecordProcess: contentSelectors.getDeleteRecordProcess(state),
});

const mapDispatchToProps = (dispatch) => ({
  contentActions: bindActionCreators(contentActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GridViewContainer);

GridViewContainer.propTypes = {
  contentActions: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  ),
  deleteRecordProcess: PropTypes.object,
};
