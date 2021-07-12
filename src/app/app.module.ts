import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReactiveFormsModule } from '@angular/forms';

import { CustomRuDatePipe } from './utils/custom.datepipe';
import { CustomSortPipe } from './utils/custom.sortpipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskViewComponent } from './task-view/task-view.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { tasksReducer } from './store/reducer';
import { TaskItemComponent } from './tasks-list/task-item/task-item.component';
import { TaskOptionComponent } from './tasks-list/task-option/task-option.component';
import { ButtonComponent } from './UI/button/button.component';
import { LoaderComponent } from './UI/loader/loader.component';
import { RadioComponent } from './UI/radio/radio.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { CheckboxComponent } from './UI/checkbox/checkbox.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent,
    TasksListComponent,
    CustomRuDatePipe,
    CustomSortPipe,
    TaskItemComponent,
    TaskOptionComponent,
    ButtonComponent,
    LoaderComponent,
    RadioComponent,
    TaskEditComponent,
    CheckboxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ tasks: tasksReducer }),
    HttpClientModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
