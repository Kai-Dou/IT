export function AMDIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      <path d="M7 9h2l1.5 4L12 9h2l-2.5 6h-1L7 9z"/>
      <path d="M13 9h2c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2h-2V9zm1.5 1.5V13.5H15c.3 0 .5-.2.5-.5v-2c0-.3-.2-.5-.5-.5h-.5z"/>
    </svg>
  );
}