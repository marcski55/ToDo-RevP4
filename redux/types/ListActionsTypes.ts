export const TODO_LOADING = 'TODO_LOADING';
export const TODO_FAIL = 'TODO_FAIL';
export const TODO_SUCCESS = 'TODO_SUCCESS';

export type Todo = {
  text: string;
  id: string;
  checked: boolean;
  updatedAt: string;
  createdAt: string;
};

export interface ListLoading {
  type: typeof TODO_LOADING;
}

export interface ListFail {
  type: typeof TODO_FAIL;
}

export interface ListSuccess {
  type: typeof TODO_SUCCESS;
  payload: Todo[];
}

export type ListActionsTypes = ListLoading | ListFail | ListSuccess;
