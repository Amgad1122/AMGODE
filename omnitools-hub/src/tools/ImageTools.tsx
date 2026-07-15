import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, Copy, Check, Image as ImageIcon } from 'lucide-react';

export function ImageTools({ toolId, lang = 'en' }: { toolId: number; lang?: 'en' | 'ar' }) {
  const isAr = lang === 'ar';

  switch (toolId) {
    case 31: return <ImageCompressor isAr={isAr} />;
    case 32: return <PngToJpg isAr={isAr} />;
    case 33: return <WebpConverter isAr={isAr} />;
    case 34: return <ImageCropper isAr={isAr} />;
    case 35: return <ColorPickerTool isAr={isAr} />;
    case 36: return <FaviconGenerator isAr={isAr} />;
    case 37: return <CssGradientGenerator isAr={isAr} />;
    case 38: return <CssBoxShadowGenerator isAr={isAr} />;
    case 39: return <ImageBlurTool isAr={isAr} />;
    case 40: return <WatermarkMaker isAr={isAr} />;
    default: return null;
  }
}

// Reusable Copy Button
function CopyButton({ text, labelEn, labelAr }: { text: string; labelEn: string; labelAr: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded transition-colors"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      <span>{copied ? 'Copied!' : (labelEn)}</span>
    </button>
  );
}

