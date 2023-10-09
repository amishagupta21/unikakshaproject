import { combineReducers } from 'redux';
import loader from './LoaderReducer';
import auth from './AuthReducer';
import toaster from './ToasterReducer';
import profilePic from './AllProfilePictureReducer';

const RootReducer = combineReducers({
  loader,
  auth,
  toaster,
  profilePic,
});

export default RootReducer;
