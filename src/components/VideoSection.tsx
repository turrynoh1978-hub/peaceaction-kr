import React from 'react';
import { Play, Volume2, Film } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const VideoSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="video" className="py-12 lg:py-16 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-teal-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold tracking-wide">
            <Film className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t('vid.sectionTag', '소개 동영상')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            {t('vid.sectionTitle', '기억과 평화의 집에 함께하는 사람들')}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {t('vid.sectionDesc', '기억과 평화의 집 추진위원들의 이야기를 영상으로 만나보세요.')}
          </p>
        </div>

        {/* Video Player Container */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-700/80 bg-slate-950 group">
          <div className="aspect-video w-full relative">
            <iframe
              src="https://www.youtube.com/embed/GQeETXAABTY?autoplay=1&mute=1&controls=1&loop=1&playlist=GQeETXAABTY&rel=0&playsinline=1"
              title="기억과 평화의 집에 함께하는 사람들"
              className="w-full h-full border-0 rounded-2xl sm:rounded-3xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Autoplay & Sound Notice */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400 bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-2.5">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{t('vid.autoplayNotice', '※ 영상이 자동으로 재생됩니다. 소리를 들으시려면 영상 플레이어 하단의 음소거를 해제해 주세요.')}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300 font-semibold shrink-0">
            <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
            <span>YouTube Official</span>
          </div>
        </div>
      </div>
    </section>
  );
};
