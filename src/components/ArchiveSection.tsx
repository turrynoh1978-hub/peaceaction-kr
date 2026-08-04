import React from 'react';
import { FolderArchive, Clock, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ArchiveSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="archive" className="py-20 bg-slate-100/70 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-100/90 text-sky-800 text-xs font-bold border border-sky-200 shadow-2xs mb-3">
            <FolderArchive className="w-3.5 h-3.5 text-sky-600" />
            <span>{t('archive.tag', '디지털 기록관')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            {t('archive.title', '기억과 평화 아카이브')}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-2">
            {t('archive.subtitle', '기억과 평화의 집 역사 기록 및 구술 자료 모음')}
          </p>
        </div>

        {/* Clean Ready/Preparing Card Box */}
        <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm text-center relative overflow-hidden">
          {/* Subtle background element */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-sky-50 rounded-full blur-2xl pointer-events-none" />
          
          <div className="w-16 h-16 bg-sky-50 text-sky-700 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-sky-100 shadow-xs">
            <Clock className="w-8 h-8" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200/70 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{t('archive.statusBadge', '자료 정리 중')}</span>
          </span>

          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            {t('archive.statusTitle', '아카이브는 현재 준비중입니다.')}
          </h3>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
            {t('archive.statusDesc', '역사 자료 및 구술 기록을 더욱 정갈하게 정리하여 정식 순차 공개할 예정입니다.')}
          </p>
        </div>

      </div>
    </section>
  );
};
