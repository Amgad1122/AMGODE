import React, { useState } from 'react';

export function SEOTools({ toolId }: { toolId: number }) {
  const [input, setInput] = useState('My Awesome Website');
  const [input2, setInput2] = useState('https://example.com');
  
  let output = '';
  if (toolId === 71) {
    output = `<meta name="title" content="${input}" />\n<meta name="description" content="Description for ${input}" />\n<meta property="og:title" content="${input}" />`;
  } else if (toolId === 78) { // UTM Builder
    output = `${input2}?utm_source=google&utm_medium=cpc&utm_campaign=summer_sale`;
  } else if (toolId === 73) {
    output = `User-agent: *\nDisallow: /admin/\nAllow: /\nSitemap: ${input2}/sitemap.xml`;
  } else if (toolId === 76) {
    output = `https://wa.me/1234567890?text=${encodeURIComponent(input)}`;
  } else {
    output = `SEO Tool #${toolId} execution successful. Ready for webmaster use.`;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" value={input} onChange={e=>setInput(e.target.value)} className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:border-indigo-500" placeholder="Keywords / Title..." />
        <input type="text" value={input2} onChange={e=>setInput2(e.target.value)} className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:border-indigo-500" placeholder="URL..." />
      </div>
      <div className="w-full p-6 bg-gray-900 text-emerald-400 border border-gray-700 font-mono text-sm break-all whitespace-pre-wrap rounded-xl">{output}</div>
    </div>
  );
}
