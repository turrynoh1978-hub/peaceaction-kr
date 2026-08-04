import React, { useState } from 'react';
import { ARTICLES_OF_ASSOCIATION_PURPOSE } from '../data/initialData';
import { ChevronDown, ChevronUp, Scale, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ArticlesAccordion: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, t } = useLanguage();

  return (
    <div className="bg-slate-900 border-t border-slate-800 text-slate-300 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Accordion Toggle Header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-slate-800/80 hover:bg-slate-800 p-4 sm:p-5 rounded-2xl border border-slate-700/80 flex items-center justify-between text-left transition-all cursor-pointer group"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-900/80 text-teal-300 flex items-center justify-center border border-teal-700/50 group-hover:scale-105 transition-transform">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs text-teal-400 font-bold block">
                {t('art.header', '사단법인 법률 정관 정보')}
              </span>
              <span className="text-sm sm:text-base font-bold text-white">
                {t('art.title', '정관 목적 원문 보기')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 group-hover:text-white">
            <span>{isOpen ? (language === 'en' ? 'Close' : '닫기') : (language === 'en' ? 'View Details' : '펼쳐보기')}</span>
            {isOpen ? (
              <ChevronUp className="w-5 h-5 text-emerald-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </button>

        {/* Collapsible Content */}
        {isOpen && (
          <div className="mt-3 bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4 animate-fade-in text-xs sm:text-sm leading-relaxed">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-emerald-400 font-bold text-sm">
                {t('art.art2Title', ARTICLES_OF_ASSOCIATION_PURPOSE.title)}
              </span>
              <span className="text-slate-500 text-xs">
                {t('art.header', ARTICLES_OF_ASSOCIATION_PURPOSE.articleNumber)}
              </span>
            </div>

            <p className={`text-slate-200 leading-relaxed font-sans ${language === 'ko' ? 'whitespace-pre-line break-keep' : 'text-pretty break-words'}`}>
              {t('art.art2Content', ARTICLES_OF_ASSOCIATION_PURPOSE.content)}
            </p>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-500" /> {language === 'en' ? 'Official Articles Disclosure' : '주무관청 공익법인 정관 공시'}
              </span>
              <span>{ARTICLES_OF_ASSOCIATION_PURPOSE.boardMembers}</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
