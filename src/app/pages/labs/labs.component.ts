import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  imports: [
    CommonModule,
     ReactiveFormsModule
    ],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.scss'
})
export class LabsComponent {

  readonly title = 'Hello my first app in angular 17 and over'
  readonly colorControl = new FormControl('', { nonNullable: true, validators: [Validators.required] })
  readonly withControl = new FormControl('', { nonNullable: true, validators: [Validators.required] })

  readonly name = signal('Cristian')
  readonly age = signal<number>(18)

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
  readonly changeAge = (event:Event) => {
    const inputElement = event.target as HTMLInputElement
    const newValue = inputElement.value;
    this.age.set(Number(newValue))
  }
}
