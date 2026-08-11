import { CardNews, ArchiveItem, DonorRecord } from '../types';

export const CAMPAIGN_STATS = {
  targetAmount: 113000000, // 1억 1,300만원
  currentAmount: 28077000, // 2,807만 7,000원 (28,077,000원)
  donorCount: 132, // 132명
  daysLeft: 142,
  startDate: '2026-04-27',
  endDate: '2026-12-31'
};

export const INITIAL_CARD_NEWS: CardNews[] = [
  {
    id: 'news-sbs-kkokkomu',
    title: 'SBS 꼬리에 꼬리를 무는 이야기 231회 1992년 윤금이 씨 사건 방영',
    titleEn: 'SBS "Stories of Biting Tails" Ep.231 Features 1992 Yun Geum-i Incident',
    category: '소식',
    categoryEn: 'News',
    date: '2026.07.25',
    summary: 'SBS 꼬리에 꼬리를 무는 이야기(꼬꼬무) 231회에서 1992년 윤금이 씨 사건과 기지촌 여성 인권의 역사가 재조명되었습니다. 방송 영상을 바로 시청하실 수 있습니다.',
    summaryEn: 'Episode 231 of SBS "Stories of Biting Tails" shed light on the 1992 Yun Geum-i incident and the history of human rights of military camp town women. You can watch the broadcast video directly.',
    thumbnail: 'https://img.youtube.com/vi/sfTe79_Lo3g/hqdefault.jpg',
    slides: [
      'https://img.youtube.com/vi/sfTe79_Lo3g/hqdefault.jpg'
    ],
    content: `SBS '꼬리에 꼬리를 무는 이야기' 231회에서 1992년 윤금이 씨 사건과 당시 사건의 진상 규명 및 주한미군 범죄 근절을 위해 펼쳤던 시민사회의 투쟁의 역사가 깊이 있게 다뤄졌습니다.\n\n기억과 평화의 집은 잊혀져 가는 역사를 기억하고 평화와 인권의 가치를 나누기 위해 윤금이 씨 사건 터를 매입하여 평화 보금자리를 조성하고 있습니다.\n\n아래 [방송 시청하기] 버튼 또는 유튜브 링크를 통해 방송 영상을 바로 확인하실 수 있습니다.`,
    contentEn: `Episode 231 of SBS 'Stories of Biting Tails' provided an in-depth look into the 1992 Yun Geum-i incident and civil society's historical struggles to uncover the truth and eliminate USFK crimes.\n\nThe House of Memory and Peace is acquiring the site of the Yun Geum-i incident to preserve forgotten history and create a sanctuary of peace and human rights.\n\nYou can watch the full video on YouTube via the link below.`,
    author: '사무국',
    authorEn: 'Secretariat',
    views: 0,
    likes: 0,
    featured: true,
    externalLink: 'https://www.youtube.com/watch?v=sfTe79_Lo3g'
  },
  {
    id: 'news-gg-women-archive',
    title: '경기도여성가족재단 기지촌여성인권 아카이빙 잊히지 않을 목소리 영상보기',
    titleEn: 'Gyeonggi Women & Family Foundation Archival Video "Unforgotten Voices"',
    category: '소식',
    categoryEn: 'News',
    date: '2026.07.24',
    summary: '경기도여성가족재단에서 제작한 기지촌여성인권 아카이빙 기록 영상 「잊히지 않을 목소리」를 시청하실 수 있습니다.',
    summaryEn: 'Watch "Unforgotten Voices", an archival documentary produced by the Gyeonggi Women & Family Foundation documenting the history and human rights of military camp town women.',
    thumbnail: 'https://img.youtube.com/vi/L1IpA6CxVEQ/hqdefault.jpg',
    slides: [
      'https://img.youtube.com/vi/L1IpA6CxVEQ/hqdefault.jpg'
    ],
    content: `경기도여성가족재단에서 기지촌 여성 인권의 역사와 기억을 기록하고 보존하기 위해 제작한 아카이빙 영상 「잊히지 않을 목소리」입니다.\n\n역사의 아픔을 증언하고 기억과 평화의 가치를 전하는 소중한 구술 기록 영상입니다.\n\n아래 [방송 바로보기] 버튼을 클릭하시면 유튜브에서 전체 영상을 시청하실 수 있습니다.`,
    contentEn: `"Unforgotten Voices" is an archival recording produced by the Gyeonggi Women & Family Foundation to record and preserve the history and memory of military camp town women's human rights.\n\nIt is a precious oral history video testifying to historical pain and conveying the values of memory and peace.\n\nClick the button below to watch the full video on YouTube.`,
    author: '사무국',
    authorEn: 'Secretariat',
    views: 0,
    likes: 0,
    featured: true,
    externalLink: 'https://www.youtube.com/watch?v=L1IpA6CxVEQ'
  }
];