// 31. Image Compressor
function ImageCompressor({ isAr }: { isAr: boolean }) {
  const [image, setImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(0.7);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [maxWidth, setMaxWidth] = useState<number>(1200);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalSize(file.size);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!image) return;
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = (maxWidth / width) * height;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      setCompressedImage(dataUrl);

      // Estimate compressed size from Base64 string
      const head = 'data:image/jpeg;base64,';
      const sizeInBytes = Math.round((dataUrl.length - head.length) * 3 / 4);
      setCompressedSize(sizeInBytes);
    };
  }, [image, quality, maxWidth]);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 hover:border-indigo-500 rounded-xl p-6 bg-gray-900/30 transition-all">
        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" ref={fileInputRef} />
        <button onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center gap-2 cursor-pointer">
          <Upload className="w-10 h-10 text-emerald-400" />
          <span className="font-semibold text-gray-200">
            {isAr ? "تحميل صورة للضغط" : "Upload Image to Compress"}
          </span>
          <span className="text-xs text-gray-500">PNG, JPG, WebP</span>
        </button>
      </div>

      {image && (
        <div className="space-y-6 bg-gray-900/40 p-4 rounded-xl border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-400">
                {isAr ? `جودة الضغط: ${Math.round(quality * 100)}%` : `Compression Quality: ${Math.round(quality * 100)}%`}
              </label>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 bg-gray-800 rounded-lg appearance-none h-2"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-400">
                {isAr ? "أقصى عرض للصورة (بكسل)" : "Max Width (px)"}
              </label>
              <select
                value={maxWidth}
                onChange={(e) => setMaxWidth(parseInt(e.target.value))}
                className="w-full px-3 py-1.5 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-indigo-500"
              >
                <option value={800}>800px</option>
                <option value={1200}>1200px (Default)</option>
                <option value={1920}>1920px (FHD)</option>
                <option value={3840}>3840px (4K)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-800">
            <div className="text-center bg-gray-900/60 p-3 rounded border border-gray-800">
              <span className="block text-xs text-gray-500 mb-1">{isAr ? "الحجم الأصلي" : "Original Size"}</span>
              <span className="font-mono text-lg text-gray-200 font-bold">{formatSize(originalSize)}</span>
            </div>
            <div className="text-center bg-gray-900/60 p-3 rounded border border-emerald-900/50">
              <span className="block text-xs text-emerald-500 mb-1">{isAr ? "الحجم المضغوط المقدر" : "Estimated Compressed Size"}</span>
              <span className="font-mono text-lg text-emerald-400 font-bold">{formatSize(compressedSize)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
            {compressedImage && (
              <a
                href={compressedImage}
                download="compressed_image.jpg"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-lg transition-all shadow-md active:scale-95"
              >
                <Download size={18} />
                <span>{isAr ? "تحميل الصورة المضغوطة" : "Download Compressed Image"}</span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// 32. PNG to JPG Converter
function PngToJpg({ isAr }: { isAr: boolean }) {
  const [image, setImage] = useState<string | null>(null);
  const [jpgUrl, setJpgUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            // Fill background with white for transparency
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            setJpgUrl(canvas.toDataURL('image/jpeg', 0.95));
          }
        };
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 hover:border-indigo-500 rounded-xl p-6 bg-gray-900/30 transition-all">
        <input type="file" accept="image/png" onChange={handleFileChange} className="hidden" ref={fileInputRef} />
        <button onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center gap-2 cursor-pointer">
          <Upload className="w-10 h-10 text-indigo-400" />
          <span className="font-semibold text-gray-200">
            {isAr ? "تحميل صورة PNG للتحويل" : "Upload PNG Image"}
          </span>
          <span className="text-xs text-gray-500">PNG only</span>
        </button>
      </div>

      {image && jpgUrl && (
        <div className="space-y-6 bg-gray-900/40 p-4 rounded-xl border border-gray-800 text-center">
          <div className="flex justify-center max-h-64 overflow-hidden rounded border border-gray-800">
            <img src={jpgUrl} alt="Converted preview" className="object-contain max-h-64" />
          </div>
          <div className="flex justify-center">
            <a
              href={jpgUrl}
              download="converted_image.jpg"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-lg transition-all active:scale-95 shadow-md"
            >
              <Download size={18} />
              <span>{isAr ? "تحميل بصيغة JPG" : "Download as JPG"}</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

// 33. WebP Converter
function WebpConverter({ isAr }: { isAr: boolean }) {
  const [image, setImage] = useState<string | null>(null);
  const [webpUrl, setWebpUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            setWebpUrl(canvas.toDataURL('image/webp', 0.9));
          }
        };
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 hover:border-indigo-500 rounded-xl p-6 bg-gray-900/30 transition-all">
        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" ref={fileInputRef} />
        <button onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center gap-2 cursor-pointer">
          <Upload className="w-10 h-10 text-teal-400" />
          <span className="font-semibold text-gray-200">
            {isAr ? "تحميل صورة للتحويل إلى WebP" : "Upload Image to Convert to WebP"}
          </span>
          <span className="text-xs text-gray-500">JPG, PNG, GIF etc.</span>
        </button>
      </div>

      {image && webpUrl && (
        <div className="space-y-6 bg-gray-900/40 p-4 rounded-xl border border-gray-800 text-center">
          <div className="flex justify-center max-h-64 overflow-hidden rounded border border-gray-800">
            <img src={webpUrl} alt="WebP preview" className="object-contain max-h-64" />
          </div>
          <div className="flex justify-center">
            <a
              href={webpUrl}
              download="converted_image.webp"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-lg transition-all active:scale-95 shadow-md"
            >
              <Download size={18} />
              <span>{isAr ? "تحميل بصيغة WebP" : "Download as WebP"}</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

// 34. Image Cropper
function ImageCropper({ isAr }: { isAr: boolean }) {
  const [image, setImage] = useState<string | null>(null);
  const [cropX, setCropX] = useState<number>(10);
  const [cropY, setCropY] = useState<number>(10);
  const [cropW, setCropW] = useState<number>(80);
  const [cropH, setCropH] = useState<number>(80);
  const [croppedUrl, setCroppedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setCroppedUrl(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    if (!imageRef.current) return;
    const img = imageRef.current;
    
    // Natural dimensions vs displayed dimensions
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;

    const canvas = document.createElement('canvas');
    const actualW = (cropW / 100) * img.width * scaleX;
    const actualH = (cropH / 100) * img.height * scaleY;
    
    canvas.width = actualW;
    canvas.height = actualH;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(
        img,
        (cropX / 100) * img.width * scaleX,
        (cropY / 100) * img.height * scaleY,
        actualW,
        actualH,
        0,
        0,
        actualW,
        actualH
      );
      setCroppedUrl(canvas.toDataURL('image/jpeg', 0.95));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 hover:border-indigo-500 rounded-xl p-6 bg-gray-900/30 transition-all">
        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" ref={fileInputRef} />
        <button onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center gap-2 cursor-pointer">
          <Upload className="w-10 h-10 text-orange-400" />
          <span className="font-semibold text-gray-200">
            {isAr ? "تحميل صورة للقص" : "Upload Image to Crop"}
          </span>
          <span className="text-xs text-gray-500">PNG, JPG</span>
        </button>
      </div>

      {image && (
        <div className="space-y-6 bg-gray-900/40 p-4 rounded-xl border border-gray-800">
          <div className="relative border border-gray-700 rounded overflow-hidden bg-black flex justify-center">
            <img src={image} ref={imageRef} alt="Crop Source" className="max-h-96 object-contain select-none" />
            
            {/* Visual Crop Overlay representation */}
            <div 
              className="absolute border-2 border-dashed border-emerald-500 bg-emerald-500/10 pointer-events-none transition-all"
              style={{
                left: `${cropX}%`,
                top: `${cropY}%`,
                width: `${Math.min(cropW, 100 - cropX)}%`,
                height: `${Math.min(cropH, 100 - cropY)}%`
              }}
            />
          </div>

          {/* Interactive controls */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-900/60 p-4 rounded-lg border border-gray-800">
            <div className="space-y-1">
              <label className="text-xs text-gray-400">{isAr ? "الإزاحة الأفقية X" : "Left (X)"}</label>
              <input type="range" min="0" max="90" value={cropX} onChange={e => {setCropX(parseInt(e.target.value)); setCroppedUrl(null);}} className="w-full accent-indigo-500" />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">{isAr ? "الإزاحة الرأسية Y" : "Top (Y)"}</label>
              <input type="range" min="0" max="90" value={cropY} onChange={e => {setCropY(parseInt(e.target.value)); setCroppedUrl(null);}} className="w-full accent-indigo-500" />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">{isAr ? "العرض" : "Width"}</label>
              <input type="range" min="10" max="100" value={cropW} onChange={e => {setCropW(parseInt(e.target.value)); setCroppedUrl(null);}} className="w-full accent-indigo-500" />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">{isAr ? "الارتفاع" : "Height"}</label>
              <input type="range" min="10" max="100" value={cropH} onChange={e => {setCropH(parseInt(e.target.value)); setCroppedUrl(null);}} className="w-full accent-indigo-500" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleCrop}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-2.5 rounded-lg transition-all active:scale-95"
            >
              {isAr ? "قص ومعاينة" : "Crop & Preview"}
            </button>

            {croppedUrl && (
              <a
                href={croppedUrl}
                download="cropped_image.jpg"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-2.5 rounded-lg transition-all active:scale-95"
              >
                <Download size={16} />
                <span>{isAr ? "تحميل الصورة المقصوصة" : "Download Crop"}</span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// 35. Color Picker Tool
function ColorPickerTool({ isAr }: { isAr: boolean }) {
  const [image, setImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState('#10B981');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = image;
    img.onload = () => {
      // Set fixed visual size but high resolution
      canvas.width = img.width > 600 ? 600 : img.width;
      canvas.height = (canvas.width / img.width) * img.height;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, [image]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Map client coordinates to canvas internal pixel coordinates
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      const pixel = ctx.getImageData(x * scaleX, y * scaleY, 1, 1).data;
      const r = pixel[0];
      const g = pixel[1];
      const b = pixel[2];
      const hex = '#' + [r, g, b].map(x => {
        const h = x.toString(16);
        return h.length === 1 ? '0' + h : h;
      }).join('').toUpperCase();
      setSelectedColor(hex);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Color Preview & Copy Column */}
        <div className="space-y-6 flex flex-col justify-center bg-gray-950/40 p-5 rounded-xl border border-gray-800">
          <div 
            className="w-full h-32 rounded-xl shadow-inner border border-white/10 transition-all duration-300" 
            style={{ backgroundColor: selectedColor }}
          />
          <div className="space-y-3 font-mono text-sm">
            <div className="flex justify-between items-center bg-gray-900 px-4 py-2.5 rounded border border-gray-800">
              <span className="text-gray-500">HEX</span>
              <span className="text-white font-bold">{selectedColor}</span>
              <CopyButton text={selectedColor} labelEn="Copy" labelAr="نسخ" />
            </div>
            <div className="flex justify-between items-center bg-gray-900 px-4 py-2.5 rounded border border-gray-800">
              <span className="text-gray-500">Manual Picker</span>
              <input 
                type="color" 
                value={selectedColor} 
                onChange={e => setSelectedColor(e.target.value)} 
                className="w-8 h-8 rounded border border-gray-700 bg-transparent cursor-pointer" 
              />
            </div>
          </div>
        </div>

        {/* Canvas Picker Column */}
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 hover:border-indigo-500 rounded-xl p-4 bg-gray-900/30 transition-all">
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" ref={fileInputRef} />
            <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 cursor-pointer py-2">
              <Upload size={18} className="text-emerald-400" />
              <span className="text-sm font-semibold text-gray-200">
                {isAr ? "تحميل صورة لملتقط الألوان" : "Upload Image to Pick Colors"}
              </span>
            </button>
          </div>

          {image && (
            <div className="border border-gray-700 rounded overflow-hidden bg-black flex justify-center cursor-crosshair">
              <canvas ref={canvasRef} onClick={handleCanvasClick} className="max-w-full" />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// 36. Favicon Generator
function FaviconGenerator({ isAr }: { isAr: boolean }) {
  const [image, setImage] = useState<string | null>(null);
  const [favicons, setFavicons] = useState<{ size: number; url: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        generateFavicons(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateFavicons = (src: string) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const sizes = [16, 32, 48];
      const results = sizes.map(size => {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, size, size);
        }
        return { size, url: canvas.toDataURL('image/png') };
      });
      setFavicons(results);
    };
  };

  return (
    <div className="space-y-6 text-center">
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 hover:border-indigo-500 rounded-xl p-6 bg-gray-900/30 transition-all">
        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" ref={fileInputRef} />
        <button onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center gap-2 cursor-pointer">
          <ImageIcon className="w-10 h-10 text-emerald-400" />
          <span className="font-semibold text-gray-200">
            {isAr ? "تحميل صورة لتوليد Favicon" : "Upload Image to Generate Favicon"}
          </span>
          <span className="text-xs text-gray-500">PNG, JPG, SVG</span>
        </button>
      </div>

      {image && favicons.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-gray-900/40 p-6 rounded-xl border border-gray-800">
          {favicons.map(favicon => (
            <div key={favicon.size} className="flex flex-col items-center justify-center bg-gray-900/80 p-4 rounded-lg border border-gray-800 space-y-4">
              <span className="text-xs font-mono text-gray-500">{favicon.size}x{favicon.size} px</span>
              <div className="bg-slate-950 p-4 border border-gray-800 rounded-md flex items-center justify-center">
                <img src={favicon.url} alt={`${favicon.size}px`} style={{ width: favicon.size, height: favicon.size }} />
              </div>
              <a
                href={favicon.url}
                download={`favicon-${favicon.size}x${favicon.size}.png`}
                className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-3 py-2 rounded transition-colors active:scale-95"
              >
                <Download size={12} />
                <span>{isAr ? "تحميل" : "Download"}</span>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 37. CSS Gradient Generator
function CssGradientGenerator({ isAr }: { isAr: boolean }) {
  const [color1, setColor1] = useState('#6366F1');
  const [color2, setColor2] = useState('#10B981');
  const [degree, setDegree] = useState(135);
  const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear');

  const gradientString = gradientType === 'linear'
    ? `linear-gradient(${degree}deg, ${color1}, ${color2})`
    : `radial-gradient(circle, ${color1}, ${color2})`;

  return (
    <div className="space-y-6">
      <div 
        className="h-48 w-full rounded-2xl border border-white/10 shadow-lg shadow-black/40 transition-all duration-300"
        style={{ background: gradientString }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-900/40 p-4 rounded-xl border border-gray-800">
        
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex flex-col space-y-1.5 flex-1">
              <label className="text-xs text-gray-400">{isAr ? "اللون الأول" : "Color 1"}</label>
              <div className="flex items-center gap-2 bg-gray-900 p-2 border border-gray-700 rounded-lg">
                <input type="color" value={color1} onChange={e => setColor1(e.target.value)} className="w-8 h-8 rounded cursor-pointer bg-transparent" />
                <span className="font-mono text-sm text-gray-200">{color1.toUpperCase()}</span>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5 flex-1">
              <label className="text-xs text-gray-400">{isAr ? "اللون الثاني" : "Color 2"}</label>
              <div className="flex items-center gap-2 bg-gray-900 p-2 border border-gray-700 rounded-lg">
                <input type="color" value={color2} onChange={e => setColor2(e.target.value)} className="w-8 h-8 rounded cursor-pointer bg-transparent" />
                <span className="font-mono text-sm text-gray-200">{color2.toUpperCase()}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-gray-400">{isAr ? "نوع التدرج" : "Gradient Type"}</label>
            <div className="flex gap-2">
              <button
                onClick={() => setGradientType('linear')}
                className={`flex-1 py-1.5 rounded font-semibold text-xs transition-colors border ${gradientType === 'linear' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-gray-800 border-gray-700 text-gray-400'}`}
              >
                Linear
              </button>
              <button
                onClick={() => setGradientType('radial')}
                className={`flex-1 py-1.5 rounded font-semibold text-xs transition-colors border ${gradientType === 'radial' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-gray-800 border-gray-700 text-gray-400'}`}
              >
                Radial
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {gradientType === 'linear' && (
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <label className="text-xs text-gray-400">{isAr ? "الزاوية" : "Angle"}</label>
                <span className="text-xs font-mono text-indigo-400">{degree}°</span>
              </div>
              <input type="range" min="0" max="360" value={degree} onChange={e => setDegree(parseInt(e.target.value))} className="w-full accent-indigo-500" />
            </div>
          )}

          <div className="space-y-1.5">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-400">CSS Rule</span>
              <CopyButton text={`background: ${gradientString};`} labelEn="Copy" labelAr="نسخ" />
            </div>
            <textarea
              readOnly
              value={`background: ${gradientString};`}
              className="w-full p-2.5 bg-gray-950 border border-gray-800 rounded font-mono text-xs text-indigo-400 h-20 focus:outline-none resize-none"
            />
          </div>
        </div>

      </div>
    </div>
  );
}

// 38. CSS Box Shadow Generator
function CssBoxShadowGenerator({ isAr }: { isAr: boolean }) {
  const [hOffset, setHOffset] = useState(10);
  const [vOffset, setVOffset] = useState(10);
  const [blur, setBlur] = useState(20);
  const [spread, setSpread] = useState(0);
  const [opacity, setOpacity] = useState(0.3);
  const [shadowColor, setShadowColor] = useState('#000000');
  const [inset, setInset] = useState(false);

  // Convert hex shadow color & opacity to rgba
  const getRgba = () => {
    let r = 0, g = 0, b = 0;
    if (shadowColor.length === 7) {
      r = parseInt(shadowColor.substring(1, 3), 16);
      g = parseInt(shadowColor.substring(3, 5), 16);
      b = parseInt(shadowColor.substring(5, 7), 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const shadowString = `${inset ? 'inset ' : ''}${hOffset}px ${vOffset}px ${blur}px ${spread}px ${getRgba()}`;

  return (
    <div className="space-y-6">
      <div className="h-48 w-full rounded-2xl bg-slate-900 border border-gray-800 flex items-center justify-center p-6">
        <div 
          className="h-28 w-28 bg-indigo-600 rounded-xl transition-all duration-300"
          style={{ boxShadow: shadowString }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-900/40 p-4 rounded-xl border border-gray-800">
        
        <div className="space-y-3.5">
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-400">
              <span>{isAr ? "الإزاحة الأفقية" : "Horizontal Offset"}</span>
              <span className="font-mono">{hOffset}px</span>
            </div>
            <input type="range" min="-50" max="50" value={hOffset} onChange={e => setHOffset(parseInt(e.target.value))} className="w-full accent-indigo-500" />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-400">
              <span>{isAr ? "الإزاحة الرأسية" : "Vertical Offset"}</span>
              <span className="font-mono">{vOffset}px</span>
            </div>
            <input type="range" min="-50" max="50" value={vOffset} onChange={e => setVOffset(parseInt(e.target.value))} className="w-full accent-indigo-500" />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-400">
              <span>{isAr ? "التغبيش (Blur)" : "Blur Radius"}</span>
              <span className="font-mono">{blur}px</span>
            </div>
            <input type="range" min="0" max="100" value={blur} onChange={e => setBlur(parseInt(e.target.value))} className="w-full accent-indigo-500" />
          </div>
        </div>

        <div className="space-y-3.5">
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-400">
              <span>{isAr ? "الانتشار (Spread)" : "Spread Radius"}</span>
              <span className="font-mono">{spread}px</span>
            </div>
            <input type="range" min="-30" max="30" value={spread} onChange={e => setSpread(parseInt(e.target.value))} className="w-full accent-indigo-500" />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-400">
              <span>{isAr ? "الشفافية" : "Shadow Opacity"}</span>
              <span className="font-mono">{Math.round(opacity * 100)}%</span>
            </div>
            <input type="range" min="0" max="1" step="0.05" value={opacity} onChange={e => setOpacity(parseFloat(e.target.value))} className="w-full accent-indigo-500" />
          </div>

          <div className="flex gap-4">
            <div className="flex-1 space-y-1">
              <label className="text-xs text-gray-400 block mb-0.5">{isAr ? "لون الظل" : "Shadow Color"}</label>
              <input type="color" value={shadowColor} onChange={e => setShadowColor(e.target.value)} className="w-full h-8 bg-transparent cursor-pointer rounded" />
            </div>
            <div className="flex-1 flex flex-col justify-end">
              <button 
                onClick={() => setInset(!inset)}
                className={`py-1.5 rounded font-semibold text-xs border transition-colors ${inset ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-gray-800 border-gray-700 text-gray-400'}`}
              >
                {isAr ? "ظل داخلي (Inset)" : "Inset"}
              </button>
            </div>
          </div>
        </div>

      </div>

      <div className="space-y-1.5 bg-gray-900/60 p-4 rounded-xl border border-gray-800">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-400">CSS Rule</span>
          <CopyButton text={`box-shadow: ${shadowString};`} labelEn="Copy" labelAr="نسخ" />
        </div>
        <textarea
          readOnly
          value={`box-shadow: ${shadowString};`}
          className="w-full p-2.5 bg-gray-950 border border-gray-800 rounded font-mono text-xs text-indigo-400 h-16 focus:outline-none resize-none"
        />
      </div>
    </div>
  );
}

// 39. Image Blur Tool
function ImageBlurTool({ isAr }: { isAr: boolean }) {
  const [image, setImage] = useState<string | null>(null);
  const [blur, setBlur] = useState<number>(10);
  const [blurredUrl, setBlurredUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setBlurredUrl(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyBlur = () => {
    if (!image) return;
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Apply canvas filter (modern browser native feature)
        ctx.filter = `blur(${blur}px)`;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        setBlurredUrl(canvas.toDataURL('image/jpeg', 0.9));
      }
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 hover:border-indigo-500 rounded-xl p-6 bg-gray-900/30 transition-all">
        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" ref={fileInputRef} />
        <button onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center gap-2 cursor-pointer">
          <Upload className="w-10 h-10 text-pink-400" />
          <span className="font-semibold text-gray-200">
            {isAr ? "تحميل صورة لتطبيق التغبيش" : "Upload Image to Blur"}
          </span>
          <span className="text-xs text-gray-500">PNG, JPG</span>
        </button>
      </div>

      {image && (
        <div className="space-y-6 bg-gray-900/40 p-4 rounded-xl border border-gray-800">
          
          <div className="relative border border-gray-700 rounded overflow-hidden bg-black flex justify-center max-h-96">
            <img 
              src={image} 
              alt="Live preview filter" 
              className="max-h-96 object-contain" 
              style={{ filter: blurredUrl ? 'none' : `blur(${blur}px)` }}
            />
          </div>

          <div className="space-y-2 bg-gray-900/60 p-4 rounded-lg border border-gray-800">
            <div className="flex justify-between text-sm text-gray-400">
              <span>{isAr ? "قوة التغبيش" : "Blur Amount"}</span>
              <span className="font-mono">{blur}px</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="50" 
              value={blur} 
              onChange={e => {setBlur(parseInt(e.target.value)); setBlurredUrl(null);}} 
              className="w-full accent-indigo-500" 
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={applyBlur}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-2.5 rounded-lg transition-all active:scale-95"
            >
              {isAr ? "تطبيق وتهيئة التغبيش" : "Apply Blur filter"}
            </button>

            {blurredUrl && (
              <a
                href={blurredUrl}
                download="blurred_image.jpg"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-2.5 rounded-lg transition-all active:scale-95"
              >
                <Download size={16} />
                <span>{isAr ? "تحميل الصورة المغبشة" : "Download Blurred Image"}</span>
              </a>
            )}
          </div>

        </div>
      )}
    </div>
  );
}

// 40. Watermark Maker
function WatermarkMaker({ isAr }: { isAr: boolean }) {
  const [image, setImage] = useState<string | null>(null);
  const [watermarkText, setWatermarkText] = useState('OmniTools Hub');
  const [fontSize, setFontSize] = useState(36);
  const [position, setPosition] = useState<'center' | 'bottom-right' | 'top-left' | 'bottom-left'>('bottom-right');
  const [color, setColor] = useState('#FFFFFF');
  const [watermarkedUrl, setWatermarkedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setWatermarkedUrl(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyWatermark = () => {
    if (!image) return;
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.fillStyle = color;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 4;
        
        let x = canvas.width - (fontSize * 6);
        let y = canvas.height - fontSize;

        if (position === 'center') {
          x = (canvas.width / 2) - (ctx.measureText(watermarkText).width / 2);
          y = (canvas.height / 2);
        } else if (position === 'top-left') {
          x = fontSize;
          y = fontSize * 1.5;
        } else if (position === 'bottom-left') {
          x = fontSize;
          y = canvas.height - fontSize;
        } else if (position === 'bottom-right') {
          x = canvas.width - ctx.measureText(watermarkText).width - fontSize;
          y = canvas.height - fontSize;
        }

        ctx.fillText(watermarkText, x, y);
        setWatermarkedUrl(canvas.toDataURL('image/jpeg', 0.95));
      }
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 hover:border-indigo-500 rounded-xl p-6 bg-gray-900/30 transition-all">
        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" ref={fileInputRef} />
        <button onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center gap-2 cursor-pointer">
          <Upload className="w-10 h-10 text-emerald-400" />
          <span className="font-semibold text-gray-200">
            {isAr ? "تحميل صورة لإضافة علامة مائية" : "Upload Image to Watermark"}
          </span>
          <span className="text-xs text-gray-500">PNG, JPG</span>
        </button>
      </div>

      {image && (
        <div className="space-y-6 bg-gray-900/40 p-4 rounded-xl border border-gray-800">
          
          <div className="relative border border-gray-700 rounded overflow-hidden bg-black flex justify-center max-h-96">
            <img src={watermarkedUrl || image} alt="Watermark preview" className="max-h-96 object-contain" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-900/60 p-4 rounded-lg border border-gray-800">
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs text-gray-400">{isAr ? "نص العلامة المائية" : "Watermark Text"}</label>
                <input 
                  type="text" 
                  value={watermarkText} 
                  onChange={e => {setWatermarkText(e.target.value); setWatermarkedUrl(null);}} 
                  className="w-full px-3 py-1.5 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-indigo-500 font-bold" 
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-400">{isAr ? "حجم الخط (بكسل)" : "Font Size (px)"}</label>
                <input 
                  type="range" 
                  min="16" 
                  max="120" 
                  value={fontSize} 
                  onChange={e => {setFontSize(parseInt(e.target.value)); setWatermarkedUrl(null);}} 
                  className="w-full accent-indigo-500" 
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs text-gray-400">{isAr ? "موضع النص" : "Text Position"}</label>
                <select
                  value={position}
                  onChange={e => {setPosition(e.target.value as any); setWatermarkedUrl(null);}}
                  className="w-full px-3 py-1.5 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-indigo-500"
                >
                  <option value="bottom-right">{isAr ? "أسفل اليمين" : "Bottom-Right"}</option>
                  <option value="bottom-left">{isAr ? "أسفل اليسار" : "Bottom-Left"}</option>
                  <option value="top-left">{isAr ? "أعلى اليسار" : "Top-Left"}</option>
                  <option value="center">{isAr ? "المنتصف" : "Center"}</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-400">{isAr ? "لون النص" : "Text Color"}</label>
                <input 
                  type="color" 
                  value={color} 
                  onChange={e => {setColor(e.target.value); setWatermarkedUrl(null);}} 
                  className="w-full h-8 bg-transparent cursor-pointer" 
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={applyWatermark}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-2.5 rounded-lg transition-all active:scale-95"
            >
              {isAr ? "تطبيق المعاينة" : "Apply Watermark"}
            </button>

            {watermarkedUrl && (
              <a
                href={watermarkedUrl}
                download="watermarked_image.jpg"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-2.5 rounded-lg transition-all active:scale-95"
              >
                <Download size={16} />
                <span>{isAr ? "تحميل الصورة بالعلامة" : "Download Watermarked Image"}</span>
              </a>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
