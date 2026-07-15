import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { v4 as uuidv4 } from 'uuid';
import { Copy, Check } from 'lucide-react';

export function DeveloperTools({ toolId }: { toolId: number }) {
  switch (toolId) {
    case 11: return <JSONFormatter />;
    case 12: return <CSSMinifier />;
    case 13: return <JSMinifier />;
    case 14: return <PasswordGen />;
    case 15: return <PasswordStrength />;
    case 16: return <HEXRGBConverter />;
    case 17: return <QRCodeGen />;
    case 18: return <Base64Encoder />;
    case 19: return <URLEncoder />;
    case 20: return <UUIDGen />;
    default: return null;
  }
}

// 11. JSON Formatter
function JSONFormatter() {
  const [input, setInput] = useState('{"hello":"world","numbers":[1,2,3]}');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      if (!input.trim()) {
        setOutput('');
        setError('');
        return;
      }
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (err: any) {
      setError(err.message);
    }
  }, [input]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Input JSON</label>
        <textarea 
          value={input} onChange={(e) => setInput(e.target.value)}
          className="w-full h-64 p-4 bg-gray-900 border border-gray-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
          spellCheck={false}
        />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <label className="text-sm text-gray-400">Formatted JSON</label>
          <CopyButton text={output} />
        </div>
        <div className="w-full h-64 p-4 bg-gray-900 border border-gray-700 rounded-lg text-white font-mono text-sm overflow-auto whitespace-pre">
          {error ? <span className="text-red-400">{error}</span> : output}
        </div>
      </div>
    </div>
  );
}

// 12. CSS Minifier
function CSSMinifier() {
  const [input, setInput] = useState('body {\n  margin: 0;\n  padding: 0;\n}');
  const output = input.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([\{\}\:\;\,])\s*/g, '$1').trim();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Raw CSS</label>
        <textarea 
          value={input} onChange={(e) => setInput(e.target.value)}
          className="w-full h-64 p-4 bg-gray-900 border border-gray-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
        />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <label className="text-sm text-gray-400">Minified CSS</label>
          <CopyButton text={output} />
        </div>
        <div className="w-full h-64 p-4 bg-gray-900 border border-gray-700 rounded-lg text-white font-mono text-sm overflow-auto break-all">
          {output}
        </div>
      </div>
    </div>
  );
}

// 13. JS Minifier (Very basic Regex based for client-side demo)
function JSMinifier() {
  const [input, setInput] = useState('function hello() {\n  console.log("world");\n}');
  const output = input.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*/g, '').replace(/\s+/g, ' ').trim();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Raw JS</label>
        <textarea 
          value={input} onChange={(e) => setInput(e.target.value)}
          className="w-full h-64 p-4 bg-gray-900 border border-gray-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
        />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <label className="text-sm text-gray-400">Minified JS</label>
          <CopyButton text={output} />
        </div>
        <div className="w-full h-64 p-4 bg-gray-900 border border-gray-700 rounded-lg text-white font-mono text-sm overflow-auto break-all">
          {output}
        </div>
      </div>
    </div>
  );
}

// 14. Password Gen
function PasswordGen() {
  const [length, setLength] = useState(16);
  const [password, setPassword] = useState('');

  const generate = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let pwd = "";
    for (let i = 0; i < length; i++) pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    setPassword(pwd);
  };

  useEffect(() => generate(), [length]);

  return (
    <div className="space-y-6 flex flex-col items-center">
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 w-full max-w-lg flex items-center justify-between">
        <div className="text-2xl font-mono text-white tracking-widest break-all mr-4">{password}</div>
        <CopyButton text={password} size="large" />
      </div>
      
      <div className="w-full max-w-lg space-y-2">
        <div className="flex justify-between text-sm text-gray-400">
          <span>Length: {length}</span>
        </div>
        <input 
          type="range" min="8" max="64" value={length} onChange={(e) => setLength(Number(e.target.value))}
          className="w-full accent-emerald-500"
        />
      </div>

      <button onClick={generate} className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors">
        Regenerate Password
      </button>
    </div>
  );
}

// 15. Password Strength
function PasswordStrength() {
  const [pwd, setPwd] = useState('');
  
  let score = 0;
  if (pwd.length > 8) score++;
  if (pwd.match(/[a-z]/)) score++;
  if (pwd.match(/[A-Z]/)) score++;
  if (pwd.match(/[0-9]/)) score++;
  if (pwd.match(/[^a-zA-Z0-9]/)) score++;

  const strengthText = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong", "Excellent"];
  const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-emerald-400", "bg-emerald-500", "bg-emerald-600"];

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <input 
        type="text" value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="Type password..."
        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white font-mono focus:outline-none focus:border-emerald-500"
      />
      <div className="space-y-2">
        <div className="flex gap-2 h-2">
          {[1,2,3,4,5].map(i => (
            <div key={i} className={`flex-1 rounded-full ${score >= i ? colors[score] : 'bg-gray-800'}`}></div>
          ))}
        </div>
        <div className="text-center font-medium text-gray-400">
          {pwd ? strengthText[score] : "Enter a password"}
        </div>
      </div>
    </div>
  );
}

