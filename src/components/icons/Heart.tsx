import type { SVGProps } from 'react';

export function Heart(props: SVGProps<SVGSVGElement>) {
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
      <path d="M19.5 12.572c-1.83-2.064-3.414-3.936-4.996-5.22C13.38 6.41 12.75 6 12 6s-1.38.41-2.504 1.352c-1.582 1.284-3.166 3.156-4.996 5.22-2.126 2.4-2.82 4.404-2.43 6.012.388 1.608 1.836 2.816 3.48 2.816h11.898c1.644 0 3.092-1.208 3.48-2.816.39-1.608-.304-3.612-2.428-6.012z" />
    </svg>
  );
}
