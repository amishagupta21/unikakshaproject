import { combineReducers } from "redux";
import users from "./UsersReducer";
import loader from './LoaderReducer'
import profile from './ProfileReducer'

const RootReducer = combineReducers({
  users,
  loader,
  profile
});

export default RootReducer;
