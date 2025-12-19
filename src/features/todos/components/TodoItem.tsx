import type { Todo, TodoStatus } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onStatusChange: (id: string, status: TodoStatus) => void;
}

export function TodoItem({ todo, onStatusChange }: TodoItemProps) {
  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    onStatusChange(todo.id, e.target.value as TodoStatus);
  }

  return (
    <li>
      <span>{todo.title}</span>
      <select value={todo.status} onChange={handleStatusChange}>
        <option value="pending">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Done</option>
      </select>
    </li>
  );
}
