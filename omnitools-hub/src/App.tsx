/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Search, Wrench, ArrowRight, ArrowLeft } from 'lucide-react';
import { toolsData, categories } from './toolsData';
import { AdUnit, ContainerAd } from './components/AdUnit';
import { ToolModal } from './components/ToolModal';
import { uiTranslations, toolTranslations } from './translations';

export default function App() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Tools');
  const [activeToolId, setActiveToolId] = useState<number | null>(null);

  // Sync RTL/LTR attributes with active language
  useEffect(() => {
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  const handleToolClick = (toolId: number) => {
    try {
      window.open('https://www.effectivecpmnetwork.com/en3zgmfw?key=9077632333de4443e98ab2fbb7b01377', '_blank');
    } catch (e) {
      console.warn('Adsterra pop-under blocked or could not open:', e);
    }
    setActiveToolId(toolId);
  };

  // Filter tools based on search query (matching both English or Arabic names/descriptions)
  const filteredTools = useMemo(() => {
    return toolsData.filter(tool => {
      const enName = tool.name.toLowerCase();
      const enDesc = tool.desc.toLowerCase();
      const arName = (toolTranslations[tool.id]?.ar?.name || '').toLowerCase();
      const arDesc = (toolTranslations[tool.id]?.ar?.desc || '').toLowerCase();
      
      const query = searchQuery.toLowerCase();
      const matchesSearch = enName.includes(query) || 
                            enDesc.includes(query) || 
                            arName.includes(query) || 
                            arDesc.includes(query);
                            
      const matchesCategory = activeCategory === 'All Tools' || tool.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const isAr = lang === 'ar';
  const trans = uiTranslations[lang];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 pb-16 md:pb-0">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                <Wrench size={22} className="transform rotate-45" />
              </div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {trans.logo}
              </span>
            </div>
            
            {/* Desktop Search Bar (Adapts layout for LTR vs RTL) */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
              <div className={`absolute inset-y-0 ${isAr ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                <Search className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder={trans.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`block w-full ${isAr ? 'pr-10 pl-3' : 'pl-10 pr-3'} py-2 border border-gray-700 rounded-lg leading-5 bg-gray-900 text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-all text-start`}
              />
            </div>
            
            {/* Language Switch Button */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setLang(prev => prev === 'ar' ? 'en' : 'ar')}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 hover:border-indigo-500 bg-gray-900/50 hover:bg-indigo-600/10 text-gray-200 hover:text-indigo-400 font-semibold text-sm transition-all shadow-md active:scale-95"
              >
                <span>🌐 {isAr ? 'English' : 'العربية'}</span>
              </button>
            </div>
          </div>
          
          {/* Mobile Search */}
          <div className="md:hidden pb-4 relative">
            <div className={`absolute inset-y-0 top-0 ${isAr ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder={trans.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`block w-full ${isAr ? 'pr-10 pl-3' : 'pl-10 pr-3'} py-2 border border-gray-700 rounded-lg leading-5 bg-gray-900 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-indigo-500 sm:text-sm text-start`}
            />
          </div>
        </div>
      </nav>

      {/* Hero section with Top Leaderboard Ads */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white leading-tight">
          {trans.heroTitle} <br className="hidden md:block"/> {trans.heroTitleSub}
        </h1>
        
        {/* Mobile Banner (468x60) right below main title */}
        <div className="flex justify-center mb-6">
          <AdUnit className="md:hidden" options={{ key: 'ca9630c8be0c8d33ba37f28fd19df7d7', format: 'iframe', height: 60, width: 468, params: {} }} />
        </div>

        <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
          {trans.heroSubtitle}
        </p>
        
        {/* Desktop Top Leaderboard Ad (728x90) */}
        <div className="w-full flex items-center justify-center">
          <AdUnit className="hidden md:flex" options={{ key: '9427c55437641048ad07b44bcdd0fcf4', format: 'iframe', height: 90, width: 728, params: {} }} />
        </div>
      </header>

      {/* Main Layout Grid */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-24 flex flex-col lg:flex-row gap-8 justify-center">
        
        {/* Left/Right Sidebar Banner depending on dir (160x600 for desktop) */}
        <aside className="hidden lg:block w-[160px] shrink-0">
          <div className="sticky top-24 flex justify-center">
            <AdUnit options={{ key: 'e216fb1925be6800df62efe462659566', format: 'iframe', height: 600, width: 160, params: {} }} />
          </div>
        </aside>

        {/* Core Main Area */}
        <div className="flex-1 max-w-5xl">
          
          {/* Categories bar */}
          <div className="flex overflow-x-auto pb-4 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar gap-2" dir={isAr ? "rtl" : "ltr"}>
            {categories.map(cat => {
              const localizedCatName = trans.categories[cat as keyof typeof trans.categories] || cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-4 py-2.5 rounded-full text-sm font-semibold transition-all border cursor-pointer ${
                    activeCategory === cat 
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                      : 'bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                  }`}
                >
                  {localizedCatName}
                </button>
              );
            })}
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map((tool, index) => {
              const localizedName = toolTranslations[tool.id]?.[lang]?.name || tool.name;
              const localizedDesc = toolTranslations[tool.id]?.[lang]?.desc || tool.desc;
              const localizedCat = trans.categories[tool.category as keyof typeof trans.categories] || tool.category;

              return (
                <React.Fragment key={tool.id}>
                  {/* Native Inline Ad every 10th item (300x250 container) */}
                  {index > 0 && index % 10 === 0 && (
                    <div className="sm:col-span-2 lg:col-span-3 flex justify-center py-4">
                       <AdUnit options={{ key: 'd9ee6f54b1b0dc88cc20e64a263f4e38', format: 'iframe', height: 250, width: 300, params: {} }} />
                    </div>
                  )}
                  
                  <div 
                    onClick={() => handleToolClick(tool.id)}
                    className="group flex flex-col bg-gray-950 border border-gray-800 hover:border-indigo-500/50 rounded-xl p-5 hover:bg-gray-900/50 transition-all cursor-pointer hover:shadow-xl hover:shadow-indigo-500/10 active:scale-[0.98]"
                  >
                    <div className="flex items-start gap-4 mb-3">
                      <div className="p-2.5 bg-gray-900 rounded-lg text-emerald-400 group-hover:scale-110 group-hover:text-emerald-300 transition-transform">
                        <tool.icon size={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-100 group-hover:text-white transition-colors line-clamp-1 text-start">
                          {localizedName}
                        </h3>
                        <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider block mt-0.5 text-start">
                          {localizedCat}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-2 mt-auto text-start">
                      {localizedDesc}
                    </p>
                  </div>
                </React.Fragment>
              );
            })}
            
            {/* Empty search results fallback */}
            {filteredTools.length === 0 && (
              <div className="col-span-full py-20 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-900 mb-4 text-gray-600">
                  <Search size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-300">{trans.noToolsFound}</h3>
                <p className="text-gray-500 mt-2">{trans.noToolsFoundDesc}</p>
              </div>
            )}
          </div>

          {/* Smartlink Call to Action button (Centered with dynamic animation) */}
          <div className="flex justify-center my-14">
            <a 
              href="https://www.effectivecpmnetwork.com/en3zgmfw?key=9077632333de4443e98ab2fbb7b01377" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="animate-bounce px-12 py-4 bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full text-white font-bold text-xl md:text-2xl shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_45px_rgba(99,102,241,0.5)] hover:scale-105 transition-transform flex items-center gap-3"
            >
              <span>{trans.continueButton}</span>
              {isAr ? <ArrowLeft size={24} /> : <ArrowRight size={24} />}
            </a>
          </div>

          {/* Native container ad at the bottom of the tools panel */}
          <div className="mt-12 bg-gray-900/10 p-4 rounded-xl border border-gray-800/50">
            <ContainerAd />
          </div>

        </div>

        {/* Right/Left Sidebar (300x250) depending on dir */}
        <aside className="hidden xl:block w-[300px] shrink-0">
          <div className="sticky top-24 flex justify-center">
            <AdUnit options={{ key: 'd9ee6f54b1b0dc88cc20e64a263f4e38', format: 'iframe', height: 250, width: 300, params: {} }} />
          </div>
        </aside>
      </main>

      {/* Mobile Sticky Bottom Ad (320x50) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-slate-950/95 border-t border-gray-800 flex justify-center py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
         <AdUnit options={{ key: 'e762581ec23103e4b00cc13f38417fb5', format: 'iframe', height: 50, width: 320, params: {} }} />
      </div>

      {/* Tool Execution Environment Modal */}
      <ToolModal 
        toolId={activeToolId} 
        onClose={() => setActiveToolId(null)} 
        lang={lang}
      />
    </div>
  );
}
