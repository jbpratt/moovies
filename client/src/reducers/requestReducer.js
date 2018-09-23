import {
  ADD_REQUEST,
  GET_REQUESTS,
  REQUEST_LOADING,
  DELETE_REQUEST
} from '../actions/types';

const initialState = {
  requests: [],
  request: {},
  loading: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_REQUESTS:
      return {
        ...state,
        requests: action.payload,
        loading: false
      }
    case ADD_REQUEST:
      return {
        ...state,
        requests: [action.payload, ...state.requests]
      }
    case DELETE_REQUEST:
      return {
        ...state,
        requests: state.requests.filter(request => request._id !== action.payload)
      }
    default:
      return state;
  }

}