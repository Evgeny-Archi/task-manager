import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TasksService, ArrayOfTasks } from './tasks.service';
import { setTasksAction, setLoadingAction } from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private tasksFromDB: TasksService,
    private store: Store<ArrayOfTasks>
  ) {}

  ngOnInit(): void {
    // Ставим прелоадер
    this.store.dispatch(setLoadingAction({ payload: true }));
    // Имитируем загрузку с сервера (для демонстрации прелоадера)
    setTimeout(() => {
      this.tasksFromDB.getTasks().subscribe((data) => {
        // Диспатчим в стор список задач
        this.store.dispatch(setTasksAction({ data }));
        // Убираем прелоадер
        this.store.dispatch(setLoadingAction({ payload: false }));
      });
    }, 1000);
  }
}
