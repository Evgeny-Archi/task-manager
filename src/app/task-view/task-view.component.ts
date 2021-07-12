import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { selectTaskById } from '../store/selectors';
import { AppState } from '../tasks.service';
import { setMessageAction, deleteTaskAction } from '../store/actions';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
  private taskId: number | undefined;
  public task$: Observable<any> | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.taskId = Number(routeParams.get('taskId'));
    this.task$ = this.store.select(selectTaskById({ id: this.taskId }));
  }

  goBack(): void {
    // Кнопка назад
    this.router.navigate(['/']);
  }

  goEdit(): void {
    // Кнопка редактировать
    this.router.navigate(['edit', this.taskId]);
  }

  deleteHandler(title: string): void {
    // Удаляем нужный таск
    this.store.dispatch(deleteTaskAction({ payload: Number(this.taskId) }));
    // Выводим сообщение об успешном удалении
    this.store.dispatch(
      setMessageAction({ payload: title + ' была успешно удалена' })
    );
    this.goBack();
  }
}
