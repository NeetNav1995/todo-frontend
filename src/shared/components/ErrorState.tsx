interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export function ErrorState({
  message = 'Something went wrong.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div>
      <p>{message}</p>
      <button onClick={onRetry}>Retry</button>
    </div>
  );
}
