import { combineReducers } from 'redux';
import loader from './LoaderReducer';
import auth from './AuthReducer';
import toaster from './ToasterReducer';

const RootReducer = combineReducers({
  loader,
  auth,
  toaster
});

export default RootReducer;
