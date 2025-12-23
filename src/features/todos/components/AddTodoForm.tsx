import { useState } from 'react';

interface AddTodoFormProps {
  onAddTodo: (title: string) => void;
   isLoading?: boolean;
}

export function AddTodoForm({ onAddTodo,isLoading }: AddTodoFormProps) {
  const [title, setTitle] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTodo(title.trim());
    setTitle('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a task"
      />
      <button type="submit" disabled={isLoading}>
  {isLoading ? 'Adding...' : 'Add'}
</button>

    </form>
  );
}
