import React, { useState } from 'react';
import { NavTab, CardNews, DonorRecord } from './types';
import { INITIAL_CARD_NEWS, INITIAL_DONORS, CAMPAIGN_STATS } from './data/initialData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VideoSection } from './components/VideoSection';
import { AboutSection } from './components/AboutSection';
import { NewsSection } from './components/NewsSection';
import { DonationSection } from './components/DonationSection';
import { ArchiveSection } from './components/ArchiveSection';
import { ArticlesAccordion } from './components/ArticlesAccordion';
import { Footer } from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('소개');
  const [newsList, setNewsList] = useState<CardNews[]>(INITIAL_CARD_NEWS);
  const [donors, setDonors] = useState<DonorRecord[]>(INITIAL_DONORS);
  const [currentAmount, setCurrentAmount] = useState<number>(CAMPAIGN_STATS.currentAmount);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState<boolean>(false);

  const handleLikeNews = (id: string) => {
    setNewsList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };

  const handleAddDonor = (newDonor: DonorRecord, addedAmount: number) => {
    setDonors((prev) => [newDonor, ...prev]);
    setCurrentAmount((prev) => prev + addedAmount);
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
        />

        {/* Main Content Sections */}
        <main>
          {/* Hero Section */}
          <Hero
            cheerCount={donors.length}
            onDonateClick={handleOpenDonateModal}
            onExploreClick={() => scrollToSection('news')}
          />

          {/* Video Section (Autoplay YouTube Video) */}
          <VideoSection />

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
        <Footer />
      </div>
    </LanguageProvider>
  );
}
