export function IntelIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
      <path d="M8.5 9h1.5v6H8.5z"/>
      <path d="M10.5 9h1v1.5h1V9h1.5v6H13v-2.5h-1V15h-1.5z"/>
      <path d="M14.5 9H16v1.5h1V9h1.5v6H17v-2.5h-1V15h-1.5z"/>
    </svg>
  );
}