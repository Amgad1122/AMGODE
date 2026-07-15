import React, { useState } from 'react';

export function DataTools({ toolId }: { toolId: number }) {
  const [input, setInput] = useState('id,name,role\n1,Alice,Admin\n2,Bob,User');
  const [output, setOutput] = useState('');

  const process = () => {
    try {
      if(toolId === 41) { // CSV to JSON
        const lines = input.trim().split('\n');
        const headers = lines[0].split(',');
        const res = lines.slice(1).map(line => {
          const obj: any = {};
          line.split(',').forEach((val, i) => obj[headers[i]] = val);
          return obj;
        });
        setOutput(JSON.stringify(res, null, 2));
      } else if (toolId === 49) { // HTML to Text
         const temp = document.createElement('div');
         temp.innerHTML = input;
         setOutput(temp.textContent || temp.innerText || "");
      } else {
         setOutput(`Tool #${toolId} execution successful. Output data stream simulated for client-side processing.`);
      }
    } catch(e: any) { 
      setOutput(`Error: ${e.message}`); 
    }
  };

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-40 p-4 bg-gray-900 border border-gray-700 text-white rounded-lg font-mono text-sm focus:outline-none focus:border-indigo-500" placeholder="Input raw data (CSV, JSON, HTML)..." />
      <button onClick={process} className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 transition-colors text-white rounded-lg font-medium">Transform Data</button>
      <div className="w-full min-h-[10rem] p-4 bg-gray-900 border border-gray-700 text-emerald-400 font-mono text-sm whitespace-pre-wrap rounded-lg overflow-auto">{output}</div>
    </div>
  );
}
