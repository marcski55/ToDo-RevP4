import {
  ListActionsTypes,
  Todo,
  TODO_LOADING,
  TODO_SUCCESS,
  TODO_FAIL
} from '../types/ListActionsTypes';

interface IState {
  loading: boolean;
  list?: Todo[];
}

const defaultState: IState = {
  loading: false
};

const listReducer = (
  state: IState = defaultState,
  action: ListActionsTypes
): IState => {
  switch (action.type) {
    case TODO_FAIL:
      return {
        loading: false
      };
    case TODO_LOADING:
      return {
        loading: true
      };
    case TODO_SUCCESS:
      return {
        loading: false,
        list: action.payload
      };
    default:
      return state;
  }
};

export default listReducer;
