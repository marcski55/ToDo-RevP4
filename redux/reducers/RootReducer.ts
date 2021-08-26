import { combineReducers } from 'redux';
import listReducer from './ListReducer';

const RootReducer = combineReducers({
  list: listReducer
});

export default RootReducer;
