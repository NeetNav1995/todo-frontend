import type { Todo } from '../types/todo';

const todos: Todo[] = [];

export async function fetchTodos(): Promise<Todo[]> {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(todos), 500);
  });
}

export async function addTodoApi(todo: Todo): Promise<Todo> {
  return new Promise((resolve) => {
    setTimeout(() => {
      todos.push(todo);
      resolve(todo);
    }, 500);
  });
}

export async function updateTodoStatusApi(id: string, status: Todo['status']): Promise<Todo | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const todo = todos.find((t) => t.id === id);
      if (todo) todo.status = status;
      resolve(todo);
    }, 500);
  });
}
