import { combineReducers } from "redux";
import users from "./UsersReducer";
import auth from './AuthReducer';
import loader from './LoaderReducer'

const RootReducer = combineReducers({
  auth,
  users,
  loader
});

export default RootReducer;
