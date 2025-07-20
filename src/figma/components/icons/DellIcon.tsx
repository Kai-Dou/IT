export function DellIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#007DB8"/>
      <path d="M8.5 8h2.5c1.38 0 2.5 1.12 2.5 2.5v3c0 1.38-1.12 2.5-2.5 2.5H8.5V8zm1.5 1.5v4.5h1c.55 0 1-.45 1-1v-2.5c0-.55-.45-1-1-1h-1z" fill="white"/>
      <path d="M14.5 8H16v8h-1.5V8z" fill="white"/>
      <path d="M7 8h1.5v8H7V8z" fill="white"/>
    </svg>
  );
}