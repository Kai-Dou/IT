export function HPIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#0096D6"/>
      <path d="M7 8h1.5v3H10V8h1.5v8H10v-3.5H8.5V16H7V8z" fill="white"/>
      <path d="M13 8h2.5c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2H13V8zm1.5 1.5V12.5h1c.3 0 .5-.2.5-.5v-2c0-.3-.2-.5-.5-.5h-1z" fill="white"/>
    </svg>
  );
}