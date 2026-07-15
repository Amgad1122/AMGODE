import React, { useState } from 'react';

export function TextTools({ toolId }: { toolId: number }) {
  const [input, setInput] = useState('Hello World 123');
  const [output, setOutput] = useState('');
  
  const [findStr, setFindStr] = useState('');
  const [replaceStr, setReplaceStr] = useState('');
  const [paragraphs, setParagraphs] = useState(3);

  const handleProcess = () => {
    let res = '';
    switch(toolId) {
       case 21: res = `Words: ${input.split(/\s+/).filter(Boolean).length} | Chars: ${input.length}`; break;
       case 22: res = "UPPERCASE:\n" + input.toUpperCase() + "\n\nlowercase:\n" + input.toLowerCase(); break;
       case 23: res = input.replace(/\s+/g, ' ').trim(); break;
       case 24: res = input.split('').reverse().join(''); break;
       case 25: res = Array(paragraphs).fill("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.").join('\n\n'); break;
       case 26: res = (input.match(/https?:\/\/[^\s]+/g) || []).join('\n') || "No URLs found."; break;
       case 27: res = (input.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || []).join('\n') || "No emails found."; break;
       case 28: res = input.split(findStr).join(replaceStr); break;
       case 29: res = input.split('').map(c => c.charCodeAt(0).toString(2).padStart(8,'0')).join(' '); break;
       case 30: res = Array.from(new Set(input.split('\n'))).join('\n'); break;
       default: res = "Tool not implemented.";
    }
    setOutput(res);
  };

  return (
    <div className="space-y-4">
      {toolId === 25 && (
         <div className="flex gap-4">
           <input type="number" value={paragraphs} onChange={e=>setParagraphs(Number(e.target.value))} className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white" placeholder="Paragraphs" />
         </div>
      )}
      {toolId === 28 && (
         <div className="flex gap-4">
           <input placeholder="Find" value={findStr} onChange={e=>setFindStr(e.target.value)} className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white" />
           <input placeholder="Replace" value={replaceStr} onChange={e=>setReplaceStr(e.target.value)} className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white" />
         </div>
      )}
      <textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-32 p-4 bg-gray-900 border border-gray-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-indigo-500" placeholder="Input text here..." />
      <button onClick={handleProcess} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 transition-colors text-white rounded-lg font-medium">Process Text</button>
      <div className="w-full min-h-[8rem] p-4 bg-gray-900 border border-gray-700 rounded-lg text-emerald-400 font-mono text-sm whitespace-pre-wrap">{output}</div>
    </div>
  );
}
