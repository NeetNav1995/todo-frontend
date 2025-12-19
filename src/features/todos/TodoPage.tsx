import { useState } from 'react';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';
import type { Todo, TodoStatus } from './types/todo';

export function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);

  function handleAddTodo(title: string) {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      status: 'pending',
    };

    setTodos((prev) => [...prev, newTodo]);
  }

  function handleStatusChange(id: string, status: TodoStatus) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, status } : todo
      )
    );
  }

  return (
    <main>
      <h1>TaskFlow</h1>
      <AddTodoForm onAddTodo={handleAddTodo} />
      <TodoList todos={todos} onStatusChange={handleStatusChange} />
    </main>
  );
}