export const INITIAL_DONORS: DonorRecord[] = [];

export const INITIAL_ARCHIVES: ArchiveItem[] = [
  {
    id: 'arch-sbs-kkokkomu',
    title: 'SBS 꼬리에 꼬리를 무는 이야기 231회 1992년 윤금이 씨 사건 방영',
    year: '2026',
    category: '사진/영상',
    summary: 'SBS 꼬리에 꼬리를 무는 이야기(꼬꼬무) 231회에서 1992년 윤금이 씨 사건과 기지촌 여성 인권의 역사가 재조명되었습니다.',
    imageUrl: 'https://img.youtube.com/vi/sfTe79_Lo3g/hqdefault.jpg',
    tags: ['SBS꼬꼬무', '윤금이씨사건', '기지촌여성인권', '방송기록'],
    location: 'SBS / 유튜브',
    externalLink: 'https://www.youtube.com/watch?v=sfTe79_Lo3g'
  },
  {
    id: 'arch-gg-women',
    title: '경기도여성가족재단 기지촌여성인권 아카이빙 잊히지 않을 목소리 영상',
    year: '2026',
    category: '사료/기록',
    summary: '경기도여성가족재단에서 기지촌 여성 인권의 역사와 기억을 기록하고 보존하기 위해 제작한 아카이빙 기록 영상 「잊히지 않을 목소리」입니다.',
    imageUrl: 'https://img.youtube.com/vi/L1IpA6CxVEQ/hqdefault.jpg',
    tags: ['경기도여성가족재단', '아카이빙', '잊히지않을목소리', '구술기록'],
    location: '경기도여성가족재단 / 유튜브',
    externalLink: 'https://www.youtube.com/watch?v=L1IpA6CxVEQ'
  }
];

export const ARTICLES_OF_ASSOCIATION_PURPOSE = {
  title: '사단법인 평화시민행동 정관 목적 및 사업 원문',
  articleNumber: '제2조(목적) 및 제3조(사업)',
  content: `제2조(목적) 본 법인은 한반도 분단과 그로 인한 아픔의 상처가 존속하고 있는 우리나라에 평화와 인권의식을 높이고 기억과 평화의 공간을 마련하고 실천적인 시민행동을 통하여 자유와 정의, 인권이 바르게 실현되는 평화로운 민주사회를 이루기 위함을 목적으로 한다.

제3조(사업) 본 법인은 제2조의 목적을 달성하기 위하여 다음 각 호의 사업을 수행한다.
1. 교육사업
2. ‘기억과 평화의 집’ 건립 및 운영사업
3. 기지촌여성 지원사업
4. 공익활동지원사업
5. 정책 제안 및 입법활동
6. 국내 및 국제 교류사업
7. 연구, 학술, 출판사업
8. 공공부문 민간 위탁사업
9. 기타 본 법인의 목적달성에 필요한 사업`,
  boardMembers: '사단법인 평화시민행동'
};
