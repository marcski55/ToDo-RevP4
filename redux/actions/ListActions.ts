import axios from '../axiosConfig';
import { Dispatch } from 'redux';
import {
  ListActionsTypes,
  Todo,
  TODO_FAIL,
  TODO_LOADING,
  TODO_SUCCESS
} from '../types/ListActionsTypes';

// get all todos from api
export const GetAllTodos =
  () => async (dispatch: Dispatch<ListActionsTypes>) => {
    try {
      dispatch({
        type: TODO_LOADING
      });
      const res = await axios.get('/');
      dispatch({
        type: TODO_SUCCESS,
        payload: res.data
      });
    } catch (e) {
      dispatch({
        type: TODO_FAIL
      });
    }
  };

// add a new todo via the api
export const PostTodo =
  (input: string) => async (dispatch: Dispatch<ListActionsTypes>) => {
    try {
      dispatch({
        type: TODO_LOADING
      });
      await axios.post('/', { text: input });
      const res = await axios.get('/');
      dispatch({
        type: TODO_SUCCESS,
        payload: res.data
      });
      return `Item added. Let's get to it!`;
    } catch (e) {
      return 'Item could not be added. Please try again.';
    }
  };

// delete a todo from the api
export const DeleteTodo =
  (id: string) => async (dispatch: Dispatch<ListActionsTypes>) => {
    try {
      dispatch({
        type: TODO_LOADING
      });
      await axios.delete(`/${id}`);
      const res = await axios.get('/');
      dispatch({
        type: TODO_SUCCESS,
        payload: res.data
      });
      return 'Item was deleted.';
    } catch (e) {
      return 'Item could not be deleted.';
    }
  };

// update existing todo in api
export const UpdateTodo =
  (todo: Todo) => async (dispatch: Dispatch<ListActionsTypes>) => {
    try {
      dispatch({
        type: TODO_LOADING
      });
      await axios.put(`/${todo.id}`, {
        text: todo.text,
        checked: todo.checked
      });
      const res = await axios.get('/');
      dispatch({
        type: TODO_SUCCESS,
        payload: res.data
      });
      return 'Successfully updated. You got this.';
    } catch (e) {
      return 'Item could not be updated.';
    }
  };
