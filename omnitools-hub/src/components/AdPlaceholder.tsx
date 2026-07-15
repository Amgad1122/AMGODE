import React, { useState } from 'react';

export function AdPlaceholder({ width, height, className = "" }: { width: number, height: number, className?: string }) {
  return (
    <div 
      className={`flex flex-col items-center justify-center bg-gray-800 border border-gray-700 rounded text-gray-500 text-sm overflow-hidden ${className}`}
      style={{ width: width === 0 ? '100%' : `${width}px`, height: `${height}px`, maxWidth: '100%' }}
    >
      <span className="mb-1 text-xs uppercase tracking-widest text-gray-600">Advertisement</span>
      <span className="font-mono">{width === 0 ? 'Responsive' : width}x{height}</span>
    </div>
  );
}
