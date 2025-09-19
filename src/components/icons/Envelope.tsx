
import type { SVGProps } from 'react';

export function Envelope(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        strokeWidth="1.5"
        stroke="currentColor"
        {...props}
    >
        <path d="M4 7L10.94 12.3333C11.5867 12.8222 12.4133 12.8222 13.06 12.3333L20 7H4Z" />
        <path d="M3 18V6C3 5.44772 3.44772 5 4 5H20C20.5523 5 21 5.44772 21 6V18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18Z" />
        <path d="M10.5 12L4.5 17.5" />
        <path d="M13.5 12L19.5 17.5" />
    </svg>
  );
}
