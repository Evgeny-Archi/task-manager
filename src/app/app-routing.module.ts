import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskViewComponent } from './task-view/task-view.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TaskEditComponent } from './task-edit/task-edit.component';

const routes: Routes = [
  { path: '', component: TasksListComponent },
  { path: 'tasks/:taskId', component: TaskViewComponent },
  { path: 'edit/:taskId', component: TaskEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
