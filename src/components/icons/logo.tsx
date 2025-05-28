import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 20" // Increased viewBox width for longer name
      width="200" // Increased width
      height="20"
      aria-label="Dhriti Erusalagandi Logo"
      className="h-5 w-auto" // Adjusted height, width will scale
      {...props}
    >
      <text
        x="0"
        y="15"
        fontFamily="var(--font-geist-sans), Arial, sans-serif"
        fontSize="16" // Keep font size, or adjust as needed
        fontWeight="bold"
        fill="currentColor" 
      >
        Dhriti Erusalagandi
      </text>
    </svg>
  );
}
