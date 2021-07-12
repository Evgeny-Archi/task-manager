import { createAction, props } from '@ngrx/store';
import { ArrayOfTasks } from '../tasks.service';

export const setTasksAction = createAction(
  '[Tasks Component] Set Tasks',
  props<{ data: ArrayOfTasks[] }>()
);

export const setLoadingAction = createAction(
  '[Tasks Component] Set Loading',
  props<{ payload: boolean }>()
);

export const setScrollLoadingAction = createAction(
  '[Tasks Component] Set Loading on Scroll',
  props<{ payload: boolean }>()
);

export const setMessageAction = createAction(
  '[Task Component] Set Message',
  props<{ payload: string }>()
);

export const deleteTaskAction = createAction(
  '[Task View Component] Delete Task',
  props<{ payload: number }>()
);

export const updateTaskAction = createAction(
  '[Task Edit Component] Update Task',
  props<{ payload: ArrayOfTasks }>()
);
