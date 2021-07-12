import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState, ArrayOfTasks } from '../tasks.service';

export const state = createFeatureSelector<AppState>('tasks');
export const selectTasks = createSelector(state, (state) => state.items);
export const selectLoading = createSelector(state, (state) => state.isLoading);
export const selectMessage = createSelector(
  state,
  (state) => state.alertMessage
);
export const selectScrollLoading = createSelector(
  state,
  (state) => state.scrollLoading
);
export const selectTaskById = (props: { id: number }) =>
  createSelector(state, (state) =>
    state.items.find((el: ArrayOfTasks) => el.id === props.id)
  );
