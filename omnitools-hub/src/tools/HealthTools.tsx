import React, { useState } from 'react';

export function HealthTools({ toolId }: { toolId: number }) {
  const [val1, setVal1] = useState(70); // weight
  const [val2, setVal2] = useState(175); // height
  const [val3, setVal3] = useState(25); // age

  let output = '';
  switch(toolId) {
    case 51: { // BMI
      const bmi = val1 / Math.pow(val2/100, 2);
      let cat = 'Normal weight';
      if(bmi < 18.5) cat = 'Underweight';
      if(bmi > 25) cat = 'Overweight';
      output = `BMI: ${bmi.toFixed(2)}\nCategory: ${cat}`; break;
    }
    case 52: { // BMR 
      const bmr = 10 * val1 + 6.25 * val2 - 5 * val3 + 5; 
      output = `BMR (Basal Metabolic Rate): ${bmr} kcal/day\nTDEE (Maintenance): ${(bmr * 1.2).toFixed(0)} kcal/day`; break;
    }
    case 53: output = `Estimated Body Fat: ${(1.2 * (val1 / Math.pow(val2/100, 2)) + 0.23 * val3 - 16.2).toFixed(2)}%`; break;
    case 54: output = `Daily Water Intake Target:\n${(val1 * 35).toFixed(0)} ml (${(val1 * 35 / 1000).toFixed(1)} Liters)`; break;
    case 58: output = `${val1} kg = ${(val1 * 2.20462).toFixed(2)} lbs\n${val1} lbs = ${(val1 / 2.20462).toFixed(2)} kg`; break;
    case 59: output = `${val2} cm = ${(val2 / 2.54).toFixed(2)} inches\n${(val2/30.48).toFixed(2)} feet`; break;
    case 60: output = `Pace for 5km in ${val1} mins:\n${(val1/5).toFixed(2)} min/km`; break;
    default: output = "Health metric algorithm active.\nData output simulated.";
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Weight (kg) / Variable 1</label>
          <input type="number" value={val1} onChange={e=>setVal1(Number(e.target.value))} className="w-full p-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-indigo-500" />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Height (cm) / Variable 2</label>
          <input type="number" value={val2} onChange={e=>setVal2(Number(e.target.value))} className="w-full p-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-indigo-500" />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Age / Variable 3</label>
          <input type="number" value={val3} onChange={e=>setVal3(Number(e.target.value))} className="w-full p-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-indigo-500" />
        </div>
      </div>
      <div className="p-6 bg-gray-900 border border-gray-700 text-emerald-400 font-mono text-xl whitespace-pre-wrap rounded-xl text-center leading-relaxed">{output}</div>
    </div>
  );
}
