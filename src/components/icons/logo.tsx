
import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 220 22" // Adjusted viewBox for larger font
      width="220" // Adjusted width for larger font
      height="22" // Adjusted height for larger font
      aria-label="Dhriti Erusalagandi Logo"
      className="h-5 w-auto" // Height is fixed, width will scale based on viewBox
      {...props}
    >
      <text
        x="0"
        y="17" // Adjusted y for better vertical alignment with larger font
        fontFamily="var(--font-geist-sans), sans-serif"
        fontSize="22"  // Increased font size
        fontWeight="normal"
        fill="currentColor"
      >
        Dhriti Erusalagandi
      </text>
    </svg>
  );
}
