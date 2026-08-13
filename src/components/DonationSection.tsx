import React, { useState } from 'react';
import { DonationFormState, DonorRecord } from '../types';
import { CAMPAIGN_STATS } from '../data/initialData';
import {
  Heart,
  ShieldCheck,
  Check,
  Copy,
  CreditCard,
  Building,
  Sparkles,
  Download,
  Share2,
  X,
  Search,
  MessageSquare,
  Award,
  UserCheck,
  Users,
  Target,
  TrendingUp,
  FileText,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface DonationSectionProps {
  donors: DonorRecord[];
  onAddDonor: (newDonor: DonorRecord, amount: number) => void;
  isOpenModalDirectly?: boolean;
  onCloseModalDirectly?: () => void;
}

export const DonationSection: React.FC<DonationSectionProps> = ({
  donors,
  onAddDonor,
  isOpenModalDirectly = false,
  onCloseModalDirectly
}) => {
  const { language, t } = useLanguage();

  // Preset amounts requested: 1만 원, 3만 원, 5만 원, 10만 원, 50만 원, 100만 원
  const presetAmounts = [
    { label: language === 'en' ? '10k KRW' : '1만 원', value: 10000 },
    { label: language === 'en' ? '30k KRW' : '3만 원', value: 30000 },
    { label: language === 'en' ? '50k KRW' : '5만 원', value: 50000 },
    { label: language === 'en' ? '100k KRW' : '10만 원', value: 100000 },
    { label: language === 'en' ? '500k KRW' : '50만 원', value: 500000 },
    { label: language === 'en' ? '1M KRW' : '100만 원', value: 1000000 },
  ];

  const bankAccount = {
    bank: '농협은행',
    account: '301-0387-9572-41',
    holder: '사단법인 평화시민행동'
  };

  const [formState, setFormState] = useState<DonationFormState>({
    amount: 50000,
    customAmount: '',
    donationType: 'once',
    name: '',
    phone: '',
    email: '',
    message: '',
    receiptRequested: false,
    receiptType: 'individual',
    residentId: '',
    businessRegNo: '',
    address: '',
    taxId: '',
    paymentMethod: 'bank',
    isAnonymous: false,
    termsAgreed: true
  });

  const [submittedReceipt, setSubmittedReceipt] = useState<DonorRecord | null>(null);
  const [donorSearchTerm, setDonorSearchTerm] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [accountCopied, setAccountCopied] = useState(false);

  const finalAmount = formState.customAmount
    ? parseInt(formState.customAmount.replace(/,/g, ''), 10) || 0
    : formState.amount;

  const handleSubmitDonation = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formState.name.trim()) {
      setFormError(t('donate.errorName', '성명 또는 단체명을 입력해 주세요.'));
      return;
    }

    if (!formState.phone.trim()) {
      setFormError(t('donate.errorPhone', '연락처를 입력해 주세요.'));
      return;
    }

    if (finalAmount < 1000) {
      setFormError(t('donate.errorAmount', '최소 후원 금액은 1,000원 이상이어야 합니다.'));
      return;
    }

    const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '.');

    const newRecord: DonorRecord = {
      id: `d-${Date.now()}`,
      name: formState.isAnonymous ? (language === 'en' ? 'Anonymous Donor' : '익명 기부자') : formState.name,
      amount: finalAmount,
      date: todayStr,
      message: formState.message || '기억과 평화의 집 건립을 응원합니다!',
      isRecurring: false,
      isAnonymous: formState.isAnonymous,
      phone: formState.phone,
      email: formState.email,
      receiptRequested: formState.receiptRequested,
      receiptType: formState.receiptRequested ? formState.receiptType : undefined,
      residentId: formState.receiptRequested && formState.receiptType === 'individual' ? formState.residentId : undefined,
      businessRegNo: formState.receiptRequested && formState.receiptType === 'corporate' ? formState.businessRegNo : undefined,
      address: formState.receiptRequested ? formState.address : undefined,
      paymentMethod: '후원계좌 입금',
      status: '대기'
    };

    onAddDonor(newRecord, finalAmount);
    setSubmittedReceipt(newRecord);
    if (onCloseModalDirectly) {
      onCloseModalDirectly();
    }

    // Reset form
    setFormState({
      amount: 50000,
      customAmount: '',
      donationType: 'once',
      name: '',
      phone: '',
      email: '',
      message: '',
      receiptRequested: false,
      receiptType: 'individual',
      residentId: '',
      businessRegNo: '',
      address: '',
      taxId: '',
      paymentMethod: 'card',
      isAnonymous: false,
      termsAgreed: true
    });
  };

  const renderFormContent = () => (
    <form onSubmit={handleSubmitDonation} className="space-y-6">
      {/* Step 1: Preset Amount Selection (1만, 3만, 5만, 10만, 50만, 100만 원) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-bold text-slate-800">
            {t('donate.step1Label', '1. 후원 금액 선택 (원)')}
          </label>
          <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            {t('donate.onceTag', '1회 일시 후원')}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mb-2">
          {presetAmounts.map((preset) => {
            const isSelected = !formState.customAmount && formState.amount === preset.value;
            return (
              <button
                key={preset.value}
                type="button"
                onClick={() =>
                  setFormState({
                    ...formState,
                    amount: preset.value,
                    customAmount: ''
                  })
                }
                className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                }`}
              >
                {language === 'en' ? `$${(preset.value / 1000).toFixed(0)}k KRW` : preset.label}
              </button>
            );
          })}
        </div>

        {/* Custom Amount Input */}
        <div className="mt-2">
          <div className="relative">
            <input
              type="number"
              placeholder={t('donate.customAmountPlaceholder', '직접 금액 입력 (원 단위)')}
              value={formState.customAmount}
              onChange={(e) =>
                setFormState({ ...formState, customAmount: e.target.value })
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">
              {t('donate.unitWon', '원')}
            </span>
          </div>
        </div>

        {/* Amount Display */}
        <div className="mt-2 text-right">
          <span className="text-xs text-slate-500">{t('donate.selectedAmountLabel', '선택된 일시 후원 금액:')} </span>
          <span className="text-base sm:text-lg font-extrabold text-emerald-700 ml-1">
            {finalAmount.toLocaleString()}{t('donate.unitWon', '원')}
          </span>
        </div>
      </div>

      {/* Step 2: Donor Info Form */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <label className="block text-sm font-bold text-slate-800">
          {t('donate.step2Label', '2. 후원자 정보 입력')}
        </label>

        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              {t('donate.nameLabel', '성명 또는 단체명 *')}
            </label>
            <input
              type="text"
              required
              placeholder={t('donate.namePlaceholder', '홍길동')}
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:bg-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              {t('donate.phoneLabel', '연락처 *')}
            </label>
            <input
              type="tel"
              required
              placeholder={t('donate.phonePlaceholder', '010-0000-0000')}
              value={formState.phone}
              onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:bg-white focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            {t('donate.emailLabel', '이메일 (기부 영수증 및 소식지 수신용)')}
          </label>
          <input
            type="email"
            placeholder="peace@example.com"
            value={formState.email}
            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:bg-white focus:border-emerald-500 focus:outline-none"
          />
        </div>

        {/* Checkbox Options & Tax Receipt Sub-form */}
        <div className="space-y-2 pt-1">
          <label className="flex items-center gap-2 text-xs sm:text-sm text-slate-800 font-bold cursor-pointer">
            <input
              type="checkbox"
              checked={formState.receiptRequested}
              onChange={(e) =>
                setFormState({ ...formState, receiptRequested: e.target.checked })
              }
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
            />
            <span>{t('donate.receiptCheckbox', '기부금 영수증 발급 신청 (현재 발급 준비중)')}</span>
          </label>

          {/* Sub-form when receiptRequested is checked */}
          {formState.receiptRequested && (
            <div className="mt-2 p-3.5 sm:p-4 bg-emerald-50/80 border border-emerald-200/90 rounded-2xl space-y-3 shadow-2xs">
              {/* Radio buttons: 개인 / 법인·단체 */}
              <div className="flex items-center gap-4 border-b border-emerald-200/80 pb-2.5">
                <span className="text-xs font-bold text-slate-700">{t('donate.receiptTargetLabel', '발급 대상:')}</span>
                <label className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-800 cursor-pointer">
                  <input
                    type="radio"
                    name="receiptType"
                    value="individual"
                    checked={(formState.receiptType || 'individual') === 'individual'}
                    onChange={() => setFormState({ ...formState, receiptType: 'individual' })}
                    className="w-3.5 h-3.5 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>{t('donate.individual', '개인')}</span>
                </label>

                <label className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-800 cursor-pointer">
                  <input
                    type="radio"
                    name="receiptType"
                    value="corporate"
                    checked={formState.receiptType === 'corporate'}
                    onChange={() => setFormState({ ...formState, receiptType: 'corporate' })}
                    className="w-3.5 h-3.5 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>{t('donate.corporate', '법인·단체')}</span>
                </label>
              </div>

              {/* Individual Fields */}
              {(formState.receiptType || 'individual') === 'individual' ? (
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t('donate.residentIdLabel', '주민등록번호 *')}
                    </label>
                    <input
                      type="text"
                      placeholder={t('donate.residentIdPlaceholder', '000000-0000000')}
                      value={formState.residentId || ''}
                      onChange={(e) => setFormState({ ...formState, residentId: e.target.value })}
                      className="w-full bg-white border border-emerald-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t('donate.addressLabel', '주소 *')}
                    </label>
                    <input
                      type="text"
                      placeholder={t('donate.addressPlaceholder', '주소를 입력해 주세요')}
                      value={formState.address || ''}
                      onChange={(e) => setFormState({ ...formState, address: e.target.value })}
                      className="w-full bg-white border border-emerald-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
              ) : (
                /* Corporate Fields */
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t('donate.bizNoLabel', '사업자등록번호 / 고유번호 *')}
                    </label>
                    <input
                      type="text"
                      placeholder={t('donate.bizNoPlaceholder', '000-00-00000 또는 고유번호')}
                      value={formState.businessRegNo || ''}
                      onChange={(e) => setFormState({ ...formState, businessRegNo: e.target.value })}
                      className="w-full bg-white border border-emerald-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t('donate.corpAddressLabel', '법인·단체 소재지(주소) *')}
                    </label>
                    <input
                      type="text"
                      placeholder={t('donate.corpAddressPlaceholder', '법인·단체 소재지 주소를 입력해 주세요')}
                      value={formState.address || ''}
                      onChange={(e) => setFormState({ ...formState, address: e.target.value })}
                      className="w-full bg-white border border-emerald-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Bottom Notice */}
              <p className="text-[11px] sm:text-xs text-emerald-800 leading-relaxed font-medium bg-emerald-100/70 p-2.5 rounded-xl border border-emerald-200/80">
                {t('donate.receiptPrivacyNotice', '※ 입력해주신 정보는 국세청 기부금 영수증 발급 및 연말정산 간소화 서비스 등록 용도로만 안전하게 활용됩니다. (현재 발급 시스템 준비 중이며, 연동 완료 후 순차 안내 예정)')}
              </p>
            </div>
          )}

          <label className="flex items-center gap-2 text-xs text-slate-700 font-medium cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={formState.isAnonymous}
              onChange={(e) =>
                setFormState({ ...formState, isAnonymous: e.target.checked })
              }
              className="w-3.5 h-3.5 rounded text-emerald-600 focus:ring-emerald-500"
            />
            <span>{t('donate.anonymousCheckbox', '익명으로 기부 참여하기 (기부자 벽 성명 비공개)')}</span>
          </label>
        </div>
      </div>

      {/* Step 3: Cheer Message (기부챌린지 응원한마디) */}
      <div className="space-y-2 pt-3 border-t border-slate-100 bg-emerald-50/50 p-3.5 rounded-2xl border border-emerald-100">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>{t('donate.step3Label', '3. 후원자 응원 한마디')}</span>
          </label>
          <span className="text-[11px] text-emerald-700 font-semibold bg-white px-2 py-0.5 rounded-md border border-emerald-200">
            {t('donate.wallPublicTag', '기부자 벽 공개')}
          </span>
        </div>
        <p className="text-xs text-slate-500">
          {t('donate.cheerSubtext', '기억과 평화의 집 건립을 응원하는 따뜻한 희망의 메시지를 남겨주세요.')}
        </p>
        <textarea
          rows={2}
          placeholder={t('donate.cheerPlaceholder', '예: 분단의 아픔을 치유하고 평화의 미래를 만들어가는 소중한 공간이 되길 마음 다해 응원합니다!')}
          value={formState.message}
          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
          className="w-full bg-white border border-emerald-200 rounded-xl p-2.5 text-xs sm:text-sm text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        />
      </div>

      {/* Step 4: Payment Method */}
      <div className="pt-3 border-t border-slate-100 space-y-3">
        <label className="block text-sm font-bold text-slate-800">
          {t('donate.step4Label', '4. 결제 수단 선택')}
        </label>

        {/* Option 1: Selected Account Transfer */}
        <div className="p-4 rounded-2xl bg-emerald-50/80 border-2 border-emerald-500 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-emerald-600 text-white font-extrabold text-[11px] rounded-md">
                {t('donate.selectedTag', '선택')}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-800">
                {t('donate.bankMethodName', '후원 전용 계좌이체 (무통장 입금)')}
              </span>
            </div>
            <Building className="w-4 h-4 text-emerald-600" />
          </div>

          <div className="bg-white p-3 rounded-xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
              <span className="text-emerald-700 font-bold mr-1.5">{t('spons.bankName', '농협은행')}</span>
              <span className="font-extrabold text-slate-900 tracking-wide">301-0387-9572-41</span>
              <span className="text-slate-500 font-normal block sm:inline sm:ml-1.5">
                ({language === 'en' ? 'Holder: Peace Citizens Action Inc.' : '예금주: 사단법인 평화시민행동'})
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText('301-0387-9572-41');
                setAccountCopied(true);
                setTimeout(() => setAccountCopied(false), 2000);
              }}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0 shadow-2xs"
            >
              {accountCopied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{t('donate.copySuccess', '복사 완료!')}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t('donate.copyAccount', '계좌번호 복사')}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Option 2: In Preparation - Credit Card / Easy Pay */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 opacity-90">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-slate-300 text-slate-700 font-bold text-[11px] rounded-md">
              {t('donate.prepTag', '준비 중')}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-600">
              {t('donate.cardMethodName', '신용카드 / 간편결제 (MRN 결제 솔루션 도입 예정)')}
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 pl-1 leading-relaxed">
            {t('donate.prepNotice', '※ 현재 시스템 연동 준비 중이며, 곧 더 편리한 간편결제 서비스를 제공할 예정입니다.')}
          </p>
        </div>

        {/* Payment Guide Notice Box (💳 결제 수단 이용 안내) */}
        <div className="mt-4 p-4 rounded-2xl bg-slate-100/90 border border-slate-200/80 text-xs text-slate-700 space-y-2">
          <div className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
            <span>💳</span>
            <span>{t('donate.paymentGuideHeader', '결제 수단 이용 안내')}</span>
          </div>
          <ul className="space-y-1.5 text-slate-600 leading-relaxed text-[11px] sm:text-xs pl-1">
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-600 font-bold">•</span>
              <span>{t('donate.paymentGuideItem1', '현재 사단법인 평화시민행동의 모금은 후원 전용 계좌를 통한 입금만 가능합니다.')}</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-600 font-bold">•</span>
              <span>{t('donate.paymentGuideItem2', '기부자분들의 편리하고 안전한 결제를 위해 MRN 결제 솔루션(신용카드, 간편결제 등) 도입을 준비 중에 있습니다.')}</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-600 font-bold">•</span>
              <span>{t('donate.paymentGuideItem3', '기부금 영수증 발급 서비스는 현재 준비 중입니다. 발급 시스템 마련 후 순차적으로 안내해 드릴 예정입니다.')}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Error Banner */}
      {formError && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
          {formError}
        </div>
      )}

      {/* Submit CTA Button */}
      <button
        type="submit"
        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-600 to-sky-600 hover:from-emerald-600 hover:to-sky-700 text-white font-extrabold text-sm sm:text-base shadow-md hover:shadow-lg transition-all transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
      >
        <Heart className="w-4 h-4 fill-white" />
        <span>
          {finalAmount.toLocaleString()}{t('donate.unitWon', '원')} {t('donate.submitBtnSuffix', '일시 후원 참여하기')}
        </span>
      </button>
    </form>
  );

  const filteredDonors = donors.filter(d =>
    d.name.includes(donorSearchTerm) || (d.message && d.message.includes(donorSearchTerm))
  );

  const progressPercent = Math.min(
    100,
    Number(((CAMPAIGN_STATS.currentAmount / CAMPAIGN_STATS.targetAmount) * 100).toFixed(1))
  );

  return (
    <section id="sponsorship" className="py-20 bg-gradient-to-b from-sky-50/60 via-teal-50/50 to-white relative scroll-mt-20">
      {/* Anchor alias for compatibility */}
      <div id="donation" className="absolute -top-20 left-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-emerald-800 text-xs font-bold border border-emerald-200 shadow-2xs">
            <Heart className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600/30" />
            <span>{t('don.sectionTag', '윤금이 씨 사건 터 시민자산화사업 / 평화와 기억')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight text-balance">
            {t('don.sectionTitle', '기억과 평화의 집 후원')}
          </h2>
          <p className={`text-slate-600 text-base sm:text-lg leading-relaxed ${language === 'ko' ? 'whitespace-pre-line' : 'text-pretty break-words'}`}>
            {t('don.sectionSubtitle', "윤금이 씨 사건 터를 매입하여 조성하는 '기억과 평화의 집' 건립 및 운영 후원에 함께해 주세요.")}
          </p>
        </div>

        {/* Storytelling Necessity Card */}
        <div className="max-w-4xl mx-auto mb-10 bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100/90 shadow-md">
          <div className="text-center mb-6 space-y-1">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80 inline-block mb-1">
              {t('don.whyTag', '건립 모금의 이유')}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight text-balance">
              {t('don.whyTitle', "왜 '기억과 평화의 집' 건립 모금이 필요할까요?")}
            </h3>
          </div>

          {/* 3 핵심 이유 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            {/* Card 1: 기억 */}
            <div className="bg-gradient-to-b from-slate-50 to-emerald-50/40 p-6 rounded-2xl border border-slate-200/80 hover:border-emerald-300 transition-all flex flex-col justify-between shadow-2xs">
              <div>
                <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm shadow-xs mb-3.5">
                  {t('don.whyBadge1', '기억')}
                </div>
                <h4 className="font-extrabold text-slate-900 text-base sm:text-lg mb-2 leading-snug">
                  {t('don.why1Title', '사라져가는 역사적 현장 보존')}
                </h4>
                <p className="text-sm text-slate-700 font-medium leading-relaxed">
                  {t('don.why1Desc', '동두천 보산동 윤금이 씨 사건 터 매입을 통해 잊혀져 가는 역사의 현장을 온전히 지키고 보존합니다.')}
                </p>
              </div>
            </div>

            {/* Card 2: 인권 */}
            <div className="bg-gradient-to-b from-slate-50 to-teal-50/40 p-6 rounded-2xl border border-slate-200/80 hover:border-teal-300 transition-all flex flex-col justify-between shadow-2xs">
              <div>
                <div className="w-11 h-11 rounded-xl bg-teal-600 text-white flex items-center justify-center font-black text-sm shadow-xs mb-3.5">
                  {t('don.whyBadge2', '인권')}
                </div>
                <h4 className="font-extrabold text-slate-900 text-base sm:text-lg mb-2 leading-snug">
                  {t('don.why2Title', '기지촌 여성 피해자들의 명예 회복')}
                </h4>
                <p className="text-sm text-slate-700 font-medium leading-relaxed">
                  {t('don.why2Desc', "미군'위안부' 피해자들의 가려진 삶과 인권의 역사를 올바르게 기록하고 사회적 명예 회복을 추진합니다.")}
                </p>
              </div>
            </div>

            {/* Card 3: 평화와 시민행동 */}
            <div className="bg-gradient-to-b from-slate-50 to-sky-50/40 p-6 rounded-2xl border border-slate-200/80 hover:border-sky-300 transition-all flex flex-col justify-between shadow-2xs">
              <div>
                <div className="w-11 h-11 rounded-xl bg-sky-700 text-white flex items-center justify-center font-black text-sm shadow-xs mb-3.5">
                  {t('don.whyBadge3', '평화')}
                </div>
                <h4 className="font-extrabold text-slate-900 text-base sm:text-lg mb-2 leading-snug">
                  {t('don.why3Title', '평화·인권 교육과 연대의 거점')}
                </h4>
                <p className="text-sm text-slate-700 font-medium leading-relaxed">
                  {t('don.why3Desc', '미래세대를 위한 평화·인권 교육 공간이자 시민들이 함께 연대하고 행동하는 거점을 마련합니다.')}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Emphasized Notice */}
          <div className="bg-emerald-50/90 border border-emerald-200/80 rounded-2xl p-4 text-center shadow-2xs">
            <p className="text-xs sm:text-sm text-emerald-900 font-bold leading-relaxed">
              {t('don.whyNoticePrefix', '시민 한 분 한 분의 정성으로 모인 ')}
              <span className="text-emerald-700 font-extrabold underline underline-offset-4 decoration-emerald-400">
                {t('don.whyNoticeAmount', '1억 1,300만 원')}
              </span>
              {t('don.whyNoticeSuffix', '은 사건 터 매입과 공간 리모델링, 역사 기록물 보존에 전액 투명하게 사용됩니다.')}
            </p>
          </div>
        </div>

        {/* 1. 모금 현황 (목표액 / 현재액 / 기부자 수) */}
        <div className="max-w-4xl mx-auto mb-14 bg-gradient-to-r from-emerald-700 via-teal-700 to-sky-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/15">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-xs sm:text-sm font-bold text-emerald-100 tracking-wide uppercase">
                {t('don.liveGoalStatus', '실시간 후원 목표 현황')}
              </span>
            </div>
            <span className="text-xs sm:text-sm font-black bg-amber-400 text-slate-950 px-3 py-1 rounded-full shadow-2xs">
              {language === 'en' ? `Reached ${progressPercent}%` : `달성률 ${progressPercent}%`}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center relative z-10 mb-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <span className="text-xs text-emerald-100 font-medium flex items-center justify-center gap-1">
                <Target className="w-3.5 h-3.5 text-emerald-200" />
                {t('don.targetAmountLabel', '모금 목표액')}
              </span>
              <div className="text-xl sm:text-2xl font-black mt-1">
                {CAMPAIGN_STATS.targetAmount.toLocaleString()}{language === 'en' ? ' KRW' : '원'}
              </div>
            </div>

            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/30 shadow-inner">
              <span className="text-xs text-teal-100 font-semibold flex items-center justify-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-teal-200" />
                {t('don.currentAmountLabel', '현재 모금액')}
              </span>
              <div className="text-xl sm:text-2xl font-black text-amber-300 mt-1">
                {CAMPAIGN_STATS.currentAmount.toLocaleString()}{language === 'en' ? ' KRW' : '원'}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <span className="text-xs text-sky-100 font-medium flex items-center justify-center gap-1">
                <Users className="w-3.5 h-3.5 text-sky-200" />
                {t('don.donorCountLabel', '함께한 시민 기부자')}
              </span>
              <div className="text-xl sm:text-2xl font-black mt-1">
                {CAMPAIGN_STATS.donorCount.toLocaleString()}{language === 'en' ? ' donors' : '명'}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="w-full bg-black/25 h-3.5 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div
                className="bg-gradient-to-r from-amber-400 to-amber-300 h-full rounded-full transition-all duration-1000 shadow-xs"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* 2. 일시 후원 신청 폼 및 계좌 안내 */}
        <div className="max-w-4xl mx-auto mb-16 space-y-8">
          
          {/* Main Form Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-teal-100 p-6 sm:p-10 relative overflow-hidden">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
                  {t('don.formHeaderTitle', '일시 후원 신청 및 계좌 안내')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {t('don.formHeaderSubtitle', '후원 금액과 후원자 정보를 입력하여 마음을 모아주세요.')}
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-emerald-50 rounded-full text-emerald-700 font-semibold text-xs border border-emerald-200">
                <Heart className="w-3.5 h-3.5 fill-emerald-500 text-emerald-600" />
                <span>{t('don.transparentOp', '투명한 후원 운영')}</span>
              </div>
            </div>

            {renderFormContent()}
          </div>

          {/* Tax Deduction & Receipt Benefit Box */}
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-teal-800 font-bold text-xs bg-teal-100/80 px-3 py-1 rounded-full border border-teal-200">
                <FileText className="w-3.5 h-3.5 text-teal-700" />
                <span>{t('spons.card2Tag', '연말정산 기부금 소득공제 혜택')}</span>
              </div>

              <h4 className="text-lg font-bold text-slate-900">
                {t('spons.card2Title', '기부금 영수증 발급 및 세제 혜택 안내 (발급 준비중)')}
              </h4>

              <ul className="space-y-2 text-slate-600 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>{language === 'en' ? 'Individual Donors:' : '지정기부금 개인 후원:'}</strong> {t('don.taxPoint1', '소득금액의 30% 한도 내 15%(3,000만원 초과분 30%) 세액공제')}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>{language === 'en' ? 'Corporate Donors:' : '법인 후원:'}</strong> {t('don.taxPoint2', '법인 소득금액의 10% 한도 내 손금산입(비용 인정) 혜택')}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>{language === 'en' ? 'Year-end Tax Service:' : '국세청 연말정산 간소화:'}</strong> {t('don.taxPoint3', '영수증 발급 서비스 준비 중 (시스템 연동 후 안내 예정)')}
                  </span>
                </li>
              </ul>
            </div>

            <div className="w-full md:w-auto shrink-0 bg-white p-4 rounded-2xl border border-teal-100 text-xs text-slate-700 space-y-1">
              <div className="font-bold text-teal-800 mb-1">{t('spons.contactNote', '기부금 영수증 발급 문의 (준비중)')}</div>
              <div>{t('footer.telLabel', '전화:')} <strong className="text-slate-900">031-823-6155</strong></div>
              <div>{t('footer.emailLabel', '이메일:')} <strong className="text-slate-900">peaceaction6155@gmail.com</strong></div>
            </div>
          </div>

        </div>

        {/* Dedicated Modal Popup for Direct Action (when triggered via Header/Hero) */}
        {isOpenModalDirectly && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fade-in overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-emerald-200 relative my-8 max-h-[90vh] overflow-y-auto">
              <button
                onClick={onCloseModalDirectly}
                className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6 space-y-1 pr-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  <Heart className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600/30" />
                  <span>{t('donate.modalTag', '기억과 평화의 집 후원')}</span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-800 pt-1">
                  {t('donate.modalTitle', '기억과 평화의 집 후원 참여하기')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  {t('donate.modalSubtitle', '금액을 선택하고 후원자 정보를 입력하여 평화의 보금자리 건립에 동참해 주세요.')}
                </p>
              </div>

              {renderFormContent()}
            </div>
          </div>
        )}

        {/* 3. 기부자 응원 한마디 현황 */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-bold mb-1">
                <UserCheck className="w-3.5 h-3.5 text-sky-600" />
                <span>{t('donate.liveCheerStatusTag', '실시간 응원 현황')}</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800">
                {t('don.donorWallTitle', '기억과 평화의 집 기부자 응원 한마디 현황')}
              </h3>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={t('donate.searchPlaceholder', '기부자 이름 또는 응원 검색')}
                value={donorSearchTerm}
                onChange={(e) => setDonorSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {filteredDonors.length === 0 ? (
            <div className="bg-slate-50 border border-dashed border-slate-200/90 rounded-2xl p-10 text-center space-y-3">
              <MessageSquare className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-slate-600 font-medium text-sm sm:text-base">
                {t('donate.noCheerMsg', '아직 등록된 응원 메시지가 없습니다. 첫 번째 응원의 한마디를 남겨주세요!')}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDonors.map((donor) => (
                <div
                  key={donor.id}
                  className="bg-slate-50/90 hover:bg-emerald-50/40 p-4 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="font-bold text-slate-800 text-sm">
                        {donor.name}
                      </span>
                      <span className="text-emerald-700 font-extrabold bg-emerald-100/60 px-2 py-0.5 rounded-md">
                        {donor.amount.toLocaleString()}{t('donate.unitWon', '원')}
                      </span>
                    </div>

                    <p className="text-slate-700 text-xs sm:text-sm italic line-clamp-3 mb-3 leading-relaxed">
                      &quot;{donor.message}&quot;
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-200/50">
                    <span>{donor.date}</span>
                    <span className="text-teal-600 font-medium">
                      {t('donate.donorTypeLabel', '일시 후원자')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Digital Receipt / Thank-You Modal */}
        {submittedReceipt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fade-in">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-emerald-200 relative">
              <button
                onClick={() => setSubmittedReceipt(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-extrabold text-slate-800">
                  {t('donate.certModalTitle', '기여 증서 & 감사의 글')}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600">
                  {t('donate.certModalSubtitle', '소중한 기부에 진심으로 감사드립니다. 귀하의 정성은 기억과 평화의 집 건립을 위해 투명하게 쓰입니다.')}
                </p>

                {/* Digital Certificate Preview */}
                <div className="bg-gradient-to-b from-teal-50 to-emerald-50 border-2 border-emerald-200 rounded-2xl p-5 text-left space-y-2 text-xs">
                  <div className="flex justify-between border-b border-emerald-200 pb-2">
                    <span className="text-slate-500">{t('donate.certIssuerLabel', '발급기관')}</span>
                    <span className="font-bold text-slate-800">{t('donate.certIssuerValue', '사단법인 평화시민행동 (기억과 평화의 집)')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t('donate.certDonorLabel', '기부자')}</span>
                    <span className="font-bold text-slate-800">{submittedReceipt.name} {language === 'en' ? '' : '님'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t('donate.certAmountLabel', '후원 금액')}</span>
                    <span className="font-bold text-emerald-700 text-sm">{submittedReceipt.amount.toLocaleString()}{t('donate.unitWon', '원')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t('donate.certDateLabel', '후원 일자')}</span>
                    <span className="font-medium text-slate-800">{submittedReceipt.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t('donate.certNoLabel', '증서 번호')}</span>
                    <span className="font-mono text-slate-600">PEACE-2026-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>
                </div>

                <div className="pt-3 flex gap-2">
                  <button
                    onClick={() => {
                      alert(language === 'en' ? 'Contribution Certificate downloaded successfully.' : '기여 증서 이미지가 다운로드되었습니다.');
                    }}
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{t('donate.certDownloadBtn', '증서 다운로드')}</span>
                  </button>
                  <button
                    onClick={() => setSubmittedReceipt(null)}
                    className="py-3 px-5 bg-slate-900 text-white font-bold text-xs sm:text-sm rounded-xl cursor-pointer"
                  >
                    {t('donate.certConfirmBtn', '확인')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
