import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  getDocs,
  getDocFromServer,
  query,
  orderBy,
  limit
} from 'firebase/firestore';
import { CardNews, DonorRecord } from '../types';
import { INITIAL_CARD_NEWS, INITIAL_DONORS } from '../data/initialData';
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

// Initial news seeding if collection is brand new
export async function seedInitialDataIfNeeded() {
  try {
    const newsSnap = await getDocs(collection(db, 'news'));
    if (newsSnap.empty) {
      console.log('Seeding initial news items to Firestore...');
      for (const item of INITIAL_CARD_NEWS) {
        await setDoc(doc(db, 'news', item.id), item);
      }
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
        // If Firestore is empty, fallback to INITIAL_CARD_NEWS and seed
        onUpdate(INITIAL_CARD_NEWS);
        seedInitialDataIfNeeded();
      } else {
        const list: CardNews[] = [];
        snapshot.forEach((d) => {
          list.push(d.data() as CardNews);
        });

        // Ensure all initial essential items are included if not present
        const fetchedIds = new Set(list.map((n) => n.id));
        const missingInitial = INITIAL_CARD_NEWS.filter((n) => !fetchedIds.has(n.id));
        const combined = [...list, ...missingInitial];

        // Sort by date descending
        combined.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
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
export async function saveNewsToFirestore(news: CardNews): Promise<void> {
  const newsRef = doc(db, 'news', news.id);
  await setDoc(newsRef, {
    ...news,
    updatedAt: new Date().toISOString()
  });
}

// Delete a news item from Firestore
export async function deleteNewsFromFirestore(newsId: string): Promise<void> {
  const newsRef = doc(db, 'news', newsId);
  await deleteDoc(newsRef);
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
export async function saveDonorToFirestore(donor: DonorRecord): Promise<void> {
  const donorRef = doc(db, 'donors', donor.id);
  await setDoc(donorRef, {
    ...donor,
    createdAt: new Date().toISOString()
  });
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
