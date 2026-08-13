export type NavTab = '소개' | '소식 및 활동' | '기억과 평화의 집 후원' | '아카이브';

export type CategoryType = '전체' | '소식' | '활동' | '공지' | '아카이브';

export interface CardNews {
  id: string;
  title: string;
  titleEn?: string;
  category: '소식' | '활동' | '공지' | '아카이브';
  categoryEn?: string;
  date: string;
  summary: string;
  summaryEn?: string;
  thumbnail: string;
  slides: string[]; // List of card news slide image URLs or paragraphs
  content: string;
  contentEn?: string;
  author: string;
  authorEn?: string;
  views: number;
  likes: number;
  featured?: boolean;
  badge?: string;
  externalLink?: string;
  youtubeId?: string;
  isVideo?: boolean;
}

export interface DonorRecord {
  id: string;
  name: string;
  amount: number;
  date: string;
  message?: string;
  isRecurring: boolean;
  isAnonymous?: boolean;
  phone?: string;
  email?: string;
  receiptRequested?: boolean;
  receiptType?: 'individual' | 'corporate';
  residentId?: string;
  businessRegNo?: string;
  address?: string;
  paymentMethod?: string;
  status?: '대기' | '발급완료' | '취소';
}

export interface DonationFormState {
  amount: number;
  customAmount: string;
  donationType: 'once' | 'monthly';
  name: string;
  phone: string;
  email: string;
  message: string;
  receiptRequested: boolean;
  receiptType?: 'individual' | 'corporate';
  residentId?: string;
  businessRegNo?: string;
  address?: string;
  taxId: string;
  paymentMethod: 'card' | 'bank' | 'kakao' | 'naver';
  isAnonymous: boolean;
  termsAgreed: boolean;
}

export interface ArchiveItem {
  id: string;
  title: string;
  year: string;
  category: string;
  summary: string;
  imageUrl: string;
  tags: string[];
  location?: string;
  fileCount?: number;
  externalLink?: string;
}
