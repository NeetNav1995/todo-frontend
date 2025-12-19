import { useState } from 'react';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import type { Todo } from './types/todo';
import type { TodoFilter as Filter } from './types/filter';

export function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  function handleAddTodo(title: string) {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      status: 'pending',
    };
    setTodos((prev) => [...prev, newTodo]);
  }

  function handleStatusChange(id: string, status: Todo['status']) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, status } : todo
      )
    );
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    return todo.status === filter;
  });

  return (
    <main>
      <h1>TaskFlow</h1>
      <AddTodoForm onAddTodo={handleAddTodo} />
      <TodoFilter value={filter} onChange={setFilter} />
      <TodoList
        todos={filteredTodos}
        onStatusChange={handleStatusChange}
      />
    </main>
  );
}
