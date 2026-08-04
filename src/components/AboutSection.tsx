import React from 'react';
import { ShieldCheck, HeartHandshake, BookOpen, Quote, History, Flag } from 'lucide-react';
import { LogoIcon } from './LogoIcon';
import { useLanguage } from '../context/LanguageContext';

export const AboutSection: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-white relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <LogoIcon className="w-3.5 h-3.5" />
            <span>{t('about.sectionTitle', '사단법인 평화시민행동 소개')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight text-balance">
            {t('about.headingTitle', '기억으로 일구는 평화의 미래')}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            {t('about.sectionSubtitle', '사단법인 평화시민행동은 분단의 상처를 치유하는 실천행동으로 평화인권의 가치를 실현합니다.')}
          </p>
        </div>

        {/* Founding Background & Mission Banner Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          
          {/* Founding Info */}
          <div className="bg-gradient-to-br from-emerald-50 via-teal-50/60 to-sky-50/50 p-8 rounded-3xl border border-emerald-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-emerald-800 font-bold text-sm">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                <History className="w-4 h-4" />
              </div>
              <span>{t('about.cardTitle', '시민들의 힘으로 세우는 평화와 인권의 공간')}</span>
            </div>

            <h3 className="text-2xl font-bold text-slate-800 leading-snug">
              {t('about.foundingDate', '2026년 4월 27일 창립')}
            </h3>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              {t('about.cardText')}
            </p>
          </div>

          {/* Our Mission */}
          <div className="bg-gradient-to-br from-teal-900 to-slate-900 text-white p-8 rounded-3xl shadow-md space-y-4 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="space-y-3 relative z-10">
              <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 flex items-center justify-center">
                  <Flag className="w-4 h-4" />
                </div>
                <span>{t('about.declarationTitle', '창립 선언문 중')}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug text-balance">
                {t('about.declarationHeader', '평화와 인권의 가치를 깊이 뿌리내립니다')}
              </h3>

              <p className="text-slate-200 text-sm sm:text-base leading-relaxed italic">
                {t('about.declarationQuote')}
              </p>
            </div>
          </div>

        </div>

        {/* Core Values & Activities Section Title */}
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
            {t('about.coreValuesTitle', '핵심 가치 및 주요 활동')}
          </h3>
        </div>

        {/* 3 Core Values Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-50/80 hover:bg-emerald-50/40 p-8 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all shadow-2xs group">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-3">
              {t('about.val1Title', '역사 기록 & 보존')}
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              {t('about.val1Desc', '잊혀진 미군\'위안부\' 역사를 구술 및 사료로 기록하고 보존합니다.')}
            </p>
          </div>

          <div className="bg-slate-50/80 hover:bg-emerald-50/40 p-8 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all shadow-2xs group">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-3">
              {t('about.val3Title', '의식 전환')}
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              {t('about.val3Desc', '시민들과 함께 평화와 인권의 중요성을 배우고 확산합니다.')}
            </p>
          </div>

          <div className="bg-slate-50/80 hover:bg-emerald-50/40 p-8 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all shadow-2xs group">
            <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-3">
              {t('about.val4Title', '연대와 행동')}
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              {t('about.val4Desc', '국내외 평화인권 단체들과 연대하여 실천적 평화운동을 전개합니다.')}
            </p>
          </div>
        </div>

        {/* Representative Greeting Card */}
        <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-emerald-950 rounded-3xl text-white p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <Quote className="w-10 h-10 text-emerald-400/60 mb-4" />
            
            <p className="text-lg sm:text-xl font-light leading-relaxed text-slate-100 italic mb-8">
              &quot;{t('about.quoteText', '기억과 평화의 집은 한 분 한 분의 정성 어린 시민 모금으로 건립되며, 누구나 찾아와 안식을 얻고 평화를 논하는 열린 시민 공간이 될 것입니다.')}&quot;
            </p>

            <div className="flex items-center justify-end text-right pt-6 border-t border-slate-800">
              <div>
                <span className="block text-xl font-bold text-emerald-300">
                  {t('about.repName', '김대용')}
                </span>
                <span className="text-xs text-slate-400">
                  {t('about.repTitle', '사단법인 평화시민행동 대표이사')}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

