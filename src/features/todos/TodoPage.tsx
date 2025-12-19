import { useState } from 'react';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';
import type { Todo } from './types/todo'; //It improves tree-shaking, avoids accidental runtime imports, and is required when using verbatimModuleSyntax for predictable module output.

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

  return (
    <main>
      <h1>TaskFlow</h1>
      <AddTodoForm onAddTodo={handleAddTodo} />
      <TodoList todos={todos} />
    </main>
  );
}
