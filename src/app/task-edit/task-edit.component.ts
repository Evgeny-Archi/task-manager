import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from '../tasks.service';
import { selectTaskById, selectTasks } from '../store/selectors';
import { updateTaskAction, setMessageAction } from '../store/actions';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
})
export class TaskEditComponent implements OnInit {
  private taskId: number | undefined;
  public task$: Observable<any> | undefined;
  public options: String[] = ['hight', 'normal', 'low'];
  public tags: any;

  taskForm = new FormGroup({
    title: new FormControl(''),
    priority: new FormControl(''),
    tag: new FormControl([]),
    description: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.taskId = Number(routeParams.get('taskId'));
    this.task$ = this.store.select(selectTaskById({ id: this.taskId }));
    // Устанавливаем в элементы формы значения из таски
    this.store.select(selectTaskById({ id: this.taskId })).subscribe((item) => {
      this.taskForm.get('title')?.setValue(item?.title);
      this.taskForm.get('priority')?.setValue(item?.priority);
      this.taskForm.get('tag')?.setValue(item?.tag);
      this.taskForm.get('description')?.setValue(item?.description);
    });
    // Получаем все возможные отметки из стейта
    this.store.select(selectTasks).subscribe((task) => {
      this.tags = this.getAllTags(task);
    });
  }

  // Перебираем стейт и получаем все возможные отметки. На случай их увеличения
  getAllTags(state: any): any[] {
    if (state.length) {
      const set = new Set();

      for (let i = 0; i < state.length; i++) {
        state[i].tag.forEach((item: string) => set.add(item));
      }

      return Array.from(set);
    } else {
      // Возвращаем значение по умолчанию
      return ['research', 'design', 'development'];
    }
  }

  // Выбираем опции у селекта отметок, которые есть у задачи
  isSelected(task: any, tag: string): boolean {
    return task.tag.find((item: string) => item === tag);
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    // Берем данные из формы, добавляем id и дату
    const data = { ...this.taskForm.value };
    data.id = this.taskId;
    data.createDate = Date.now();
    // Диспатчим измененную задачу в стор
    this.store.dispatch(updateTaskAction({ payload: data }));
    // Выводим сообщение об успешном изменении
    this.store.dispatch(
      setMessageAction({
        payload:
          'Задача "' +
          data.title +
          '" успешно изменена. Возможна ошибка в дате создания - править в custom.datepipe.ts (зафиксировано Date.now())',
      })
    );
    // Редиректим на главную страницу
    this.router.navigate(['/']);
  }
}
