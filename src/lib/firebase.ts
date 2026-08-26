import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  getDocs,
  getDocFromServer
} from 'firebase/firestore';
import { CardNews, DonorRecord, CampaignStats } from '../types';
import { INITIAL_CARD_NEWS, INITIAL_DONORS, CAMPAIGN_STATS } from '../data/initialData';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with specific databaseId if provided
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Connection test for Firestore
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Firebase Firestore connection verified.');
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline, using cache / local state.');
    } else {
      console.warn('Firebase test connection note:', error);
    }
    return false;
  }
}

// Helper to strip undefined values for Firestore serialization
function cleanData<T extends Record<string, any>>(obj: T): Record<string, any> {
  const result: Record<string, any> = {};
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    if (val !== undefined) {
      if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
        result[key] = cleanData(val);
      } else {
        result[key] = val;
      }
    }
  }
  return result;
}

// Initial data seeding to Firestore (only adds missing items, never deletes user items)
export async function seedInitialDataIfNeeded() {
  try {
    const newsSnap = await getDocs(collection(db, 'news'));
    const existingNewsIds = new Set<string>();
    newsSnap.forEach((d) => existingNewsIds.add(d.id));

    // Seed missing initial news/videos
    for (const item of INITIAL_CARD_NEWS) {
      if (!existingNewsIds.has(item.id)) {
        await setDoc(doc(db, 'news', item.id), cleanData(item));
      }
    }

    // Seed missing initial donors if donors collection is empty
    const donorsSnap = await getDocs(collection(db, 'donors'));
    if (donorsSnap.empty) {
      for (const donor of INITIAL_DONORS) {
        await setDoc(doc(db, 'donors', donor.id), cleanData(donor));
      }
    }

    // Seed campaign stats in Firestore if not present
    const statsDocRef = doc(db, 'settings', 'campaign_stats');
    const statsSnap = await getDoc(statsDocRef);
    if (!statsSnap.exists()) {
      await setDoc(statsDocRef, cleanData(CAMPAIGN_STATS));
    }
  } catch (err) {
    console.warn('Could not check/seed initial data to Firestore:', err);
  }
}

// Real-time listener for News & Activities
export function subscribeNews(
  onUpdate: (news: CardNews[]) => void,
  onError?: (error: Error) => void
) {
  const newsCol = collection(db, 'news');
  
  return onSnapshot(
    newsCol,
    (snapshot) => {
      if (snapshot.empty) {
        // If Firestore is empty, seed initial data to Firestore and show initial
        onUpdate(INITIAL_CARD_NEWS);
        seedInitialDataIfNeeded();
      } else {
        const list: CardNews[] = [];
        snapshot.forEach((d) => {
          list.push(d.data() as CardNews);
        });

        // Ensure newly introduced built-in initial items are also present
        const fetchedIds = new Set(list.map((n) => n.id));
        const missingInitial = INITIAL_CARD_NEWS.filter((n) => !fetchedIds.has(n.id));
        const combined = [...list, ...missingInitial];

        // Sort by date descending
        combined.sort((a, b) => {
          const dateComp = (b.date || '').localeCompare(a.date || '');
          if (dateComp !== 0) return dateComp;
          return (b.id || '').localeCompare(a.id || '');
        });

        onUpdate(combined);
      }
    },
    (err) => {
      console.error('Firestore news listener error:', err);
      if (onError) onError(err);
    }
  );
}

// Add or update a news item in Firestore
export async function saveNewsToFirestore(news: CardNews): Promise<boolean> {
  try {
    const newsRef = doc(db, 'news', news.id);
    const cleaned = cleanData({
      ...news,
      updatedAt: new Date().toISOString()
    });
    await setDoc(newsRef, cleaned);
    console.log('Successfully written news to Firestore document:', news.id);
    return true;
  } catch (err) {
    console.error('Failed writing news to Firestore:', err);
    throw err;
  }
}

// Delete a news item from Firestore
export async function deleteNewsFromFirestore(newsId: string): Promise<boolean> {
  try {
    const newsRef = doc(db, 'news', newsId);
    await deleteDoc(newsRef);
    console.log('Successfully deleted news from Firestore:', newsId);
    return true;
  } catch (err) {
    console.error('Failed deleting news from Firestore:', err);
    throw err;
  }
}

