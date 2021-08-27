import { call, put, takeLatest } from 'redux-saga/effects';
import axios from '../axiosConfig';
import { TODO_FAIL, TODO_LOADING } from '../types/ListActionsTypes';

function* postTodo(action: any): any {
  yield put({ type: TODO_LOADING });
  try {
    yield call(axios.post, '/', { text: action.payload });
    yield put({ type: 'TODO_LOAD' });
  } catch (e: any) {
    console.error(e);
    yield put({ type: TODO_FAIL, error: e.message });
  }
}

function* postTodoSaga(): any {
  yield takeLatest('TODO_POST', postTodo);
}

export default postTodoSaga;
