import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Component, computed, effect, Inject, Injector, OnInit, signal } from '@angular/core';
import { task } from '../../models/task.model';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  readonly tasks


  newTaskControl = new FormControl('', { nonNullable: true, validators: [Validators.required] })
  filter = signal<filterState>('all')

  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    switch (filter) {
      case 'pending':
        return tasks.filter(task => !task.completed)
      case 'completed':
        return tasks.filter(task => task.completed)
      case 'all':
      default:
        return tasks
    }

  })

  injector = Inject(Injector)
  constructor(
    private storageService: StorageService
  ) {
    this.tasks = signal<task[]>(this.storageService.getItemOnStorage<task[]>('tasks', []));
    effect(() => {
      const tasks = this.tasks();
      this.storageService.setItemOnStorage(tasks, 'tasks', [])
    })
  }

  ngOnInit(): void {
    // this.trackTasks();
  }

  // trackTasks() {
  //   effect(() => {
  //     const tasks = this.tasks();
  //     this.storageService.setItemOnStorage(tasks, 'tasks', [])
  //   }, { injector: this.injector })
  // }

  changeHandler() {
    if (!this.newTaskControl.valid) return;
    const newTask = this.newTaskControl.value.trim();
    if (newTask != '') {
      this.addTask(newTask)
    }
    this.newTaskControl.reset();
  }

  addTask(title: string) {
    const newTask: task = {
      id: Date.now(),
      title,
      completed: false
    }
    this.tasks.update((tasks) => [...tasks, newTask])
  }

  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index))
  }

  updateTask(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position == index) {
          return {
            ...task,
            completed: !task.completed
          }

        }
        return task
      })
    })
  }
  updateTaskText(index: number, event: Event) {
    const input = event.target as HTMLInputElement
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position == index) {
          return {
            ...task,
            title: input.value,
            editing: false
          }

        }
        return task
      })
    })
  }

  updateTaskEditingMode(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position == index) {
          return {
            ...task,
            editing: true
          }

        }
        return {
          ...task,
          editing: false
        }
      })
    })
  }

  changeFilter(filter: filterState) {
    this.filter.set(filter)
  }
}


export type filterState = 'all' | 'pending' | 'completed';