// Update like count in Firestore
export async function likeNewsInFirestore(newsId: string, currentLikes: number): Promise<void> {
  try {
    const newsRef = doc(db, 'news', newsId);
    await updateDoc(newsRef, {
      likes: (currentLikes || 0) + 1
    });
  } catch (err) {
    console.warn('Failed to update likes in Firestore:', err);
  }
}

// Real-time listener for Donors & Cheer Wall
export function subscribeDonors(
  onUpdate: (donors: DonorRecord[]) => void,
  onError?: (error: Error) => void
) {
  const donorsCol = collection(db, 'donors');

  return onSnapshot(
    donorsCol,
    (snapshot) => {
      const list: DonorRecord[] = [];
      snapshot.forEach((d) => {
        list.push(d.data() as DonorRecord);
      });

      // Combine with INITIAL_DONORS if any exist
      const fetchedIds = new Set(list.map((d) => d.id));
      const missingInitial = INITIAL_DONORS.filter((d) => !fetchedIds.has(d.id));
      const combined = [...list, ...missingInitial];

      // Sort by timestamp or date descending
      onUpdate(combined);
    },
    (err) => {
      console.error('Firestore donors listener error:', err);
      if (onError) onError(err);
    }
  );
}

// Add a donor record to Firestore
export async function saveDonorToFirestore(donor: DonorRecord): Promise<boolean> {
  try {
    const donorRef = doc(db, 'donors', donor.id);
    const cleaned = cleanData({
      ...donor,
      createdAt: new Date().toISOString()
    });
    await setDoc(donorRef, cleaned);
    return true;
  } catch (err) {
    console.error('Failed writing donor to Firestore:', err);
    throw err;
  }
}

// Update donor status
export async function updateDonorStatusInFirestore(
  donorId: string,
  status: '대기' | '발급완료' | '취소'
): Promise<void> {
  const donorRef = doc(db, 'donors', donorId);
  await updateDoc(donorRef, { status });
}

// Delete donor from Firestore
export async function deleteDonorFromFirestore(donorId: string): Promise<void> {
  const donorRef = doc(db, 'donors', donorId);
  await deleteDoc(donorRef);
}

// Real-time listener for Campaign Stats
export function subscribeCampaignStats(
  onUpdate: (stats: CampaignStats) => void,
  onError?: (error: Error) => void
) {
  const statsDocRef = doc(db, 'settings', 'campaign_stats');

  return onSnapshot(
    statsDocRef,
    (snap) => {
      if (snap.exists()) {
        const data = snap.data() as CampaignStats;
        // Merge with code CAMPAIGN_STATS taking max currentAmount / donorCount
        const merged: CampaignStats = {
          targetAmount: data.targetAmount || CAMPAIGN_STATS.targetAmount,
          currentAmount: Math.max(data.currentAmount || 0, CAMPAIGN_STATS.currentAmount),
          donorCount: Math.max(data.donorCount || 0, CAMPAIGN_STATS.donorCount),
          daysLeft: data.daysLeft ?? CAMPAIGN_STATS.daysLeft,
          startDate: data.startDate || CAMPAIGN_STATS.startDate,
          endDate: data.endDate || CAMPAIGN_STATS.endDate
        };
        onUpdate(merged);
      } else {
        onUpdate(CAMPAIGN_STATS);
        setDoc(statsDocRef, cleanData(CAMPAIGN_STATS)).catch((e) => console.warn(e));
      }
    },
    (err) => {
      console.error('Firestore campaign stats listener error:', err);
      if (onError) onError(err);
    }
  );
}

// Save or update Campaign Stats in Firestore
export async function saveCampaignStatsToFirestore(stats: CampaignStats): Promise<boolean> {
  try {
    const statsDocRef = doc(db, 'settings', 'campaign_stats');
    await setDoc(statsDocRef, cleanData(stats));
    return true;
  } catch (err) {
    console.error('Failed writing campaign stats to Firestore:', err);
    throw err;
  }
}
