import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 20" // Adjusted viewBox width for shorter name
      width="80" // Adjusted width
      height="20"
      aria-label="Dhriti Logo"
      className="h-5 w-auto" // Adjusted height, width will scale
      {...props}
    >
      <text
        x="0"
        y="15"
        fontFamily="var(--font-geist-sans), Arial, sans-serif"
        fontSize="16" 
        fontWeight="bold"
        fill="currentColor" 
      >
        Dhriti
      </text>
    </svg>
  );
}
