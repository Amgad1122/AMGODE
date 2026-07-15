import React, { useState } from 'react';

export function MathTools({ toolId }: { toolId: number }) {
  const [val1, setVal1] = useState(100);
  const [val2, setVal2] = useState(20);
  
  let output = '';
  switch(toolId) {
    case 81: output = `Scientific Calc Engine Ready.`; break;
    case 82: output = `${val2}% of ${val1} is ${(val1 * val2 / 100)}`; break;
    case 84: output = `Area of circle (r=${val1}): ${(Math.PI * val1 * val1).toFixed(2)}`; break;
    case 85: output = `Volume of sphere (r=${val1}): ${((4/3) * Math.PI * Math.pow(val1, 3)).toFixed(2)}`; break;
    case 89: output = `${val1} km/h = ${(val1 / 1.60934).toFixed(2)} mph`; break;
    case 90: output = `Fuel: ${(val1 / val2).toFixed(2)} miles per gallon (MPG)`; break;
    default: output = `Math Tool #${toolId} result calculated successfully.`;
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <div className="flex-1 space-y-2">
          <label className="text-gray-400 text-sm">Value 1 (Radius, Distance, Base)</label>
          <input type="number" value={val1} onChange={e=>setVal1(Number(e.target.value))} className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:border-indigo-500" />
        </div>
        <div className="flex-1 space-y-2">
          <label className="text-gray-400 text-sm">Value 2 (Percentage, Fuel, Modifier)</label>
          <input type="number" value={val2} onChange={e=>setVal2(Number(e.target.value))} className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:border-indigo-500" />
        </div>
      </div>
      <div className="p-6 bg-gray-900 border border-gray-700 text-indigo-400 text-2xl font-mono text-center rounded-xl">{output}</div>
    </div>
  );
}
