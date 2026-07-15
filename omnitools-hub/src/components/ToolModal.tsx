import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { AdUnit } from './AdUnit';
import { ToolRenderer } from './ToolRenderer';

interface ToolModalProps {
  toolId: number | null;
  onClose: () => void;
  lang: 'en' | 'ar';
}

export function ToolModal({ toolId, onClose, lang }: ToolModalProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (toolId) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1500); // 1.5 seconds loading for smoother experience
      return () => clearTimeout(timer);
    }
  }, [toolId]);

  if (!toolId) return null;

  const isAr = lang === 'ar';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-gray-900 border-b border-gray-800">
          <h2 className="text-xl font-bold text-gray-100">
            {loading 
              ? (isAr ? "جارِ التهيئة..." : "Initializing...") 
              : (isAr ? "بيئة عمل الأداة" : "Tool Environment")}
          </h2>
          <button 
            onClick={onClose}
            className={`p-2 text-gray-400 transition-colors rounded-lg hover:bg-gray-800 hover:text-white ${isAr ? 'mr-auto ml-0' : 'ml-auto mr-0'}`}
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-8">
              <div className="flex flex-col items-center space-y-4 text-center">
                <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                <p className="text-lg font-medium text-gray-300">
                  {isAr ? "جارِ تحميل بيئة الأداة..." : "Processing tool environment..."}
                </p>
                <p className="text-sm text-gray-500">
                  {isAr ? "يرجى الانتظار ثوانٍ قليلة بينما نجهز الموارد." : "Please wait while we load resources."}
                </p>
              </div>
              
              {/* High-CPC Trap Ad Slot (Container styled) */}
              <div className="p-4 bg-gray-800 rounded-xl border border-gray-700 flex justify-center">
                <AdUnit options={{ key: 'd9ee6f54b1b0dc88cc20e64a263f4e38', format: 'iframe', height: 250, width: 300, params: {} }} />
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in duration-300">
              <ToolRenderer toolId={toolId} lang={lang} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
