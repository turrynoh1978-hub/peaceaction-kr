import React from 'react';
import { Heart, ArrowRight, Shield, Users, MessageSquare, Sparkles } from 'lucide-react';
import { LogoIcon } from './LogoIcon';
import { VideoSection } from './VideoSection';
import { CAMPAIGN_STATS } from '../data/initialData';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onDonateClick: () => void;
  onExploreClick: () => void;
  cheerCount?: number;
}

export const Hero: React.FC<HeroProps> = ({ onDonateClick, onExploreClick, cheerCount = 0 }) => {
  const { language, t } = useLanguage();
  const percent = Math.round((CAMPAIGN_STATS.currentAmount / CAMPAIGN_STATS.targetAmount) * 100);

  return (
    <section id="hero" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-gradient-to-b from-sky-50/90 via-teal-50/60 to-emerald-50/30 overflow-hidden">
      {/* Background Decorative Soft Blobs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-20 right-10 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Hero Content (Order 1 on mobile) */}
          <div className="order-1 lg:col-span-7 space-y-6 text-center lg:text-left">
            <button
              onClick={onDonateClick}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300 hover:bg-emerald-200/80 text-emerald-900 text-xs font-bold tracking-wide transition-all cursor-pointer shadow-2xs group"
            >
              <LogoIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>{t('hero.badge', '윤금이 씨 사건 터 시민자산화사업 / 평화와 기억')}</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 ml-0.5" />
            </button>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 leading-tight sm:leading-snug tracking-tight text-balance">
              {t('hero.titleLine1', '1992년 윤금이 씨 사건 현장을')}{' '}
              {language === 'ko' && <br className="hidden sm:block" />}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600">
                {t('hero.titleLine2', '기억과 평화의 집으로')}
              </span>
            </h1>

            <p className={`text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed ${language === 'ko' ? 'whitespace-pre-line' : 'text-pretty break-words'}`}>
              {t('hero.description')}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onDonateClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 via-teal-600 to-sky-600 hover:from-emerald-600 hover:to-sky-700 text-white font-bold text-base shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Heart className="w-5 h-5 fill-white/20 group-hover:scale-110 transition-transform" />
                <span>{t('hero.btnDonate', '기억과 평화의 집 후원 참여하기')}</span>
              </button>

              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/90 hover:bg-emerald-50/80 text-slate-700 font-semibold text-base border border-teal-200/90 shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t('hero.btnNews', '소식 & 활동 보기')}</span>
                <ArrowRight className="w-4 h-4 text-teal-600" />
              </button>
            </div>

            {/* Trust Badge */}
            <div className="pt-3 flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-emerald-600" /> {t('hero.trustBadge1', '지정기부금 단체 등록 추진 준비 중')}
              </span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="hidden sm:flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" /> {t('hero.trustBadge2', '투명한 재정 공시')}
              </span>
            </div>
          </div>

          {/* Video Section (Order 2 on mobile - after trust badge and before campaign status, Order 3 / col-span-12 on desktop) */}
          <div className="order-2 lg:order-3 lg:col-span-12 mt-2 lg:mt-6">
            <VideoSection />
          </div>

          {/* Right Campaign Progress Feature Card (Order 3 on mobile - after video section, Order 2 / col-span-5 on desktop) */}
          <div className="order-3 lg:order-2 lg:col-span-5">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-7 shadow-xl border border-teal-100/90 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/40 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="inline-block text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md mb-1">
                    {t('hero.campaignBadge', '건립 & 운영 캠페인')}
                  </span>
                  <h3 className="text-lg font-bold text-slate-800">
                    {t('hero.campaignTitle', '기억과 평화의 집 모금')}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-emerald-600">
                    {percent}%
                  </span>
                  <span className="block text-xs text-slate-500">{t('hero.campaignRate', '달성률')}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="my-5 space-y-2">
                <div className="flex justify-between text-xs text-slate-600 font-medium">
                  <span>
                    {t('hero.currentAmountLabel', '현재 모금액:')}{' '}
                    <strong className="text-slate-800 font-bold">
                      {language === 'en' ? `$${Math.round(CAMPAIGN_STATS.currentAmount / 1300).toLocaleString()} (~` : ''}
                      {CAMPAIGN_STATS.currentAmount.toLocaleString()}원
                      {language === 'en' ? ')' : ''}
                    </strong>
                  </span>
                  <span>
                    {t('hero.targetAmountLabel', '목표액:')} {CAMPAIGN_STATS.targetAmount.toLocaleString()}원
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden p-0.5 border border-slate-200/60">
                  <div
                    className="bg-gradient-to-r from-teal-400 via-emerald-500 to-sky-500 h-full rounded-full transition-all duration-1000 shadow-xs"
                    style={{ width: `${Math.min(100, percent)}%` }}
                  ></div>
                </div>
              </div>

              {/* Quick Stat Indicators */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-emerald-50/60 rounded-xl p-3 border border-emerald-100/80">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-medium">
                    <Users className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t('hero.donorsLabel', '함께한 시민 기부자')}</span>
                  </div>
                  <div className="text-lg font-bold text-slate-800 mt-0.5">
                    {CAMPAIGN_STATS.donorCount.toLocaleString()} {t('hero.unitPeople', '명')}
                  </div>
                </div>

                <div className="bg-sky-50/60 rounded-xl p-3 border border-sky-100/80">
                  <div className="flex items-center gap-1.5 text-xs text-sky-800 font-medium">
                    <MessageSquare className="w-3.5 h-3.5 text-sky-600" />
                    <span>{t('hero.cheersLabel', '기부챌린지 응원한마디')}</span>
                  </div>
                  <div className="text-lg font-bold text-slate-800 mt-0.5">
                    {cheerCount.toLocaleString()} {t('hero.unitCount', '건')}
                  </div>
                </div>
              </div>

              {/* Direct Donate Button in Card */}
              <button
                onClick={onDonateClick}
                className="w-full mt-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>{t('hero.btnDonateCard', '지금 모금 동참하기')}</span>
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
