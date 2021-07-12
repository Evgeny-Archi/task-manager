import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AppState, TasksService } from '../tasks.service';
import {
  selectTasks,
  selectLoading,
  selectScrollLoading,
  selectMessage,
} from '../store/selectors';
import { setTasksAction, setScrollLoadingAction } from '../store/actions';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent {
  // Список задач
  tasks$ = this.store.pipe(select(selectTasks));
  // Прелоадер при первоначальной загрузки
  loading$ = this.store.pipe(select(selectLoading));
  // Прелоадер загрузки при скролле
  scrollLoading$ = this.store.pipe(select(selectScrollLoading));
  // Сообщение о добавлении / удалении таска
  alertMessage$ = this.store.pipe(select(selectMessage));
  sort = 'new';

  constructor(
    private tasksFromDB: TasksService,
    private store: Store<AppState>
  ) {}

  // Подгрузка списка при скролле
  onScroll(): void {
    // Ставим прелоадер
    this.store.dispatch(setScrollLoadingAction({ payload: true }));
    // Имитируем загрузку с сервера
    setTimeout(() => {
      this.tasksFromDB.getTasks().subscribe(
        (data) => {
          // Добавляем загруженный список задач к уже имеющимся
          this.store.dispatch(setTasksAction({ data }));
          // Убираем прелоадер
          this.store.dispatch(setScrollLoadingAction({ payload: false }));
        },
        (error) => {
          this.store.dispatch(setScrollLoadingAction({ payload: false }));
          console.log('error', error);
        }
      );
    }, 1000);
  }

  onSort(event: any): void {
    if (event.target.value !== this.sort) {
      this.sort = event.target.value;
    }
  }
}