// 16. HEX/RGB Converter
function HEXRGBConverter() {
  const [hex, setHex] = useState('#10B981');
  
  const hexToRgb = (h: string) => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
    return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : 'Invalid HEX';
  };

  return (
    <div className="space-y-6 max-w-lg mx-auto flex flex-col items-center">
      <div 
        className="w-32 h-32 rounded-2xl shadow-lg"
        style={{ backgroundColor: hex }}
      ></div>
      <div className="w-full space-y-4">
        <div>
          <label className="text-sm text-gray-400">HEX Code</label>
          <input 
            type="text" value={hex} onChange={(e) => setHex(e.target.value)}
            className="w-full px-4 py-2 mt-1 bg-gray-900 border border-gray-700 rounded-lg text-white font-mono focus:outline-none focus:border-emerald-500"
          />
        </div>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 flex justify-between items-center">
          <span className="font-mono text-gray-300">{hexToRgb(hex)}</span>
          <CopyButton text={hexToRgb(hex)} />
        </div>
      </div>
    </div>
  );
}

// 17. QR Code Gen
function QRCodeGen() {
  const [text, setText] = useState('https://example.com');
  
  return (
    <div className="space-y-6 flex flex-col items-center">
      <div className="bg-white p-4 rounded-xl">
        <QRCode value={text || " "} size={200} />
      </div>
      <input 
        type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text or URL"
        className="w-full max-w-lg px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
      />
    </div>
  );
}

// 18. Base64 Encode/Decode
function Base64Encoder() {
  const [text, setText] = useState('Hello World');
  const [mode, setMode] = useState<'encode'|'decode'>('encode');
  
  const getOutput = () => {
    try {
      return mode === 'encode' ? btoa(text) : atob(text);
    } catch {
      return "Invalid Input";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <button onClick={() => setMode('encode')} className={`px-4 py-2 rounded-lg text-sm font-medium ${mode === 'encode' ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-400'}`}>Encode</button>
        <button onClick={() => setMode('decode')} className={`px-4 py-2 rounded-lg text-sm font-medium ${mode === 'decode' ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-400'}`}>Decode</button>
      </div>
      <textarea 
        value={text} onChange={(e) => setText(e.target.value)} placeholder="Input text..."
        className="w-full h-32 p-4 bg-gray-900 border border-gray-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
      />
      <div className="relative">
        <div className="w-full min-h-[8rem] p-4 bg-gray-900 border border-gray-700 rounded-lg text-emerald-400 font-mono text-sm break-all">
          {getOutput()}
        </div>
        <div className="absolute top-2 right-2"><CopyButton text={getOutput()} /></div>
      </div>
    </div>
  );
}

// 19. URL Encode/Decode
function URLEncoder() {
  const [text, setText] = useState('https://example.com/search?q=hello world');
  const [mode, setMode] = useState<'encode'|'decode'>('encode');
  
  const getOutput = () => {
    try {
      return mode === 'encode' ? encodeURIComponent(text) : decodeURIComponent(text);
    } catch {
      return "Invalid Input";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <button onClick={() => setMode('encode')} className={`px-4 py-2 rounded-lg text-sm font-medium ${mode === 'encode' ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-400'}`}>Encode</button>
        <button onClick={() => setMode('decode')} className={`px-4 py-2 rounded-lg text-sm font-medium ${mode === 'decode' ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-400'}`}>Decode</button>
      </div>
      <textarea 
        value={text} onChange={(e) => setText(e.target.value)} placeholder="Input text..."
        className="w-full h-32 p-4 bg-gray-900 border border-gray-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
      />
      <div className="relative">
        <div className="w-full min-h-[8rem] p-4 bg-gray-900 border border-gray-700 rounded-lg text-emerald-400 font-mono text-sm break-all">
          {getOutput()}
        </div>
        <div className="absolute top-2 right-2"><CopyButton text={getOutput()} /></div>
      </div>
    </div>
  );
}

// 20. UUID Gen
function UUIDGen() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);

  const generate = () => {
    const newUuids = Array.from({ length: count }, () => uuidv4());
    setUuids(newUuids);
  };

  useEffect(() => generate(), []);

  return (
    <div className="space-y-6 flex flex-col items-center">
      <div className="flex space-x-4 items-center">
        <label className="text-sm text-gray-400">Count</label>
        <input 
          type="number" min="1" max="50" value={count} onChange={(e) => setCount(Number(e.target.value))}
          className="w-20 px-3 py-1 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none"
        />
        <button onClick={generate} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors">
          Generate New
        </button>
      </div>
      
      <div className="w-full max-w-lg space-y-2">
        {uuids.map(id => (
          <div key={id} className="bg-gray-900 p-3 rounded-lg border border-gray-700 flex justify-between items-center group">
            <span className="font-mono text-gray-300">{id}</span>
            <CopyButton text={id} />
          </div>
        ))}
      </div>
    </div>
  );
}


// --- Helper ---
function CopyButton({ text, size = "small" }: { text: string, size?: "small" | "large" }) {
  const [copied, setCopied] = useState(false);
  
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isLg = size === "large";

  return (
    <button 
      onClick={copy}
      className={`${isLg ? 'p-3' : 'p-2'} rounded-lg transition-colors ${copied ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'}`}
      title="Copy to clipboard"
    >
      {copied ? <Check size={isLg ? 24 : 16} /> : <Copy size={isLg ? 24 : 16} />}
    </button>
  );
}
