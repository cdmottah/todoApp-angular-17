import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { task } from '../../models/task.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  readonly tasks = signal<task[]>([
    {
      id: Date.now(),
      title: 'learn angular 17',
      completed: false
    },
    {
      id: Date.now(),
      title: 'typescript in deep',
      completed: false
    },
    {
      id: Date.now(),
      title: 'learn testing for routes',
      completed: false
    }
  ])

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.addTask(newTask)
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
}
