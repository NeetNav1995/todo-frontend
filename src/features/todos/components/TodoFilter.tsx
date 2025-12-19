import type { TodoFilter } from '../types/filter';

interface TodoFilterProps {
  value: TodoFilter;
  onChange: (filter: TodoFilter) => void;
}

export function TodoFilter({ value, onChange }: TodoFilterProps) {
  return (
    <div>
      <button
        onClick={() => onChange('all')}
        disabled={value === 'all'}
      >
        All
      </button>
      <button
        onClick={() => onChange('pending')}
        disabled={value === 'pending'}
      >
        Todo
      </button>
      <button
        onClick={() => onChange('in-progress')}
        disabled={value === 'in-progress'}
      >
        In Progress
      </button>
      <button
        onClick={() => onChange('completed')}
        disabled={value === 'completed'}
      >
        Done
      </button>
    </div>
  );
}
