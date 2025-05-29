
import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 20" // Adjusted viewBox width for "Dhriti Erusalagandi"
      width="200" // Adjusted width for "Dhriti Erusalagandi"
      height="20"
      aria-label="Dhriti Erusalagandi Logo"
      className="h-5 w-auto" // Height is fixed, width will scale based on viewBox
      {...props}
    >
      <text
        x="0"
        y="16" // Adjusted y for better vertical alignment with larger font
        fontFamily="var(--font-geist-sans), sans-serif" // Changed font to Geist Sans
        fontSize="20"  // Increased font size
        fontWeight="normal" // Changed from "bold" to "normal"
        fill="currentColor"
      >
        Dhriti Erusalagandi
      </text>
    </svg>
  );
}
