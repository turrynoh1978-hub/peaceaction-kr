import React, { useState, useEffect } from 'react';
import { CardNews } from '../types';
import {
  Calendar,
  Heart,
  ChevronRight,
  Sparkles,
  Share2,
  X,
  ChevronLeft,
  BookOpen,
  ExternalLink,
  Tv,
  Play,
  Video,
  Film
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NewsSectionProps {
  newsList: CardNews[];
  onLikeNews: (id: string) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ newsList, onLikeNews }) => {
  const [selectedNews, setSelectedNews] = useState<CardNews | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const { language, t } = useLanguage();

  const handleOpenNews = (item: CardNews) => {
    setSelectedNews(item);
    setCurrentSlideIndex(0);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedNews(null);
      }
    };
    if (selectedNews) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedNews]);

  // Filter list by category
  const cheerVideoCount = newsList.filter((item) => item.youtubeId || item.badge === '후원 응원').length;

  const filteredNews = newsList.filter((item) => {
    if (selectedCategory === '전체') return true;
    if (selectedCategory === '후원 응원 영상') return item.youtubeId || item.badge === '후원 응원' || item.isVideo;
    if (selectedCategory === '소식') return item.category === '소식';
    if (selectedCategory === '활동') return item.category === '활동' && !item.youtubeId;
    return true;
  });

  return (
    <section id="news" className="py-20 bg-slate-50 relative scroll-mt-20">
      <div id="activities" className="absolute top-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100/80 text-teal-800 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>{t('news.sectionTag', '소식 및 활동')}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              {t('news.sectionTitle', '기억과 평화의 집 소식')}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              {t('news.sectionSubtitle', '기억과 평화의 집의 생생한 사업 소식과 각계인사 후원 응원 영상을 확인해보세요.')}
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-200/70 p-1.5 rounded-2xl shrink-0">
            <button
              onClick={() => setSelectedCategory('전체')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedCategory === '전체'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              전체 ({newsList.length})
            </button>
            <button
              onClick={() => setSelectedCategory('후원 응원 영상')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === '후원 응원 영상'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-rose-700 bg-rose-50/80 hover:bg-rose-100'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>후원 응원 영상 ({cheerVideoCount})</span>
            </button>
            <button
              onClick={() => setSelectedCategory('소식')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedCategory === '소식'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              소식
            </button>
            <button
              onClick={() => setSelectedCategory('활동')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedCategory === '활동'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              활동
            </button>
          </div>
        </div>

        {/* Card News Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredNews.map((item) => {
            const displayTitle = language === 'en' && item.titleEn ? item.titleEn : item.title;
            const displaySummary = language === 'en' && item.summaryEn ? item.summaryEn : item.summary;
            const displayAuthor = language === 'en' && item.authorEn ? item.authorEn : item.author;
            const displayCategory = language === 'en'
              ? (item.categoryEn || (item.category === '소식' ? 'News' : item.category === '활동' ? 'Activities' : item.category === '공지' ? 'Notice' : 'Archive'))
              : item.category;

            const isVideoCard = Boolean(item.youtubeId || item.isVideo || item.badge === '후원 응원');

            return (
              <article
                key={item.id}
                onClick={() => handleOpenNews(item)}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col group cursor-pointer"
              >
                {/* Thumbnail Container with Badge */}
                <div className="relative h-52 overflow-hidden bg-slate-900">
                  <img
                    src={item.thumbnail}
                    alt={displayTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />

                  {/* Play Button Overlay for Videos */}
                  {isVideoCard && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-red-600 transition-all">
                        <Play className="w-6 h-6 fill-white ml-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Top Left Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
                    {isVideoCard ? (
                      <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-red-600 to-rose-600 shadow-xs flex items-center gap-1">
                        <Play className="w-3 h-3 fill-white" />
                        <span>{item.badge || '후원 응원'}</span>
                      </span>
                    ) : (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-xs ${
                          item.category === '활동'
                            ? 'bg-emerald-600'
                            : item.category === '소식'
                            ? 'bg-teal-600'
                            : item.category === '공지'
                            ? 'bg-amber-600'
                            : 'bg-sky-600'
                        }`}
                      >
                        {displayCategory}
                      </span>
                    )}

                    {item.featured && (
                      <span className="bg-rose-500 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-2xs">
                        HOT
                      </span>
                    )}
                    {!isVideoCard && item.badge && (
                      <span className="bg-amber-400 text-slate-900 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold shadow-2xs">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Card News Badge Overlay */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-2">
                    {isVideoCard ? (
                      <span className="bg-black/75 backdrop-blur-md text-white text-[11px] px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 shadow-xs border border-white/10">
                        <Video className="w-3.5 h-3.5 text-rose-400" />
                        <span>영상 바로보기</span>
                      </span>
                    ) : (
                      <>
                        {item.externalLink && (
                          <span className="bg-red-600/90 text-white text-[11px] px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 shadow-xs">
                            <Play className="w-3 h-3 fill-white" />
                            {t('news.watchStream', '방송 시청하기')}
                          </span>
                        )}
                        <div className="bg-black/60 backdrop-blur-md text-white text-[11px] px-2.5 py-1 rounded-lg font-medium flex items-center gap-1">
                          <BookOpen className="w-3 h-3 text-teal-300" />
                          <span>{item.slides.length} slides</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-teal-600" />
                        {item.date}
                      </span>
                      <span>•</span>
                      <span>{displayAuthor}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-teal-700 transition-colors line-clamp-2 leading-snug">
                      {displayTitle}
                    </h3>

                    <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {displaySummary}
                    </p>
                  </div>

                  {/* Card Footer Meta */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                    <span className="text-rose-600 font-bold flex items-center gap-1">
                      {isVideoCard ? (
                        <>
                          <Play className="w-3.5 h-3.5 fill-rose-600" />
                          <span>응원 영상 시청</span>
                        </>
                      ) : (
                        <span className="text-teal-700 font-bold flex items-center gap-0.5">
                          {t('news.readMore', '자세히 보기')}
                        </span>
                      )}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-teal-700 transition-all" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Card News Detail Reader Modal */}
        {selectedNews && (
          <div
            onClick={() => setSelectedNews(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-md overflow-y-auto animate-fade-in cursor-pointer"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 relative my-6 cursor-default"
            >
              
              {/* Header bar */}
              <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-white text-xs font-bold px-2.5 py-1 rounded-md ${
                    selectedNews.youtubeId || selectedNews.badge === '후원 응원' ? 'bg-rose-600' : 'bg-emerald-500'
                  }`}>
                    {selectedNews.badge || (
                      language === 'en'
                        ? (selectedNews.categoryEn || (selectedNews.category === '소식' ? 'News' : selectedNews.category === '활동' ? 'Activities' : selectedNews.category === '공지' ? 'Notice' : 'Archive'))
                        : selectedNews.category
                    )}
                  </span>
                  {selectedNews.featured && (
                    <span className="bg-rose-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                      HOT
                    </span>
                  )}
                  <span className="text-slate-400 text-xs hidden sm:inline">
                    {selectedNews.date}
                  </span>
                </div>
                
                {/* 1. Top Right Close Button */}
                <button
                  onClick={() => setSelectedNews(null)}
                  className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-rose-600/80 transition-all cursor-pointer flex items-center justify-center group"
                  aria-label="Close"
                  title="Close (ESC)"
                >
                  <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>

              {/* Media Viewer: YouTube Player OR Slide Viewer */}
              {selectedNews.youtubeId ? (
                <div className="relative bg-slate-950 aspect-video w-full flex items-center justify-center overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedNews.youtubeId}?autoplay=1&rel=0`}
                    title={selectedNews.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="relative bg-slate-950 text-white aspect-[4/3] sm:aspect-[16/10] flex items-center justify-center overflow-hidden">
                  <img
                    src={selectedNews.slides[currentSlideIndex] || selectedNews.thumbnail}
                    alt={`Slide ${currentSlideIndex + 1}`}
                    className="w-full h-full object-contain"
                  />

                  {/* Slide Controls */}
                  {selectedNews.slides.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setCurrentSlideIndex((prev) =>
                            prev === 0 ? selectedNews.slides.length - 1 : prev - 1
                          )
                        }
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
                        aria-label="Previous Slide"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() =>
                          setCurrentSlideIndex((prev) =>
                            prev === selectedNews.slides.length - 1 ? 0 : prev + 1
                          )
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
                        aria-label="Next Slide"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>

                      {/* Pagination Dots */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/50 px-3 py-1 rounded-full">
                        {selectedNews.slides.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentSlideIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              currentSlideIndex === idx
                                ? 'bg-emerald-400 w-5'
                                : 'bg-white/50 hover:bg-white/80'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Article Content Details */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[45vh] overflow-y-auto">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2 leading-snug">
                    {language === 'en' && selectedNews.titleEn ? selectedNews.titleEn : selectedNews.title}
                  </h2>
                  <p className="text-xs text-slate-500">
                    작성자: {language === 'en' && selectedNews.authorEn ? selectedNews.authorEn : selectedNews.author} • {selectedNews.date}
                  </p>
                </div>

                <div className={`prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-100 ${language === 'ko' ? 'whitespace-pre-line' : 'text-pretty break-words'}`}>
                  {language === 'en' && selectedNews.contentEn ? selectedNews.contentEn : selectedNews.content}
                </div>

                {/* External Video Watch Box */}
                {(selectedNews.externalLink || selectedNews.youtubeId) && (
                  <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                        <Tv className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm sm:text-base">
                          {language === 'en' && selectedNews.titleEn ? selectedNews.titleEn : selectedNews.title}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          YouTube 공식 채널에서 원본 영상 보기
                        </div>
                      </div>
                    </div>
                    <a
                      href={selectedNews.externalLink || `https://www.youtube.com/watch?v=${selectedNews.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-600 text-white font-bold text-xs sm:text-sm hover:bg-red-700 transition-all shadow-md shrink-0 w-full sm:w-auto cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>{t('news.watchStream', 'YouTube에서 시청하기')}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

                {/* Actions: Like & Share */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <button
                    onClick={() => {
                      onLikeNews(selectedNews.id);
                      setSelectedNews({
                        ...selectedNews,
                        likes: selectedNews.likes + 1,
                      });
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-50 text-rose-700 font-semibold hover:bg-rose-100 transition-colors cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-rose-600 text-rose-600" />
                    <span>{t('news.likes', '좋아요')} {selectedNews.likes}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors cursor-pointer text-sm"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>{copied ? t('news.linkCopied', '링크가 복사되었습니다!') : t('news.share', '공유하기')}</span>
                    </button>
                    <button
                      onClick={() => setSelectedNews(null)}
                      className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all text-sm cursor-pointer shadow-xs active:scale-95"
                    >
                      <X className="w-4 h-4" />
                      <span>{t('news.close', '닫기')}</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

