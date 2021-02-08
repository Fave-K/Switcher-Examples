import * as actionTypes from "./actionTypes";

const INITTIAL_STATE = {
  content: [],
  fetchContentProcess: {
    status: "IDLE",
  },
  updateRecordDetailsProcess: {
    status: "IDLE",
  },
  deleteRecordProcess: {
    status: "IDLE",
    recordId: null,
  },
};

const contentReducer = (state = INITTIAL_STATE, action) => {
  switch (action.type) {
    // #region fetch content
    case actionTypes.FETCH_CONTENT_REQUESTED:
      return {
        ...state,
        fetchContentProcess: {
          status: "PROCESSING",
        },
      };

    case actionTypes.FETCH_CONTENT_SUCCEEDED:
      return {
        ...state,
        fetchContentProcess: {
          status: "SUCCESS",
        },
        content: [...action.payload.content],
      };

    case actionTypes.FETCH_CONTENT_FAILED:
      return {
        ...state,
        fetchContentProcess: {
          status: "ERROR",
          error: action.payload.error,
        },
      };

    case actionTypes.FETCH_CONTENT_RESET: {
      return {
        ...state,
        fetchContentProcess: { status: "IDLE" },
      };
    }

    // #endregion

    // #region update record details
    case actionTypes.UPDATE_RECORD_DETAILS_REQUESTED:
      return {
        ...state,
        updateRecordDetailsProcess: {
          status: "PROCESSING",
        },
      };

    case actionTypes.UPDATE_RECORD_DETAILS_SUCCEEDED:
      return {
        ...state,
        updateRecordDetailsProcess: {
          status: "SUCCESS",
        },
        content: [...action.payload.content],
      };

    case actionTypes.UPDATE_RECORD_DETAILS_FAILED:
      return {
        ...state,
        updateRecordDetailsProcess: {
          status: "ERROR",
          error: action.payload.error,
        },
      };

    case actionTypes.UPDATE_RECORD_DETAILS_RESET:
      return {
        ...state,
        updateRecordDetailsProcess: { status: "IDLE" },
      };

    // #endregion

    // #region delete record
    case actionTypes.DELETE_RECORD_REQUESTED:
      return {
        ...state,
        deleteRecordProcess: {
          status: "PROCESSING",
          recordId: action.payload.recordId,
        },
      };

    case actionTypes.DELETE_RECORD_SUCCEEDED:
      return {
        ...state,
        deleteRecordProcess: {
          status: "SUCCESS",
          recordId: action.payload.recordId,
        },
        content: [...action.payload.content],
      };

    case actionTypes.DELETE_RECORD_FAILED:
      return {
        ...state,
        deleteRecordProcess: {
          status: "ERROR",
          error: action.payload.error,
          recordId: action.payload.recordId,
        },
      };

    case actionTypes.DELETE_RECORD_RESET:
      return {
        ...state,
        deleteRecordProcess: { status: "IDLE", recordId: null },
      };

    // #endregion
    default:
      return state;
  }
};

export default contentReducer;
