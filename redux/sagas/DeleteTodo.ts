import { call, put, takeLatest } from 'redux-saga/effects';
import axios from '../axiosConfig';
import { TODO_FAIL, TODO_LOADING } from '../types/ListActionsTypes';

function* deleteTodo(action: any): any {
  yield put({ type: TODO_LOADING });
  try {
    yield call(axios.delete, `/${action.payload}`);
    yield put({ type: 'TODO_LOAD' });
  } catch (e: any) {
    console.error(e);
    yield put({ type: TODO_FAIL, error: e.message });
  }
}

function* deleteTodoSaga(): any {
  yield takeLatest('TODO_DELETE', deleteTodo);
}

export default deleteTodoSaga;
