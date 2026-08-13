import React, { useState } from 'react';
import { DonorRecord } from '../types';
import {
  ShieldCheck,
  X,
  Download,
  Search,
  Filter,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  FileSpreadsheet,
  Users,
  CreditCard,
  Building2,
  User,
  AlertCircle,
  KeyRound,
  Lock,
  LogOut,
  RefreshCw,
  MessageSquare
} from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  donors: DonorRecord[];
  onUpdateStatus: (id: string, status: '대기' | '발급완료' | '취소') => void;
  onDeleteDonor: (id: string) => void;
  onAddManualDonor: (newDonor: DonorRecord) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  donors,
  onUpdateStatus,
  onDeleteDonor,
  onAddManualDonor
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('peace_admin_authed') === 'true';
    } catch {
      return false;
    }
  });
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<'all' | 'receipts' | 'add'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // New Donor Form State
  const [manualForm, setManualForm] = useState({
    name: '',
    amount: 50000,
    phone: '',
    email: '',
    date: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
    message: '',
    receiptRequested: false,
    receiptType: 'individual' as 'individual' | 'corporate',
    residentId: '',
    businessRegNo: '',
    address: '',
    isAnonymous: false,
    status: '대기' as '대기' | '발급완료' | '취소'
  });

  if (!isOpen) return null;

  // Handle Password Verification
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validPasswords = ['admin1234', '1234', 'admin'];
    const envPass = (import.meta as unknown as { env?: { VITE_ADMIN_PASSWORD?: string } }).env?.VITE_ADMIN_PASSWORD;
    if (envPass) validPasswords.push(envPass);

    if (validPasswords.includes(pinInput.trim())) {
      setIsAuthenticated(true);
      setPinError(false);
      setPinInput('');
      try {
        sessionStorage.setItem('peace_admin_authed', 'true');
      } catch (err) {
        console.error(err);
      }
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPinError(false);
    setPinInput('');
    try {
      sessionStorage.removeItem('peace_admin_authed');
    } catch (err) {
      console.error(err);
    }
  };

  // Filter Donors
  const filteredDonors = donors.filter((donor) => {
    // Tab filter
    if (activeTab === 'receipts' && !donor.receiptRequested) {
      return false;
    }

    // Status filter
    if (statusFilter !== 'all' && donor.status !== statusFilter) {
      return false;
    }

    // Type filter
    if (typeFilter !== 'all') {
      if (typeFilter === 'individual' && donor.receiptType !== 'individual') return false;
      if (typeFilter === 'corporate' && donor.receiptType !== 'corporate') return false;
    }

    // Search filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      const matchName = donor.name.toLowerCase().includes(term);
      const matchPhone = (donor.phone || '').includes(term);
      const matchEmail = (donor.email || '').toLowerCase().includes(term);
      const matchResNo = (donor.residentId || '').includes(term);
      const matchBizNo = (donor.businessRegNo || '').includes(term);
      const matchAddr = (donor.address || '').toLowerCase().includes(term);
      const matchMsg = (donor.message || '').toLowerCase().includes(term);

      return matchName || matchPhone || matchEmail || matchResNo || matchBizNo || matchAddr || matchMsg;
    }

    return true;
  });

  // KPI Calculations
  const totalDonorsCount = donors.length;
  const totalAmountSum = donors.reduce((acc, d) => acc + d.amount, 0);
  const receiptRequestedCount = donors.filter((d) => d.receiptRequested).length;
  const pendingReceiptsCount = donors.filter((d) => d.receiptRequested && d.status === '대기').length;

  // CSV Export Handler with UTF-8 BOM
  const exportToCSV = (onlyReceipts: boolean = false) => {
    const listToExport = onlyReceipts ? donors.filter((d) => d.receiptRequested) : donors;

    if (listToExport.length === 0) {
      alert('다운로드할 데이터가 없습니다.');
      return;
    }

    // CSV Header Definition
    const headers = [
      'ID',
      '후원일자',
      '성명/단체명',
      '익명여부',
      '후원금액(원)',
      '연락처',
      '이메일',
      '영수증신청여부',
      '발급구분',
      '주민등록번호/사업자번호',
      '주소/소재지',
      '결제수단',
      '처리상태',
      '응원메시지'
    ];

    // Escape CSV cell text
    const escapeCSV = (val: string | number | undefined | boolean): string => {
      if (val === undefined || val === null) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = listToExport.map((d) => [
      escapeCSV(d.id),
      escapeCSV(d.date),
      escapeCSV(d.name),
      escapeCSV(d.isAnonymous ? '익명' : '공개'),
      escapeCSV(d.amount),
      escapeCSV(d.phone || '-'),
      escapeCSV(d.email || '-'),
      escapeCSV(d.receiptRequested ? '신청' : '미신청'),
      escapeCSV(d.receiptRequested ? (d.receiptType === 'corporate' ? '법인·단체' : '개인') : '-'),
      escapeCSV(d.receiptType === 'corporate' ? d.businessRegNo || '-' : d.residentId || '-'),
      escapeCSV(d.address || '-'),
      escapeCSV(d.paymentMethod || '후원계좌 입금'),
      escapeCSV(d.status || '대기'),
      escapeCSV(d.message || '')
    ]);

    // UTF-8 BOM (\uFEFF) ensures Excel opens Korean characters correctly
    const csvContent =
      '\uFEFF' + [headers.map((h) => `"${h}"`).join(','), ...rows.map((r) => r.join(','))].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const filename = onlyReceipts
      ? `기억과평화의집_기부금영수증신청내역_${dateStr}.csv`
      : `기억과평화의집_전체후원자내역_${dateStr}.csv`;

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Submit manual donor form
  const handleManualAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualForm.name.trim()) {
      alert('성명 또는 단체명을 입력해주세요.');
      return;
    }

    const newRecord: DonorRecord = {
      id: `d-${Date.now()}`,
      name: manualForm.isAnonymous ? '익명 기부자' : manualForm.name,
      amount: Number(manualForm.amount) || 0,
      date: manualForm.date,
      message: manualForm.message || '사무국 수동 입금 확인 등록',
      isRecurring: false,
      isAnonymous: manualForm.isAnonymous,
      phone: manualForm.phone,
      email: manualForm.email,
      receiptRequested: manualForm.receiptRequested,
      receiptType: manualForm.receiptRequested ? manualForm.receiptType : undefined,
      residentId: manualForm.receiptRequested && manualForm.receiptType === 'individual' ? manualForm.residentId : undefined,
      businessRegNo: manualForm.receiptRequested && manualForm.receiptType === 'corporate' ? manualForm.businessRegNo : undefined,
      address: manualForm.receiptRequested ? manualForm.address : undefined,
      paymentMethod: '후원계좌 수동등록',
      status: manualForm.status
    };

    onAddManualDonor(newRecord);
    alert('후원자 내역이 정상적으로 등록되었습니다.');
    setActiveTab('all');

    // Reset Form
    setManualForm({
      name: '',
      amount: 50000,
      phone: '',
      email: '',
      date: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
      message: '',
      receiptRequested: false,
      receiptType: 'individual',
      residentId: '',
      businessRegNo: '',
      address: '',
      isAnonymous: false,
      status: '대기'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-6xl w-full p-5 sm:p-8 shadow-2xl border border-slate-200 relative my-6 max-h-[92vh] flex flex-col">
        
        {/* Modal Header Controls */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 text-xs font-bold transition-all border border-slate-200 cursor-pointer"
              title="관리자 로그아웃"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">로그아웃</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer transition-all"
            title="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Header Title */}
        <div className="mb-6 space-y-1.5 border-b border-slate-100 pb-4 shrink-0 pr-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-emerald-400 text-xs font-bold shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>사단법인 평화시민행동 관리자 전용</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            후원자 내역 & 기부금 영수증 신청 관리
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            기부자가 신청한 영수증 정보와 전체 후원 내역을 실시간으로 확인하고 엑셀(CSV) 문서로 추출할 수 있습니다.
          </p>
        </div>

        {/* Password Verification View */}
        {!isAuthenticated ? (
          <div className="my-auto py-8 sm:py-12 px-4 text-center max-w-sm sm:max-w-md mx-auto space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 text-emerald-400 flex items-center justify-center mx-auto shadow-lg border border-slate-800">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">관리자 비밀번호 확인</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                관리자 전용 데이터 접근을 위해 비밀번호를 입력해 주세요.
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-3 pt-1">
              <div className="space-y-1">
                <input
                  type="password"
                  autoFocus
                  placeholder="비밀번호 입력 (기본: admin1234)"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    if (pinError) setPinError(false);
                  }}
                  className={`w-full bg-slate-50 border rounded-xl px-4 py-3.5 text-center text-sm font-bold tracking-wider focus:bg-white focus:outline-none transition-all ${
                    pinError
                      ? 'border-rose-500 ring-2 ring-rose-200'
                      : 'border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100'
                  }`}
                />
                {pinError && (
                  <p className="text-xs text-rose-600 font-bold flex items-center justify-center gap-1.5 pt-1.5 animate-shake">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>비밀번호가 올바르지 않습니다.</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm cursor-pointer shadow-sm transition-all active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>관리자 로그인</span>
              </button>
            </form>

            <p className="text-[11px] text-slate-400 pt-2">
              비밀번호 기본값: <code className="bg-slate-100 text-slate-700 font-mono px-1.5 py-0.5 rounded border border-slate-200">admin1234</code>
            </p>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="flex-1 overflow-y-auto space-y-6 pr-1">
            
            {/* KPI Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl">
                <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
                  <span>총 후원 건수</span>
                  <Users className="w-4 h-4 text-slate-400" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-slate-900">{totalDonorsCount.toLocaleString()}건</div>
              </div>

              <div className="bg-emerald-50/80 border border-emerald-200 p-4 rounded-2xl">
                <div className="flex items-center justify-between text-emerald-800 text-xs font-semibold mb-1">
                  <span>총 후원 모금액</span>
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-emerald-700">{totalAmountSum.toLocaleString()}원</div>
              </div>

              <div className="bg-sky-50/80 border border-sky-200 p-4 rounded-2xl">
                <div className="flex items-center justify-between text-sky-800 text-xs font-semibold mb-1">
                  <span>영수증 신청 건수</span>
                  <FileSpreadsheet className="w-4 h-4 text-sky-600" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-sky-700">{receiptRequestedCount.toLocaleString()}건</div>
              </div>

              <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-2xl">
                <div className="flex items-center justify-between text-amber-800 text-xs font-semibold mb-1">
                  <span>영수증 발급 대기</span>
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-amber-700">{pendingReceiptsCount.toLocaleString()}건</div>
              </div>
            </div>

            {/* Action Toolbar & Navigation Tabs */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-slate-100/90 p-2.5 rounded-2xl border border-slate-200/80">
              
              {/* Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'all'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-200/80'
                  }`}
                >
                  📋 전체 후원 내역 ({donors.length})
                </button>

                <button
                  onClick={() => setActiveTab('receipts')}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'receipts'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'
                  }`}
                >
                  <span>📄 영수증 신청 내역</span>
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/20 text-current font-extrabold">
                    {receiptRequestedCount}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('add')}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                    activeTab === 'add'
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-teal-50 hover:text-teal-800'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>수동 후원자 등록</span>
                </button>
              </div>

              {/* Excel Download Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => exportToCSV(false)}
                  className="flex-1 lg:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                  title="전체 후원자 목록을 CSV 엑셀로 다운로드합니다."
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>전체 엑셀 다운로드</span>
                </button>

                <button
                  onClick={() => exportToCSV(true)}
                  className="flex-1 lg:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                  title="영수증 신청 건만 CSV 엑셀로 다운로드합니다."
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-white" />
                  <span>영수증 신청 엑셀 다운로드</span>
                </button>
              </div>

            </div>

            {/* Filter Controls Bar (Visible on 'all' or 'receipts' tabs) */}
            {activeTab !== 'add' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5">
                {/* Search Bar */}
                <div className="md:col-span-6 relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="성명, 연락처, 이메일, 주민/사업자번호, 주소 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:border-emerald-500 focus:outline-none"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Status Filter */}
                <div className="md:col-span-3">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none"
                  >
                    <option value="all">모든 처리 상태</option>
                    <option value="대기">⏳ 발급 대기중</option>
                    <option value="발급완료">✅ 발급 완료</option>
                    <option value="취소">❌ 취소됨</option>
                  </select>
                </div>

                {/* Type Filter */}
                <div className="md:col-span-3">
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none"
                  >
                    <option value="all">전체 구분 (개인/법인)</option>
                    <option value="individual">👤 개인 후원자</option>
                    <option value="corporate">🏢 법인·단체 후원자</option>
                  </select>
                </div>
              </div>
            )}

            {/* TAB CONTENT 1 & 2: DONOR & RECEIPT DATA TABLE */}
            {activeTab !== 'add' && (
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs">
                <div className="overflow-x-auto max-h-[500px]">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-100/90 text-slate-700 font-bold border-b border-slate-200 sticky top-0 z-10">
                        <th className="p-3 w-12 text-center">No.</th>
                        <th className="p-3">후원일자</th>
                        <th className="p-3">성명/단체명</th>
                        <th className="p-3">후원금액</th>
                        <th className="p-3">연락처 / 이메일</th>
                        <th className="p-3 text-center">영수증 신청</th>
                        <th className="p-3">주민/사업자번호</th>
                        <th className="p-3">주소 / 소재지</th>
                        <th className="p-3 text-center">처리 상태</th>
                        <th className="p-3 text-center">관리</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredDonors.length === 0 ? (
                        <tr>
                          <td colSpan={10} className="p-10 text-center text-slate-400">
                            <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                            <span>조건에 일치하는 후원 내역이 없습니다.</span>
                          </td>
                        </tr>
                      ) : (
                        filteredDonors.map((donor, idx) => {
                          const isReceipt = donor.receiptRequested;
                          return (
                            <tr
                              key={donor.id}
                              className={`hover:bg-slate-50 transition-colors ${
                                isReceipt ? 'bg-emerald-50/20' : ''
                              }`}
                            >
                              {/* Index */}
                              <td className="p-3 text-center font-mono text-slate-400">{idx + 1}</td>

                              {/* Date */}
                              <td className="p-3 font-semibold text-slate-600 whitespace-nowrap">{donor.date}</td>

                              {/* Name */}
                              <td className="p-3 font-bold text-slate-900">
                                <div className="flex items-center gap-1.5">
                                  <span>{donor.name}</span>
                                  {donor.isAnonymous && (
                                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-200 text-slate-600 font-medium">
                                      익명
                                    </span>
                                  )}
                                </div>
                                {donor.message && (
                                  <div className="text-[11px] text-slate-500 font-normal truncate max-w-[180px] mt-0.5" title={donor.message}>
                                    &quot;{donor.message}&quot;
                                  </div>
                                )}
                              </td>

                              {/* Amount */}
                              <td className="p-3 font-extrabold text-emerald-700 whitespace-nowrap">
                                {donor.amount.toLocaleString()}원
                              </td>

                              {/* Contact */}
                              <td className="p-3 text-slate-700 space-y-0.5">
                                <div className="font-mono text-xs">{donor.phone || '-'}</div>
                                <div className="text-[11px] text-slate-500 truncate max-w-[150px]">{donor.email || '-'}</div>
                              </td>

                              {/* Receipt Requested Tag */}
                              <td className="p-3 text-center whitespace-nowrap">
                                {isReceipt ? (
                                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                                    donor.receiptType === 'corporate'
                                      ? 'bg-purple-100 text-purple-800 border border-purple-200'
                                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                  }`}>
                                    {donor.receiptType === 'corporate' ? <Building2 className="w-3 h-3" /> : <User className="w-3 h-3" />}
                                    <span>{donor.receiptType === 'corporate' ? '신청 (법인)' : '신청 (개인)'}</span>
                                  </span>
                                ) : (
                                  <span className="text-slate-400 font-medium text-[11px]">미신청</span>
                                )}
                              </td>

                              {/* Resident ID / Biz No */}
                              <td className="p-3 font-mono text-slate-700 whitespace-nowrap">
                                {donor.receiptType === 'corporate'
                                  ? donor.businessRegNo || '-'
                                  : donor.residentId || '-'}
                              </td>

                              {/* Address */}
                              <td className="p-3 text-slate-700 max-w-[180px] truncate" title={donor.address || '-'}>
                                {donor.address || '-'}
                              </td>

                              {/* Status Toggle Button */}
                              <td className="p-3 text-center whitespace-nowrap">
                                <button
                                  onClick={() => {
                                    const nextStatus =
                                      donor.status === '발급완료' ? '대기' : '발급완료';
                                    onUpdateStatus(donor.id, nextStatus);
                                  }}
                                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-transform active:scale-95 ${
                                    donor.status === '발급완료'
                                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                      : donor.status === '취소'
                                      ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                                      : 'bg-amber-100 text-amber-800 hover:bg-amber-200 border border-amber-300'
                                  }`}
                                  title="클릭하여 발급 상태(대기 ↔ 발급완료)를 변경합니다."
                                >
                                  {donor.status === '발급완료' ? (
                                    <>
                                      <CheckCircle className="w-3 h-3" />
                                      <span>발급 완료</span>
                                    </>
                                  ) : (
                                    <>
                                      <Clock className="w-3 h-3" />
                                      <span>발급 대기</span>
                                    </>
                                  )}
                                </button>
                              </td>

                              {/* Delete Action */}
                              <td className="p-3 text-center whitespace-nowrap">
                                <button
                                  onClick={() => {
                                    if (confirm(`'${donor.name}' 후원 내역을 삭제하시겠습니까?`)) {
                                      onDeleteDonor(donor.id);
                                    }
                                  }}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                                  title="내역 삭제"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer Stats */}
                <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                  <span>조회된 후원 건수: <strong className="text-slate-900">{filteredDonors.length}건</strong></span>
                  <span>합계 금액: <strong className="text-emerald-700 font-extrabold">{filteredDonors.reduce((acc, d) => acc + d.amount, 0).toLocaleString()}원</strong></span>
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: MANUAL DONOR ADD FORM */}
            {activeTab === 'add' && (
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 max-w-2xl mx-auto space-y-4">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-teal-600" />
                    <span>수동 후원 및 입금 확인 내역 등록</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    통장 입금 확인 후 사무국에서 수동으로 후원자 내역 및 영수증 신청 건을 추가합니다.
                  </p>
                </div>

                <form onSubmit={handleManualAddSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">성명 / 단체명 *</label>
                      <input
                        type="text"
                        required
                        placeholder="예: 홍길동 또는 (주)평화"
                        value={manualForm.name}
                        onChange={(e) => setManualForm({ ...manualForm, name: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">후원 금액 (원) *</label>
                      <input
                        type="number"
                        required
                        placeholder="50000"
                        value={manualForm.amount}
                        onChange={(e) => setManualForm({ ...manualForm, amount: Number(e.target.value) })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">연락처</label>
                      <input
                        type="tel"
                        placeholder="010-0000-0000"
                        value={manualForm.phone}
                        onChange={(e) => setManualForm({ ...manualForm, phone: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">이메일</label>
                      <input
                        type="email"
                        placeholder="peace@example.com"
                        value={manualForm.email}
                        onChange={(e) => setManualForm({ ...manualForm, email: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">후원일자</label>
                      <input
                        type="text"
                        placeholder="2026.08.11"
                        value={manualForm.date}
                        onChange={(e) => setManualForm({ ...manualForm, date: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Receipt Checkbox */}
                  <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-3">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={manualForm.receiptRequested}
                        onChange={(e) => setManualForm({ ...manualForm, receiptRequested: e.target.checked })}
                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>기부금 영수증 발급 신청 정보 포함하기</span>
                    </label>

                    {manualForm.receiptRequested && (
                      <div className="pt-2 border-t border-slate-100 space-y-2.5">
                        <div className="flex gap-4">
                          <label className="flex items-center gap-1 text-xs font-bold text-slate-700 cursor-pointer">
                            <input
                              type="radio"
                              name="manualReceiptType"
                              value="individual"
                              checked={manualForm.receiptType === 'individual'}
                              onChange={() => setManualForm({ ...manualForm, receiptType: 'individual' })}
                            />
                            <span>개인 (주민등록번호)</span>
                          </label>

                          <label className="flex items-center gap-1 text-xs font-bold text-slate-700 cursor-pointer">
                            <input
                              type="radio"
                              name="manualReceiptType"
                              value="corporate"
                              checked={manualForm.receiptType === 'corporate'}
                              onChange={() => setManualForm({ ...manualForm, receiptType: 'corporate' })}
                            />
                            <span>법인·단체 (사업자/고유번호)</span>
                          </label>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-2">
                          {manualForm.receiptType === 'individual' ? (
                            <input
                              type="text"
                              placeholder="주민등록번호 (000000-0000000)"
                              value={manualForm.residentId}
                              onChange={(e) => setManualForm({ ...manualForm, residentId: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                            />
                          ) : (
                            <input
                              type="text"
                              placeholder="사업자등록번호 / 고유번호"
                              value={manualForm.businessRegNo}
                              onChange={(e) => setManualForm({ ...manualForm, businessRegNo: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                            />
                          )}

                          <input
                            type="text"
                            placeholder="주소 / 법인 소재지"
                            value={manualForm.address}
                            onChange={(e) => setManualForm({ ...manualForm, address: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">응원 메시지 / 비고</label>
                    <textarea
                      rows={2}
                      placeholder="응원 메시지 또는 사무국 참고 메모"
                      value={manualForm.message}
                      onChange={(e) => setManualForm({ ...manualForm, message: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('all')}
                      className="px-4 py-2.5 rounded-xl bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm cursor-pointer"
                    >
                      후원 내역 등록 저장
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
