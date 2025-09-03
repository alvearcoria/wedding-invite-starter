import type { SVGProps } from 'react';

export function ManSuit(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
        viewBox="0 0 64 64" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        stroke="currentColor"
        strokeWidth="2"
        {...props}
    >
        <path d="M22 13L13 22 22 26 25 13z"/>
        <path d="M25 13l7-8 7 8-3 13-11-4z"/>
        <path d="M32 5l-4 28h18l-4-28z"/>
        <path d="M22 26l-7 27h17l-3-27z"/>
        <path d="M42 26l7 27H32l3-27z"/>
        <path d="M29 53h-5l1-5h4z"/>
        <path d="M35 53h5l-1-5h-4z"/>
        <path d="M25.33 33.33a4 4 0 00-4.66 4.67"/>
        <path d="M38.67 33.33a4 4 0 014.66 4.67"/>
    </svg>
  );
}
