import * as actionTypes from "./actionTypes";
import { getContent } from "./selectors";
import is from "is_js";

const base_url = `http://localhost:4000/content`;

// #region function to fetch the data
export const fetchContent = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.FETCH_CONTENT_REQUESTED,
    });

    const url = `${base_url}`;

    const request = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(url, request)
      .then((response) => {
        if (response.status === 200) {
          response.json().then((responseData) => {
            dispatch({
              type: actionTypes.FETCH_CONTENT_SUCCEEDED,
              payload: {
                content: [...responseData],
              },
            });
          });
        } else {
          dispatch({
            type: actionTypes.FETCH_CONTENT_FAILED,
            payload: {
              error: "An error occurred. Please retry",
            },
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.FETCH_CONTENT_FAILED,
          payload: {
            error: error.message,
          },
        });
      });
  };
};

// function to reset the process
export const resetFetchContent = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.FETCH_CONTENT_RESET,
    });
  };
};

// #endregion

// #region function to save changes made on a record
export const updateRecordDetails = (id, recordDetails) => {
  return (dispatch, getState) => {
    // Signal the start of the process
    dispatch({
      type: actionTypes.UPDATE_RECORD_DETAILS_REQUESTED,
    });

    let body = {};

    Object.keys(recordDetails).forEach((key, index) => {
      if (is.not.null(recordDetails[key])) {
        body[key] = recordDetails[key];
      }
    });

    const url = `${base_url}/${id}/`;

    const request = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    fetch(url, request)
      .then((response) => {
        if (response.status === 200) {
          setTimeout(() => {
            response.json().then((responseData) => {
              const newContent = [...getContent(getState())];

              const found = newContent.find(
                (item, index) => item.id === responseData.id
              );

              Object.assign(found, responseData);

              dispatch({
                type: actionTypes.UPDATE_RECORD_DETAILS_SUCCEEDED,
                payload: {
                  content: newContent,
                },
              });
            });
          }, 500);
        } else {
          dispatch({
            type: actionTypes.UPDATE_RECORD_DETAILS_FAILED,
            payload: {
              error: "An error occurred. Please retry",
            },
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.UPDATE_RECORD_DETAILS_FAILED,
          payload: {
            error: error.message,
          },
        });
      });
  };
};

export const resetUpdateRecordDetails = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_RECORD_DETAILS_RESET,
    });
  };
};

// #endregion

// #region delete a record
export const deleteRecord = (id) => {
  return (dispatch, getState) => {
    // Signal the start of the process
    dispatch({
      type: actionTypes.DELETE_RECORD_REQUESTED,
      payload: {
        recordId: id,
      },
    });

    // function to delete from the api
    const url = `${base_url}/${id}`;

    const request = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(url, request)
      .then((response) => {
        const newContent = [...getContent(getState())];

        const filtered = newContent.filter((item) => item.id !== id);

        if (response.status === 200) {
          setTimeout(() => {
            dispatch({
              type: actionTypes.DELETE_RECORD_SUCCEEDED,
              payload: {
                content: [...filtered],
                recordId: id,
              },
            });
          }, 500);
        } else {
          dispatch({
            type: actionTypes.DELETE_RECORD_FAILED,
            payload: {
              error: "An error occurred. Please retry.",
              recordId: id,
            },
          });
        }
      })

      .catch((error) => {
        dispatch({
          type: actionTypes.DELETE_RECORD_FAILED,
          payload: {
            error: error.message,
            recordId: id,
          },
        });
      });
  };
};

export const resetDeleteRecord = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_RECORD_RESET,
    });
  };
};
// #endregion
