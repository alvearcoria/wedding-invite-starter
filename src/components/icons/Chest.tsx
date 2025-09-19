
import type { SVGProps } from 'react';

export function Chest(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        strokeWidth="1.5"
        stroke="currentColor"
        {...props}
    >
        <path d="M4 8H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V8Z" />
        <path d="M4 8L5.71429 5H18.2857L20 8" />
        <path d="M10 4V5H14V4" />
        <path d="M12 12V14" />
    </svg>
  );
}
