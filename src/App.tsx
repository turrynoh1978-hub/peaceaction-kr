import React, { useState, useEffect } from 'react';
import { NavTab, CardNews, DonorRecord } from './types';
import { INITIAL_CARD_NEWS, INITIAL_DONORS } from './data/initialData';
import {
  testConnection,
  subscribeNews,
  saveNewsToFirestore,
  deleteNewsFromFirestore,
  likeNewsInFirestore,
  subscribeDonors,
  saveDonorToFirestore,
  updateDonorStatusInFirestore,
  deleteDonorFromFirestore
} from './lib/firebase';
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
  const [newsList, setNewsList] = useState<CardNews[]>(() => {
    try {
      const saved = localStorage.getItem('peace_news_v1') || localStorage.getItem('peace_news_v2');
      if (saved) {
        const parsed: CardNews[] = JSON.parse(saved);
        const existingIds = new Set(parsed.map((n) => n.id));
        const missingInitial = INITIAL_CARD_NEWS.filter((n) => !existingIds.has(n.id));
        return [...parsed, ...missingInitial];
      }
    } catch (e) {
      console.error('Failed to load news from localStorage:', e);
    }
    return INITIAL_CARD_NEWS;
  });
  
  // Donors state with LocalStorage and Firebase fallback
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

  // Firestore Real-time synchronization
  useEffect(() => {
    testConnection();

    // Subscribe to Firestore News updates
    const unsubscribeNews = subscribeNews((remoteNews) => {
      if (remoteNews && remoteNews.length > 0) {
        setNewsList(remoteNews);
        try {
          localStorage.setItem('peace_news_v1', JSON.stringify(remoteNews));
        } catch (e) {
          console.warn('LocalStorage save error:', e);
        }
      }
    });

    // Subscribe to Firestore Donors updates
    const unsubscribeDonors = subscribeDonors((remoteDonors) => {
      if (remoteDonors && remoteDonors.length > 0) {
        setDonors(remoteDonors);
        try {
          localStorage.setItem('peace_donors_v3', JSON.stringify(remoteDonors));
        } catch (e) {
          console.warn('LocalStorage save error:', e);
        }
      }
    });

    return () => {
      unsubscribeNews();
      unsubscribeDonors();
    };
  }, []);

  // Save news to localStorage whenever state changes as local backup
  useEffect(() => {
    try {
      localStorage.setItem('peace_news_v1', JSON.stringify(newsList));
    } catch (e) {
      console.error('Failed to save news to localStorage:', e);
    }
  }, [newsList]);

  // Save donors to localStorage whenever state changes as local backup
  useEffect(() => {
    try {
      localStorage.setItem('peace_donors_v3', JSON.stringify(donors));
    } catch (e) {
      console.error('Failed to save donors to localStorage:', e);
    }
  }, [donors]);

  const handleLikeNews = (id: string) => {
    const target = newsList.find((n) => n.id === id);
    const currentLikes = target?.likes || 0;

    setNewsList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );

    // Sync to Firestore
    likeNewsInFirestore(id, currentLikes);
  };

  const handleAddDonor = (newDonor: DonorRecord, _addedAmount?: number) => {
    setDonors((prev) => [newDonor, ...prev]);
    // Save to Firestore
    saveDonorToFirestore(newDonor).catch((err) => {
      console.error('Failed to save donor to Firestore:', err);
    });
  };

  const handleUpdateDonorStatus = (id: string, status: '대기' | '발급완료' | '취소') => {
    setDonors((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status } : d))
    );
    // Sync to Firestore
    updateDonorStatusInFirestore(id, status).catch((err) => {
      console.error('Failed to update donor status in Firestore:', err);
    });
  };

  const handleDeleteDonor = (id: string) => {
    setDonors((prev) => prev.filter((d) => d.id !== id));
    // Delete from Firestore
    deleteDonorFromFirestore(id).catch((err) => {
      console.error('Failed to delete donor from Firestore:', err);
    });
  };

  const handleAddManualDonor = (newDonor: DonorRecord) => {
    setDonors((prev) => [newDonor, ...prev]);
    // Save to Firestore
    saveDonorToFirestore(newDonor).catch((err) => {
      console.error('Failed to save manual donor to Firestore:', err);
    });
  };

  const handleAddNews = async (newNews: CardNews) => {
    // 1. Update local state immediately for instant feedback
    setNewsList((prev) => {
      const updated = [newNews, ...prev.filter((item) => item.id !== newNews.id)];
      try {
        localStorage.setItem('peace_news_v1', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save news to localStorage:', e);
      }
      return updated;
    });

    // 2. Persist to Firebase Firestore database (survives all builds, refreshes, and device restarts)
    try {
      await saveNewsToFirestore(newNews);
      console.log('Successfully saved news to Firebase Firestore:', newNews.id);
    } catch (err) {
      console.error('Failed to save news to Firestore:', err);
      throw err;
    }

    setIsAdminModalOpen(false);
    setTimeout(() => {
      scrollToSection('news');
    }, 150);
  };

  const handleDeleteNews = async (id: string) => {
    // 1. Update local state immediately
    setNewsList((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem('peace_news_v1', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save to localStorage after delete:', e);
      }
      return updated;
    });

    // 2. Delete from Firebase Firestore database
    try {
      await deleteNewsFromFirestore(id);
      console.log('Successfully deleted news from Firebase Firestore:', id);
    } catch (err) {
      console.error('Failed to delete news from Firestore:', err);
      throw err;
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
          newsList={newsList}
          onUpdateStatus={handleUpdateDonorStatus}
          onDeleteDonor={handleDeleteDonor}
          onAddManualDonor={handleAddManualDonor}
          onAddNews={handleAddNews}
          onDeleteNews={handleDeleteNews}
        />
      </div>
    </LanguageProvider>
  );
}
