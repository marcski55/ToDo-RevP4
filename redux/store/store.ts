import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import RootReducer from '../reducers/RootReducer';
import loadTodosSaga from '../sagas/GetAllTodos';
import postTodoSaga from '../sagas/PostTodo';
import deleteTodoSaga from '../sagas/DeleteTodo';
import updateTodoSaga from '../sagas/UpdateTodo';

const sagaMiddleware = createSagaMiddleware();

export const Store = createStore(RootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(loadTodosSaga);
sagaMiddleware.run(postTodoSaga);
sagaMiddleware.run(deleteTodoSaga);
sagaMiddleware.run(updateTodoSaga);

export type RootStore = ReturnType<typeof RootReducer>;
