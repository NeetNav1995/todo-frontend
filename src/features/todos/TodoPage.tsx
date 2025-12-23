// import { useState } from 'react';
// import { AddTodoForm } from './components/AddTodoForm';
// import { TodoList } from './components/TodoList';
// import { TodoFilter } from './components/TodoFilter';
// import type { Todo } from './types/todo';
// import type { TodoFilter as Filter } from './types/filter';

// export function TodosPage() {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [filter, setFilter] = useState<Filter>('all');

//   function handleAddTodo(title: string) {
//     const newTodo: Todo = {
//       id: crypto.randomUUID(),
//       title,
//       status: 'pending',
//     };
//     setTodos((prev) => [...prev, newTodo]);
//   }

//   function handleStatusChange(id: string, status: Todo['status']) {
//     setTodos((prev) =>
//       prev.map((todo) =>
//         todo.id === id ? { ...todo, status } : todo
//       )
//     );
//   }

//   const filteredTodos = todos.filter((todo) => {
//     if (filter === 'all') return true;
//     return todo.status === filter;
//   });

//   return (
//     <main>
//       <h1>TaskFlow</h1>
//       <AddTodoForm onAddTodo={handleAddTodo} />
//       <TodoFilter value={filter} onChange={setFilter} />
//       <TodoList
//         todos={filteredTodos}
//         onStatusChange={handleStatusChange}
//       />
//     </main>
//   );
// }

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import type { Todo } from './types/todo';
import type { TodoFilter as Filter } from './types/filter';
import { fetchTodos, addTodoApi, updateTodoStatusApi } from './api/todosApi';
import { ErrorState } from '../../shared/components/ErrorState';
import { LoadingSkeleton } from '../../shared/components/LoadingSkelton';

export function TodosPage() {
  const [filter, setFilter] = useState<Filter>('all');
  const queryClient = useQueryClient();

  // Fetch todos
  const {
    data: todos = [],
    isLoading,
    isError,
  } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  //   // Add todo mutation
  //   const addTodoMutation = useMutation({
  //     mutationFn: addTodoApi,
  //     onSuccess: () => queryClient.invalidateQueries({queryKey:['todos']}),
  //   });

  //   // Update status mutation
  //   const updateStatusMutation = useMutation({
  //     mutationFn: ({ id, status }: { id: string; status: Todo['status'] }) => updateTodoStatusApi(id, status),
  //     onSuccess: () => queryClient.invalidateQueries({queryKey:['todos']}),
  //   });
  // Add Todo Mutation
  const addTodoMutation = useMutation({
    mutationFn: addTodoApi,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);
      queryClient.setQueryData<Todo[]>(['todos'], (old = []) => [
        ...old,
        newTodo,
      ]);
      return { previousTodos };
    },
    onError: (_err, _newTodo, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  // Update Status Mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: Todo['status'] }) =>
      updateTodoStatusApi(id, status),
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);
      queryClient.setQueryData<Todo[]>(['todos'], (old = []) =>
        old.map((todo) => (todo.id === id ? { ...todo, status } : todo)),
      );
      return { previousTodos };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  function handleAddTodo(title: string) {
    addTodoMutation.mutate({
      id: crypto.randomUUID(),
      title,
      status: 'pending',
    });
  }

  function handleStatusChange(id: string, status: Todo['status']) {
    updateStatusMutation.mutate({ id, status });
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    return todo.status === filter;
  });

  if (isLoading) {
    return (
      <main>
        <h1>TaskFlow</h1>
        <LoadingSkeleton />
      </main>
    );
  }

  if (isError) {
    return (
      <main>
        <h1>TaskFlow</h1>
        <ErrorState
          message="Failed to load tasks."
          onRetry={() => queryClient.invalidateQueries({ queryKey: ['todos'] })}
        />
      </main>
    );
  }
  return (
    <main>
      <h1>TaskFlow</h1>
      <AddTodoForm
        onAddTodo={handleAddTodo}
        isLoading={addTodoMutation.isPending}
      />
      <TodoFilter value={filter} onChange={setFilter} />
      <TodoList todos={filteredTodos} onStatusChange={handleStatusChange} />
    </main>
  );
}
