
"use client";

import { useEffect, useState } from "react";

// NOTE: This component renders a visual placeholder for a QR code.
// For a scannable QR code, a proper generation library would be needed.
// This approach avoids adding a new dependency for a visual element.

const generateQrMatrix = (value: string) => {
  const seed = value.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const matrix: (0 | 1)[][] = [];
  const size = 21; // Standard QR code size

  for (let i = 0; i < size; i++) {
    matrix[i] = [];
    for (let j = 0; j < size; j++) {
      // Basic psuedo-random generation for visual effect
      const pseudoRandom = Math.sin(seed + i * size + j) * 10000;
      matrix[i][j] = (pseudoRandom - Math.floor(pseudoRandom)) > 0.5 ? 1 : 0;
    }
  }

  // Add position markers for a more authentic look
  const addMarker = (x: number, y: number) => {
    for (let i = -3; i <= 3; i++) {
      for (let j = -3; j <= 3; j++) {
        if (x + i >= 0 && x + i < size && y + j >= 0 && y + j < size) {
          const isBorder = Math.abs(i) === 3 || Math.abs(j) === 3;
          const isInner = Math.abs(i) <= 1 && Math.abs(j) <= 1;
          matrix[y + j][x + i] = isBorder || isInner ? 1 : 0;
        }
      }
    }
  };
  addMarker(3, 3);
  addMarker(size - 4, 3);
  addMarker(3, size - 4);

  return matrix;
};

const QrCode = ({ value }: { value: string }) => {
  const [matrix, setMatrix] = useState< (0|1)[][] | null>(null);

  useEffect(() => {
    setMatrix(generateQrMatrix(value));
  }, [value]);

  if (!matrix) {
    return <div className="h-40 w-40 animate-pulse rounded-md bg-muted" />;
  }
  
  const size = 160;
  const cellSize = size / matrix.length;
  const gap = cellSize * 0.1; // Small gap between cells

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="rounded-md">
      <rect width={size} height={size} fill="transparent" />
      {matrix.map((row, y) =>
        row.map((cell, x) =>
          cell === 1 ? (
            <rect
              key={`${x}-${y}`}
              x={x * cellSize + gap / 2}
              y={y * cellSize + gap / 2}
              width={cellSize - gap}
              height={cellSize - gap}
              rx={cellSize * 0.25}
              ry={cellSize * 0.25}
            />
          ) : null
        )
      )}
    </svg>
  );
};

export default QrCode;
