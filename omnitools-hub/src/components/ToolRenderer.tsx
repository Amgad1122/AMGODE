import React from 'react';
import { toolsData } from '../toolsData';
import { toolTranslations } from '../translations';

// Import tool components
import { FinanceTools } from '../tools/FinanceTools';
import { DeveloperTools } from '../tools/DeveloperTools';
import { TextTools } from '../tools/TextTools';
import { ImageTools } from '../tools/ImageTools';
import { DataTools } from '../tools/DataTools';
import { HealthTools } from '../tools/HealthTools';
import { TimeTools } from '../tools/TimeTools';
import { SEOTools } from '../tools/SEOTools';
import { MathTools } from '../tools/MathTools';
import { EntertainmentTools } from '../tools/EntertainmentTools';

interface ToolRendererProps {
  toolId: number;
  lang?: 'en' | 'ar';
}

export function ToolRenderer({ toolId, lang = 'en' }: ToolRendererProps) {
  const tool = toolsData.find(t => t.id === toolId);
  
  if (!tool) return <div>Tool not found</div>;

  // Retrieve translation or fallback to English values from toolsData
  const name = toolTranslations[toolId]?.[lang]?.name || tool.name;
  const desc = toolTranslations[toolId]?.[lang]?.desc || tool.desc;

  const isRtl = lang === 'ar';

  return (
    <div className="flex flex-col" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-800">
        <div className="p-3 bg-gray-800 rounded-xl text-emerald-500">
          <tool.icon size={32} />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">{name}</h1>
          <p className="text-gray-400 mt-1 text-sm md:text-base">{desc}</p>
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        {toolId >= 1 && toolId <= 10 && <FinanceTools toolId={toolId} />}
        {toolId >= 11 && toolId <= 20 && <DeveloperTools toolId={toolId} />}
        {toolId >= 21 && toolId <= 30 && <TextTools toolId={toolId} />}
        {toolId >= 31 && toolId <= 40 && <ImageTools toolId={toolId} lang={lang} />}
        {toolId >= 41 && toolId <= 50 && <DataTools toolId={toolId} />}
        {toolId >= 51 && toolId <= 60 && <HealthTools toolId={toolId} />}
        {toolId >= 61 && toolId <= 70 && <TimeTools toolId={toolId} lang={lang} />}
        {toolId >= 71 && toolId <= 80 && <SEOTools toolId={toolId} />}
        {toolId >= 81 && toolId <= 90 && <MathTools toolId={toolId} />}
        {toolId >= 91 && toolId <= 100 && <EntertainmentTools toolId={toolId} />}
      </div>
    </div>
  );
}
