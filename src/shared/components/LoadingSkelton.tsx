export function LoadingSkeleton() {
  return (
    <ul>
      {Array.from({ length: 3 }).map((_, i) => (
        <li key={i} style={{ opacity: 0.5 }}>
          Loading task...
        </li>
      ))}
    </ul>
  );
}
