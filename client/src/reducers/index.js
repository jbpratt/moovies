import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import requestReducer from "./requestReducer";
import searchReducer from "./searchReducer";
import reviewReducer from "./reviewReducer";
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  request: requestReducer,
  search: searchReducer,
  review: reviewReducer
});
