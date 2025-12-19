import type { Todo } from "../types/todo";

interface TodoListProps {
  todos: Todo[];
}

export function TodoList({ todos }: TodoListProps) {
  if (todos.length === 0) {
    return <p>No tasks yet</p>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
