export function LenovoIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#E2231A"/>
      <path d="M7 8h1.5v6.5H10V16H7V8z" fill="white"/>
      <path d="M10.5 8h4v1.5h-2.25V10h2V11.5h-2V14h2.25V16h-4V8z" fill="white"/>
      <path d="M15 8h1.5v4.5L18 8h1.5l-1.5 4.5V16H17v-3.5L15.5 16H15V8z" fill="white"/>
    </svg>
  );
}