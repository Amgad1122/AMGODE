import React from 'react';

interface AdUnitProps {
  options: {
    key: string;
    format: string;
    height: number;
    width: number;
    params: any;
  };
  invokeUrl?: string;
  className?: string;
}

export function AdUnit({ options, className = "" }: AdUnitProps) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div 
        id={`ad-container-${options.key}`}
        style={{ width: options.width, height: options.height, minWidth: options.width, minHeight: options.height }} 
        className="flex items-center justify-center overflow-hidden bg-gray-900/20 rounded"
      >
      </div>
    </div>
  );
}

export function ContainerAd({ className = "" }: { className?: string }) {
  return (
    <div className={`flex justify-center items-center w-full overflow-hidden ${className}`}>
      <div id="container-5e7a36afe05855d3c1f48201e692297b" className="w-full"></div>
    </div>
  );
}
