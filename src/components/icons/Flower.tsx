import type { SVGProps } from 'react';

export function Flower(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
        <path d="M12 5.5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0ZM12 5.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Z"/>
        <path d="M18.5 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM18.5 12a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"/>
        <path d="M12 18.5a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0ZM12 18.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
        <path d="M5.5 12a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM5.5 12a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"/>
    </svg>
  );
}
