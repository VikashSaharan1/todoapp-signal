import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { signal, computed, effect } from '@angular/core';
import { Todo } from './interfaces/todo';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Todo App';
  count = signal(0);
  todos = signal<Todo[]>([]);
  newTodoText = signal<string>('');

  total = computed(() => this.todos().length);

  constructor() {
    effect(() => {
      const items = this.todos().length;
      const even = items % 2 == 0;
      console.log(`items are: ${even ? 'Even' : 'odd'}`);
      // we can use it to call apis
    });
  }

  ngOnInit() {
    console.log(this.count());
  }

  handleInput(event: Event): void {
    const input = event?.target as HTMLInputElement;
    this.newTodoText.set(input?.value);
  }

  addTodo(): void {
    if (this.newTodoText().trim().length) {
      const newTodo: Todo = {
        id: Date.now(),
        text: this.newTodoText(),
        done: false,
      };

      this.todos.set([...this.todos(), newTodo]);
      this.newTodoText.set('');
      console.log(this.todos());
    }
  }

  deleteTodo(id: number): void {
    const updateTodos = this.todos().filter((item) => item.id !== id);
    this.todos.set(updateTodos);
  }
}
