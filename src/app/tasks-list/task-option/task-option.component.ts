import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-option',
  templateUrl: './task-option.component.html',
  styleUrls: ['./task-option.component.scss'],
})
export class TaskOptionComponent {
  @Output() onSort = new EventEmitter<string>();
  priorityArr: string[] = ['Low', 'Normal', 'Hight'];
  tagsArr: string[] = ['Research', 'Design', 'Development'];

  sortHandler(event: any): void {
    this.onSort.emit(event);
  }

  checkHandler(event: MouseEvent): void {}

  addTask() {}
}
