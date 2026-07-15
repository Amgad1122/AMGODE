import React, { useState } from 'react';

export function EntertainmentTools({ toolId }: { toolId: number }) {
  const [res, setRes] = useState('Click below to generate!');

  const process = () => {
    switch(toolId) {
      case 91: setRes(`The wheel landed on: Option ${Math.floor(Math.random() * 8) + 1}`); break;
      case 92: setRes(`🎲 You rolled a ${Math.floor(Math.random() * 6) + 1}`); break;
      case 93: setRes(`🪙 The coin landed on: ${Math.random() > 0.5 ? 'Heads' : 'Tails'}`); break;
      case 94: setRes(`❤️ Love Compatibility: ${Math.floor(Math.random() * 100) + 1}%`); break;
      case 95: {
         const names = ['Alex Mercer', 'Jordan Chase', 'Taylor Brooks', 'Morgan Reed', 'Casey Blake'];
         setRes(`✨ Name: ${names[Math.floor(Math.random()*names.length)]}`); 
         break;
      }
      case 98: {
         const quotes = [
           '"The only way to do great work is to love what you do." - Steve Jobs',
           '"Life is what happens when you\'re busy making other plans." - John Lennon',
           '"To be or not to be, that is the question." - William Shakespeare'
         ];
         setRes(quotes[Math.floor(Math.random()*quotes.length)]);
         break;
      }
      case 99: setRes(`🚀 Text transformed to Emojis! 🔥✨💯`); break;
      default: setRes(`Entertainment Tool #${toolId} triggered! 🎉`);
    }
  }

  return (
    <div className="flex flex-col items-center space-y-8 py-6">
      <div className="text-3xl font-bold font-mono text-emerald-400 bg-gray-900 p-10 rounded-2xl border border-gray-700 w-full text-center shadow-lg shadow-emerald-500/10 min-h-[150px] flex items-center justify-center">
        {res}
      </div>
      <button onClick={process} className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-bold rounded-xl text-xl shadow-lg shadow-indigo-500/20">
        Generate Magic ✨
      </button>
    </div>
  );
}
