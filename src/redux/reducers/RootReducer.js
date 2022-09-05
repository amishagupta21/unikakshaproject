import { combineReducers } from "redux";
import users from "./UsersReducer";
import auth from './AuthReducer'

const RootReducer = combineReducers({
  auth,
  users,
});
export default RootReducer;
