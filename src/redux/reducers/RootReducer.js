import { combineReducers } from "redux";
import users from "./UsersReducer";
import loader from './LoaderReducer'

const RootReducer = combineReducers({
  users,
  loader
});

export default RootReducer;
