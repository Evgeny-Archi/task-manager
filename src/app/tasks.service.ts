import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ArrayOfTasks {
  id: number;
  title: string;
  createDate: string | number;
  priority: string;
  tag: string[];
  description?: string;
}

export interface AppState {
  items: ArrayOfTasks[];
  isLoading: boolean;
  scrollLoading: boolean;
  alertMessage: string;
}

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<ArrayOfTasks[]>('/assets/tasks.json');
  }
}
