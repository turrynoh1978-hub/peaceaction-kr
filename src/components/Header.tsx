import React, { useState, useEffect } from 'react';
import { NavTab } from '../types';
import { Heart, Menu, X, Globe } from 'lucide-react';
import { LogoIcon } from './LogoIcon';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenDonateModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenDonateModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  const navItems: { label: NavTab; key: string; href: string }[] = [
    { label: '소개', key: 'nav.about', href: '#about' },
    { label: '소식 및 활동', key: 'nav.news', href: '#news' },
    { label: '기억과 평화의 집 후원', key: 'nav.sponsorship', href: '#sponsorship' },
    { label: '아카이브', key: 'nav.archive', href: '#archive' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section scrollSpy detection matching physical DOM layout
      const sections = navItems.map(item => {
        const el = document.querySelector(item.href) as HTMLElement | null;
        return {
          label: item.label,
          offsetTop: el ? el.getBoundingClientRect().top + window.scrollY : 0
        };
      }).filter(s => s.offsetTop > 0);

      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sections[i].offsetTop - 20) {
          setActiveTab(sections[i].label);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveTab]);

  const handleNavClick = (href: string, label: NavTab) => {
    setActiveTab(label);
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: Math.max(0, offsetTop),
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'pastel-blur-header border-b border-emerald-100/80 shadow-xs py-3'
          : 'bg-gradient-to-b from-teal-50/90 via-sky-50/80 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-xs border border-slate-200/90 p-1.5 group-hover:scale-105 transition-transform">
              <LogoIcon className="w-full h-full" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-800 flex items-center gap-1.5">
                {t('header.orgName', '사단법인평화시민행동')}
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
              </span>
              <span className="block text-[11px] text-teal-700/80 font-medium tracking-wide">
                {t('header.subOrgName', 'Peace Citizens Action Inc.')}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-teal-100/80 shadow-2xs">
            {navItems.map((item) => {
              const isActive = activeTab === item.label;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href, item.label);
                  }}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-teal-700 hover:bg-emerald-50/60'
                  }`}
                >
                  {t(item.key, item.label)}
                </a>
              );
            })}
          </nav>

          {/* Right Action Button, Language Toggle & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Language Switcher Pill */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 bg-white/80 hover:bg-emerald-100/80 text-slate-700 hover:text-emerald-900 border border-slate-200/90 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-2xs cursor-pointer"
              title={language === 'ko' ? 'Switch to English' : '한국어로 변경'}
            >
              <Globe className="w-3.5 h-3.5 text-teal-600" />
              <span>{language === 'ko' ? 'EN' : 'KR'}</span>
            </button>

            <button
              onClick={() => {
                handleNavClick('#sponsorship', '기억과 평화의 집 후원');
                onOpenDonateModal();
              }}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white text-sm font-semibold px-4 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all transform active:scale-95 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white/30" />
              <span>{t('header.donateBtn', '기억과 평화의 집 후원')}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-emerald-50 focus:outline-none"
              aria-label={t('header.ariaMenu', '메뉴 열기')}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-emerald-100 shadow-xl px-4 pt-3 pb-6 space-y-2 mt-2">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href, item.label);
                }}
                className={`flex items-center justify-center py-2.5 px-3 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === item.label
                    ? 'bg-emerald-500 text-white font-semibold shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700'
                }`}
              >
                {t(item.key, item.label)}
              </a>
            ))}
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              handleNavClick('#sponsorship', '기억과 평화의 집 후원');
              onOpenDonateModal();
            }}
            className="w-full mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-3 px-4 rounded-xl shadow-md cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-white/20" />
            <span>{t('header.mobileDonateBtn', '기억과 평화의 집 후원 참여하기')}</span>
          </button>
        </div>
      )}
    </header>
  );
};
