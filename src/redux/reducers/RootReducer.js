import { combineReducers } from 'redux';
import loader from './LoaderReducer';

const RootReducer = combineReducers({
  loader,
});

export default RootReducer;
