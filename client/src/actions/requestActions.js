import axios from "axios";

import {
  ADD_REQUEST,
  GET_ERRORS,
  GET_REQUESTS,
  REQUEST_LOADING,
  DELETE_REQUEST
} from "./types";

// Add request
export const addRequest = (requestData, history) => dispatch => {
  dispatch(setRequestLoading);
  axios
    .post("/api/requests", requestData)
    .then(res =>
      dispatch({
        type: ADD_REQUEST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Get requests
export const getRequests = () => dispatch => {
  axios
    .get("/api/requests")
    .then(res =>
      dispatch({
        type: GET_REQUESTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    );
};

// Delete request
export const deleteRequest = id => dispatch => {
  dispatch(setRequestLoading);
  axios
    .delete(`/api/requests/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_REQUEST,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add upvote
export const addUpvote = id => dispatch => {
  dispatch(setRequestLoading);
  axios
    .post(`/api/requests/upvote/${id}`)
    .then(res => dispatch(getRequests()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// remove upvote
export const removeUpvote = id => dispatch => {
  dispatch(setRequestLoading);
  axios
    .post(`/api/requests/downvote/${id}`)
    .then(res => dispatch(getRequests()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setRequestLoading = () => {
  return {
    type: REQUEST_LOADING
  };
};
