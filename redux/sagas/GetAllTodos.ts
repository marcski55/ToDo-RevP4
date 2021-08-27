import { call, put, takeLatest } from 'redux-saga/effects';
import axios from '../axiosConfig';
import {
  TODO_FAIL,
  TODO_LOADING,
  TODO_SUCCESS
} from '../types/ListActionsTypes';

function* loadTodos(): any {
  yield put({ type: TODO_LOADING });
  try {
    const response = yield call(axios.get, '/');
    yield put({ type: TODO_SUCCESS, payload: response.data });
  } catch (e: any) {
    console.error(e);
    yield put({ type: TODO_FAIL, error: e.message });
  }
}

function* loadTodosSaga(): any {
  yield takeLatest('TODO_LOAD', loadTodos);
}

export default loadTodosSaga;
