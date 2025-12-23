// import type { Todo } from '../types/todo';

// const todos: Todo[] = [];

// export async function fetchTodos(): Promise<Todo[]> {
//   // Simulate API delay
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(todos), 500);
//   });
// }

// export async function addTodoApi(todo: Todo): Promise<Todo> {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       todos.push(todo);
//       resolve(todo);
//     }, 500);
//   });
// }

// export async function updateTodoStatusApi(id: string, status: Todo['status']): Promise<Todo | undefined> {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const todo = todos.find((t) => t.id === id);
//       if (todo) todo.status = status;
//       resolve(todo);
//     }, 500);
//   });
// }
import type { Todo } from '../types/todo';

const BASE_URL = 'http://localhost:4000/todos';

export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json();
}

export async function addTodoApi(todo: Todo): Promise<Todo> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  if (!res.ok) throw new Error('Failed to add todo');
  return res.json();
}

export async function updateTodoStatusApi(id: string, status: Todo['status']): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update todo');
  return res.json();
}
