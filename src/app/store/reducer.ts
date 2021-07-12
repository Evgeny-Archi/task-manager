import { createReducer, on } from '@ngrx/store';
import {
  setTasksAction,
  setLoadingAction,
  setScrollLoadingAction,
  deleteTaskAction,
  setMessageAction,
  updateTaskAction,
} from './actions';
import { AppState } from '../tasks.service';

const initialState: AppState = {
  items: [],
  isLoading: false,
  scrollLoading: false,
  alertMessage: '',
};

const _tasksReducer = createReducer(
  initialState,
  on(setTasksAction, (state, { data }) => ({
    ...state,
    items: [...state.items, ...data],
  })),
  on(setLoadingAction, (state, { payload }) => ({
    ...state,
    isLoading: payload,
  })),
  on(setScrollLoadingAction, (state, { payload }) => ({
    ...state,
    scrollLoading: payload,
  })),
  on(setMessageAction, (state, { payload }) => ({
    ...state,
    alertMessage: payload,
  })),
  on(deleteTaskAction, (state, { payload }) => ({
    ...state,
    items: state.items.filter((item) => item.id !== payload),
  })),
  on(updateTaskAction, (state, { payload }) => {
    return {
      ...state,
      items: state.items.map((item: any) => {
        if (item.id === payload.id) {
          return payload;
        }
        return item;
      }),
    };
  })
);

export function tasksReducer(state: AppState | undefined, action: any) {
  return _tasksReducer(state, action);
}
