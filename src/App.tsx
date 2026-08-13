import React, { useState, useEffect } from 'react';
import { NavTab, CardNews, DonorRecord } from './types';
import { INITIAL_CARD_NEWS, INITIAL_DONORS, CAMPAIGN_STATS } from './data/initialData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { NewsSection } from './components/NewsSection';
import { DonationSection } from './components/DonationSection';
import { ArchiveSection } from './components/ArchiveSection';
import { ArticlesAccordion } from './components/ArticlesAccordion';
import { Footer } from './components/Footer';
import { AdminModal } from './components/AdminModal';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('소개');
  const [newsList, setNewsList] = useState<CardNews[]>(INITIAL_CARD_NEWS);
  
  // LocalStorage persistent donors state
  const [donors, setDonors] = useState<DonorRecord[]>(() => {
    try {
      localStorage.removeItem('peace_donors_v2'); // Clean up old test data
      const saved = localStorage.getItem('peace_donors_v3');
      if (saved) {
        const parsed: DonorRecord[] = JSON.parse(saved);
        const existingIds = new Set(parsed.map((d) => d.id));
        const missingInitial = INITIAL_DONORS.filter((d) => !existingIds.has(d.id));
        return [...parsed, ...missingInitial];
      }
    } catch (e) {
      console.error('Failed to load donors from localStorage:', e);
    }
    return INITIAL_DONORS;
  });

  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState<boolean>(false);

  // Calculate dynamic current amount & donor count from user additions
  const initialDonorIds = new Set(INITIAL_DONORS.map((d) => d.id));
  const userAddedDonors = donors.filter((d) => !initialDonorIds.has(d.id));
  const userAddedAmountTotal = userAddedDonors.reduce((sum, d) => sum + d.amount, 0);

  const dynamicCurrentAmount = CAMPAIGN_STATS.currentAmount + userAddedAmountTotal;
  const dynamicDonorCount = CAMPAIGN_STATS.donorCount + userAddedDonors.length;

  // Save donors to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem('peace_donors_v3', JSON.stringify(donors));
    } catch (e) {
      console.error('Failed to save donors to localStorage:', e);
    }
  }, [donors]);

  const handleLikeNews = (id: string) => {
    setNewsList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };

  const handleAddDonor = (newDonor: DonorRecord, addedAmount: number) => {
    setDonors((prev) => [newDonor, ...prev]);
  };

  const handleUpdateDonorStatus = (id: string, status: '대기' | '발급완료' | '취소') => {
    setDonors((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status } : d))
    );
  };

  const handleDeleteDonor = (id: string) => {
    setDonors((prev) => prev.filter((d) => d.id !== id));
  };

  const handleAddManualDonor = (newDonor: DonorRecord) => {
    setDonors((prev) => [newDonor, ...prev]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offsetTop = el.offsetTop - 80;
      window.scrollTo({
        top: Math.max(0, offsetTop),
        behavior: 'smooth'
      });
    }
  };

  const handleOpenDonateModal = () => {
    scrollToSection('donation');
    setIsDonateModalOpen(true);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-emerald-200 selection:text-emerald-900">
        {/* Global Header */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenDonateModal={handleOpenDonateModal}
          onOpenAdminModal={() => setIsAdminModalOpen(true)}
        />

        {/* Main Content Sections */}
        <main>
          {/* Hero Section */}
          <Hero
            cheerCount={donors.length}
            onDonateClick={handleOpenDonateModal}
            onExploreClick={() => scrollToSection('news')}
          />

          {/* 1. 소개 (About) */}
          <AboutSection />

          {/* 2. 소식 / 활동 보고 (News & Activities Card News) */}
          <NewsSection newsList={newsList} onLikeNews={handleLikeNews} />

          {/* 3. 기억과 평화의 집 후원 (Donation & Sponsorship) */}
          <DonationSection
            donors={donors}
            onAddDonor={handleAddDonor}
            isOpenModalDirectly={isDonateModalOpen}
            onCloseModalDirectly={() => setIsDonateModalOpen(false)}
          />

          {/* 4. 아카이브 (Archive) */}
          <ArchiveSection />

          {/* 6. 정관 목적 원문 보기 접힘 (Accordion) */}
          <ArticlesAccordion />
        </main>

        {/* Footer */}
        <Footer onOpenAdminModal={() => setIsAdminModalOpen(true)} />

        {/* Admin Management Modal */}
        <AdminModal
          isOpen={isAdminModalOpen}
          onClose={() => setIsAdminModalOpen(false)}
          donors={donors}
          onUpdateStatus={handleUpdateDonorStatus}
          onDeleteDonor={handleDeleteDonor}
          onAddManualDonor={handleAddManualDonor}
        />
      </div>
    </LanguageProvider>
  );
}
