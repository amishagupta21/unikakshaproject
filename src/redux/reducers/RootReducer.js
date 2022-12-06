import { combineReducers } from 'redux';
import loader from './LoaderReducer';
import auth from './AuthReducer';

const RootReducer = combineReducers({
  loader,
  auth,
});

export default RootReducer;
