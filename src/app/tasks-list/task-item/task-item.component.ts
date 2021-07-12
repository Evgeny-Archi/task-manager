import { Component, Input } from '@angular/core';
import { ArrayOfTasks } from '../../tasks.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input() task!: ArrayOfTasks;
}
