import {
  ADD_REVIEW,
  GET_REVIEWS,
  GET_ERRORS,
  REVIEW_LOADING,
  DELETE_REVIEW,
  GET_REVIEW
} from "./types";
import axios from "axios";

// Set loading state
export const setReviewLoading = () => {
  return {
    type: REVIEW_LOADING
  };
};
// Add review
export const addReview = (reviewData, history) => dispatch => {
  dispatch(setReviewLoading);
  axios
    .post("/api/reviews", reviewData)
    .then(res =>
      dispatch({
        type: ADD_REVIEW,
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

// Get Reviews
export const getReviews = () => dispatch => {
  axios
    .get("/api/reviews")
    .then(res =>
      dispatch({
        type: GET_REVIEWS,
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
// Get Review
export const getReview = id => dispatch => {
  dispatch(setReviewLoading());
  axios
    .get(`/api/reviews/${id}`)
    .then(res =>
      dispatch({
        type: GET_REVIEW,
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

// Delete Reviews
export const deleteReview = id => dispatch => {
  dispatch(setReviewLoading);
  axios
    .delete(`/api/reviews/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_REVIEW,
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
  dispatch(setReviewLoading);
  axios
    .post(`/api/reviews/upvote/${id}`)
    .then(res => dispatch(getReviews()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// remove upvote
export const removeUpvote = id => dispatch => {
  dispatch(setReviewLoading);
  axios
    .post(`/api/reviews/downvote/${id}`)
    .then(res => dispatch(getReviews()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Comment
export const addComment = (reviewId, commentData) => dispatch => {
  axios
    .post(`/api/reviews/comment/${reviewId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_REVIEW,
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
// Delete Comment
export const deleteComment = (reviewId, commentId) => dispatch => {
  axios
    .delete(`/api/reviews/comment/${reviewId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_REVIEW,
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
