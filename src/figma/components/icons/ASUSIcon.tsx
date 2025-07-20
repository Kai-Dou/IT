export function ASUSIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#000000"/>
      <path d="M6.5 8h3l1 2h-1.5l-.5-1H7l-1 2h1.5l.5 1H6.5l-1.5-4z" fill="white"/>
      <path d="M9.5 10h2c.55 0 1 .45 1 1s-.45 1-1 1h-1v1h-1v-3zm1 1.5h.5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-.5v1z" fill="white"/>
      <path d="M13.5 10h2c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1h-2v-3zm1 1.5h.5c.28 0 .5-.22.5-.5v-.5c0-.28-.22-.5-.5-.5h-.5v1.5z" fill="white"/>
      <path d="M17 10h1.5v1h-1v.5h1v1h-1.5v-2.5z" fill="white"/>
    </svg>
  );
}