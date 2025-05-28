
import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 20" // Adjusted viewBox width for "Dhriti"
      width="100" // Adjusted width for "Dhriti"
      height="20"
      aria-label="Dhriti Logo"
      className="h-5 w-auto" // Height is fixed, width will scale based on viewBox
      {...props}
    >
      <text
        x="0"
        y="16" // Adjusted y for better vertical alignment with larger font
        fontFamily="var(--font-geist-sans), Arial, sans-serif"
        fontSize="20"  // Increased font size
        fontWeight="bold"
        fill="currentColor"
      >
        Dhriti
      </text>
    </svg>
  );
}
