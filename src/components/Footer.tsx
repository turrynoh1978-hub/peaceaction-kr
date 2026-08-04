import React from 'react';
import { Phone, Printer, Mail, MapPin, ShieldCheck, ArrowUp } from 'lucide-react';
import { LogoIcon } from './LogoIcon';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          
          {/* Org Logo & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center p-1.5 border border-slate-800 shadow-2xs">
                <LogoIcon className="w-full h-full" />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight block">
                  {t('footer.orgName', '사단법인평화시민행동')}
                </span>
                <span className="text-xs text-teal-400/90 font-medium tracking-wide block">
                  {t('footer.subOrgName', 'Peace Citizens Action Inc.')}
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              {t('footer.desc', '기억과 평화의 집은 역사의 소중한 기록을 수집·보존하고, 미래 세대를 위한 평화 문화 형성 및 인권 증진을 실천하고 행동하는 사단법인입니다.')}
            </p>

            <div className="flex items-center gap-2 text-xs text-teal-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t('footer.taxBadge', '지정기부금 단체 등록 추진 준비 중')}</span>
            </div>
          </div>

          {/* Exact Required Contact Details */}
          <div className="md:col-span-7 space-y-3 bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80">
            <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              {t('footer.regTitle', '법인 및 사업자 등록 정보')}
            </h4>

            <div className="grid sm:grid-cols-2 gap-y-2.5 gap-x-6 text-slate-300 text-xs sm:text-sm">
              <div>
                <span className="text-slate-500 font-semibold mr-2">{t('footer.repLabel', '대표이사:')}</span>
                <span className="font-bold text-white">{t('footer.repValue', '김대용')}</span>
              </div>

              <div>
                <span className="text-slate-500 font-semibold mr-2">{t('footer.bizNoLabel', '고유번호:')}</span>
                <span className="font-mono text-white">329-82-00775</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span className="text-slate-500 font-semibold mr-1">{t('footer.phoneLabel', '전화:')}</span>
                <a href="tel:031-823-6155" className="hover:text-emerald-300 font-mono">031-823-6155</a>
              </div>

              <div className="flex items-center gap-1.5">
                <Printer className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span className="text-slate-500 font-semibold mr-1">{t('footer.faxLabel', '팩스:')}</span>
                <span className="font-mono text-white">031-823-6156</span>
              </div>

              <div className="sm:col-span-2 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span className="text-slate-500 font-semibold mr-1">{t('footer.emailLabel', '이메일:')}</span>
                <a href="mailto:peaceaction6155@gmail.com" className="hover:text-emerald-300 font-mono">peaceaction6155@gmail.com</a>
              </div>

              <div className="sm:col-span-2 flex items-start gap-1.5 pt-1">
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                <span className="text-slate-500 font-semibold mr-1 shrink-0">{t('footer.addressLabel', '주소:')}</span>
                <span className="text-white leading-relaxed">{t('footer.address', '11330 경기도 동두천시 어수로 101번길 35. 3층')}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & Back-to-top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 기억과 평화의 집 (House of Memory & Peace). All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-emerald-300 transition-colors p-2 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer"
          >
            <span>{t('footer.backToTop', '맨 위로 이동')}</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
