import type { SVGProps } from 'react';

export function WomanDress(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M22 6l-6 10h32l-6-10z" />
      <path d="M16 16h32v8H16z" />
      <path d="M20 24l-4 34h36l-4-34" />
      <path d="M32 24v34" />
      <path d="M26 24s-2 34-4 34" />
      <path d="M38 24s2 34 4 34" />
    </svg>
  );
}
