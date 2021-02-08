import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import * as contentActions from "../../redux/actions";
import * as contentSelectors from "../../redux/selectors";

import HomePage from "./HomePage";

export class HomePageContainer extends Component {
  constructor(props) {
    super(props);
    this.retryFetchContent = this.retryFetchContent.bind(this);
  }
  // fetch content on home page mounting
  componentDidMount() {
    this.props.contentActions.fetchContent();
  }

  // reset the fetch process
  componentWillUnmount() {
    this.props.contentActions.resetFetchContent();
  }

  // function to retry fetching the content
  retryFetchContent = () => {
    this.props.contentActions.fetchContent();
  };

  render() {
    return (
      <HomePage {...this.props} retryFetchContent={this.retryFetchContent} />
    );
  }
}

const mapStateToProps = (state) => ({
  content: contentSelectors.getContent(state),
  fetchContentProcess: contentSelectors.getFetchContentProcess(state),
});

const mapDispatchToProps = (dispatch) => ({
  contentActions: bindActionCreators(contentActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);

HomePageContainer.propTypes = {
  contentActions: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  ),
  fetchContentProcess: PropTypes.object,
};
