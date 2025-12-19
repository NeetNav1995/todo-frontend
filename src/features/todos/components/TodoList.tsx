// import type { Todo } from "../types/todo";

// interface TodoListProps {
//   todos: Todo[];
// }

// export function TodoList({ todos }: TodoListProps) {
//   if (todos.length === 0) {
//     return <p>No tasks yet</p>;
//   }

//   return (
//     <ul>
//       {todos.map((todo) => (
//         <li key={todo.id}>{todo.title}</li>
//       ))}
//     </ul>
//   );
// }

import type { Todo, TodoStatus } from '../types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onStatusChange: (id: string, status: TodoStatus) => void;
}

export function TodoList({ todos, onStatusChange }: TodoListProps) {
  if (todos.length === 0) {
    return <p>No tasks yet</p>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onStatusChange={onStatusChange}
        />
      ))}
    </ul>
  );
}

