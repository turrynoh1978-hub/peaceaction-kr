import React, { useState } from 'react';
import { CreditCard, Building2, CheckCircle2, Copy, FileText, Heart, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const SponsorshipSection: React.FC = () => {
  const [copiedBank, setCopiedBank] = useState(false);
  const { language, t } = useLanguage();

  const bankAccount = {
    bank: t('spons.bankName', '농협은행'),
    account: '301-0387-9572-41',
    holder: t('spons.accountHolder', '사단법인 평화시민행동')
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(`${bankAccount.bank} ${bankAccount.account} ${bankAccount.holder}`);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  return (
    <section id="sponsorship" className="py-20 bg-white relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
            <Heart className="w-3.5 h-3.5 text-teal-600 fill-teal-600/30" />
            <span>{t('spons.sectionTag', '후원 안내 & 혜택')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            {t('spons.sectionTitle', '지속 가능한 평화를 만드는 후원 안내')}
          </h2>
          <p className="text-slate-600 text-base">
            {t('spons.sectionSubtitle', '기억과 평화의 집의 모든 후원금은 기부금품법 및 법인 재정 공개 규정에 따라 투명하게 관리됩니다.')}
          </p>
        </div>

        {/* 2 Column Layout: Sponsorship Types & Direct Bank Transfer Account */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          
          {/* Card 1: Direct Bank Transfer Info */}
          <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full">
                  {t('spons.card1Tag', '직접 계좌 입금 안내')}
                </span>
                <Building2 className="w-6 h-6 text-emerald-400" />
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-2">
                  {t('spons.card1Title', '기억과 평화의 집 후원 전용 계좌')}
                </h3>
                <p className="text-slate-300 text-sm">
                  {t('spons.card1Desc', '인터넷뱅킹, 무통장 입금으로 후원에 동참하실 수 있습니다.')}
                </p>
              </div>

              <div className="bg-black/30 backdrop-blur-md rounded-2xl p-5 border border-white/10 space-y-2">
                <div className="text-xs text-slate-400">{t('spons.bankInfoLabel', '후원 계좌 정보')}</div>
                <div className="text-xl sm:text-2xl font-extrabold text-emerald-300 font-mono tracking-wide">
                  {bankAccount.bank} {bankAccount.account}
                </div>
                <div className="text-xs text-slate-300">
                  {language === 'en' ? 'Account Holder: ' : '예금주: '}
                  <strong className="text-white">{bankAccount.holder}</strong>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={handleCopyAccount}
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Copy className="w-4 h-4" />
                <span>
                  {copiedBank
                    ? t('spons.copySuccess', '계좌번호가 복사되었습니다!')
                    : t('spons.copyBtn', '계좌번호 복사하기')}
                </span>
              </button>
            </div>
          </div>

          {/* Card 2: Tax Deduction & Donor Benefits */}
          <div className="bg-slate-50 rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-teal-700 font-bold text-sm">
                <FileText className="w-5 h-5 text-teal-600" />
                <span>{t('spons.card2Tag', '연말정산 기부금 소득공제 혜택')}</span>
              </div>

              <h3 className="text-2xl font-bold text-slate-800">
                {t('spons.card2Title', '기부금 영수증 발급 세제 혜택 (발급 준비중)')}
              </h3>

              <ul className="space-y-3 text-slate-600 text-sm">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>{t('spons.benefit1Title', '지정기부금 단체:')}</strong>{' '}
                    {t('spons.benefit1Desc', '개인 후원 시 소득금액의 30% 한도 내에서 15%(3,000만원 초과분은 30%) 세액공제 혜택이 제공됩니다.')}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>{t('spons.benefit2Title', '법인 후원:')}</strong>{' '}
                    {t('spons.benefit2Desc', '법인 소득금액의 10% 한도 내에서 손금산입(비용 인정) 혜택이 적용됩니다.')}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>{t('spons.benefit3Title', '국세청 연말정산 간소화:')}</strong>{' '}
                    {t('spons.benefit3Desc', '기부금 영수증 발급 서비스는 현재 준비 중입니다.')}
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-teal-50/80 rounded-2xl border border-teal-100 text-xs text-teal-900 leading-relaxed">
              {t('spons.contactNote', '* 기부금 영수증 발급 문의 (준비중): 전화 031-823-6155 / 이메일 peaceaction6155@gmail.com')}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
