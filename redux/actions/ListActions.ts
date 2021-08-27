import { Todo } from '../types/ListActionsTypes';

// get all todos from api
export const GetAllTodos = () => ({
  type: 'TODO_LOAD'
});

// add a new todo via the api
export const PostTodo = (input: string) => ({
  type: 'TODO_POST',
  payload: input
});

// delete a todo from the api
export const DeleteTodo = (id: string) => ({
  type: 'TODO_DELETE',
  payload: id
});

// update existing todo in api
export const UpdateTodo = (todo: Todo) => ({
  type: 'TODO_UPDATE',
  payload: todo
});
