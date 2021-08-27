import { call, put, takeLatest } from 'redux-saga/effects';
import axios from '../axiosConfig';
import { TODO_FAIL, TODO_LOADING } from '../types/ListActionsTypes';

function* updateTodo(action: any): any {
  yield put({ type: TODO_LOADING });
  try {
    yield call(axios.put, `/${action.payload.id}`, {
      text: action.payload.text,
      checked: action.payload.checked
    });
    yield put({ type: 'TODO_LOAD' });
  } catch (e: any) {
    console.error(e);
    yield put({ type: TODO_FAIL, error: e.message });
  }
}

function* updateTodoSaga(): any {
  yield takeLatest('TODO_UPDATE', updateTodo);
}

export default updateTodoSaga;
