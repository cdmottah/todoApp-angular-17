import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-labs',
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.scss'
})
export class LabsComponent {

  readonly title = 'Hello my first app in angular 17 and over'

  readonly name = signal('Cristian')
  readonly tasks = signal([
    'learn angular 17',
    'learn testing for routes',
    'typescript in deep'

  ])

  readonly changeHandler = (event:Event) => {
    const inputElement = event.target as HTMLInputElement
    const newValue = inputElement.value;
    this.name.set(newValue)
  }
}
