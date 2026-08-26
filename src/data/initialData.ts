import { CardNews, ArchiveItem, DonorRecord } from '../types';

export const CAMPAIGN_STATS = {
  targetAmount: 113000000, // 1억 1,300만원
  currentAmount: 37507000, // 3,750만 7,000원 (37,507,000원)
  donorCount: 247, // 247명 (기존 238명 + 후원자 9명 추가)
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
  },
  {
    id: 'cheer-video-1',
    title: '각계인사 후원 응원 메시지 영상 - "기억과 평화의 집 건립을 응원합니다" (#1)',
    titleEn: 'Cheer Message from Prominent Figures - Support "House of Memory and Peace" (#1)',
    category: '활동',
    categoryEn: 'Activities',
    date: '2026.08.01',
    summary: '각계인사분들께서 전해주신 기억과 평화의 집 건립 후원 응원 메시지 영상입니다. 인권과 평화의 가치를 높이는 여정에 함께합니다.',
    summaryEn: 'Cheer message video from prominent figures supporting the establishment of the House of Memory and Peace.',
    thumbnail: 'https://img.youtube.com/vi/qvqfkQG8vGs/hqdefault.jpg',
    slides: ['https://img.youtube.com/vi/qvqfkQG8vGs/hqdefault.jpg'],
    content: `기억과 평화의 집 건립과 평화·인권 가치 확산을 위해 각계인사분들께서 보내주신 따뜻한 후원 응원 영상입니다.\n\n시민 한 분 한 분의 관심과 마음이 모여 역사의 아픔을 위로하고 평화의 보금자리를 만들어갑니다. 영상 플레이어를 통해 응원 메시지를 직접 시청해 보세요!`,
    contentEn: `Warm support cheer video from prominent figures for establishing the House of Memory and Peace.`,
    author: '추진위원회',
    authorEn: 'Promotional Committee',
    views: 0,
    likes: 12,
    featured: true,
    badge: '후원 응원',
    youtubeId: 'qvqfkQG8vGs',
    externalLink: 'https://www.youtube.com/watch?v=qvqfkQG8vGs',
    isVideo: true
  },
  {
    id: 'cheer-video-2',
    title: '각계인사 후원 응원 메시지 영상 - "역사를 기억하고 미래를 여는 공간" (#2)',
    titleEn: 'Cheer Message from Prominent Figures - "Remembering History, Opening the Future" (#2)',
    category: '활동',
    categoryEn: 'Activities',
    date: '2026.08.02',
    summary: '역사의 아픔을 품고 미래의 평화를 그려나가는 기억과 평화의 집을 향한 각계인사들의 연대와 응원의 목소리입니다.',
    summaryEn: 'Voices of solidarity and cheer from prominent figures for the House of Memory and Peace.',
    thumbnail: 'https://img.youtube.com/vi/NJvGUWVAtJo/hqdefault.jpg',
    slides: ['https://img.youtube.com/vi/NJvGUWVAtJo/hqdefault.jpg'],
    content: `기억과 평화의 집 프로젝트를 지지하고 응원하는 각계인사들의 두 번째 응원 영상입니다.\n\n평화와 인권을 위한 힘찬 발걸음에 많은 시민분들의 지속적인 관심과 참여를 부탁드립니다.`,
    contentEn: `The second cheer video from prominent figures supporting the House of Memory and Peace project.`,
    author: '추진위원회',
    authorEn: 'Promotional Committee',
    views: 0,
    likes: 8,
    featured: true,
    badge: '후원 응원',
    youtubeId: 'NJvGUWVAtJo',
    externalLink: 'https://www.youtube.com/watch?v=NJvGUWVAtJo',
    isVideo: true
  },
  {
    id: 'cheer-video-3',
    title: '각계인사 후원 응원 메시지 영상 - "연대와 희망의 보금자리" (#3)',
    titleEn: 'Cheer Message from Prominent Figures - "Sanctuary of Solidarity and Hope" (#3)',
    category: '활동',
    categoryEn: 'Activities',
    date: '2026.08.03',
    summary: '기지촌 여성 인권의 역사 보존과 기억과 평화의 집 건립을 응원하는 시민사회 인사들의 응원 메시지입니다.',
    summaryEn: 'Cheer message from civil society leaders supporting the preservation of military camp town women\'s history.',
    thumbnail: 'https://img.youtube.com/vi/apQ3AN2C9Hc/hqdefault.jpg',
    slides: ['https://img.youtube.com/vi/apQ3AN2C9Hc/hqdefault.jpg'],
    content: `기억과 평화의 집이 희망과 평화의 배움터가 될 수 있도록 응원의 마음을 보태어주신 인사들의 영상입니다.\n\n역사를 잊지 않고 진정한 평화를 만들어가는 길에 함께해 주세요.`,
    contentEn: `Video message from leaders wishing the House of Memory and Peace to become a place of hope and peace.`,
    author: '추진위원회',
    authorEn: 'Promotional Committee',
    views: 0,
    likes: 15,
    featured: true,
    badge: '후원 응원',
    youtubeId: 'apQ3AN2C9Hc',
    externalLink: 'https://www.youtube.com/watch?v=apQ3AN2C9Hc',
    isVideo: true
  },
  {
    id: 'cheer-video-4',
    title: '각계인사 후원 응원 메시지 영상 - "평화와 인권을 향한 동행" (#4)',
    titleEn: 'Cheer Message from Prominent Figures - "Accompanying Peace and Human Rights" (#4)',
    category: '활동',
    categoryEn: 'Activities',
    date: '2026.08.04',
    summary: '평화와 인권의 미래를 만드는 동행에 함께해주신 각계 인사들의 진심 어린 응원 한마디입니다.',
    summaryEn: 'Heartfelt cheer messages from prominent figures walking together toward peace and human rights.',
    thumbnail: 'https://img.youtube.com/vi/Xsgy36E3ESw/hqdefault.jpg',
    slides: ['https://img.youtube.com/vi/Xsgy36E3ESw/hqdefault.jpg'],
    content: `기억과 평화의 집 건립 모금 캠페인을 향한 따뜻한 연대의 응원 메시지입니다.\n\n여러분의 후원과 관심이 모여 아픔이 치유되고 기억이 살아 숨 쉬는 보금자리가 완성됩니다.`,
    contentEn: `Warm solidarity cheer message for the fundraising campaign for the House of Memory and Peace.`,
    author: '추진위원회',
    authorEn: 'Promotional Committee',
    views: 0,
    likes: 11,
    featured: true,
    badge: '후원 응원',
    youtubeId: 'Xsgy36E3ESw',
    externalLink: 'https://www.youtube.com/watch?v=Xsgy36E3ESw',
    isVideo: true
  },
  {
    id: 'cheer-video-5',
    title: '각계인사 후원 응원 메시지 영상 - "시민의 힘으로 세우는 평화" (#5)',
    titleEn: 'Cheer Message from Prominent Figures - "Peace Built by Citizens\' Power" (#5)',
    category: '활동',
    categoryEn: 'Activities',
    date: '2026.08.05',
    summary: '잊히지 않을 목소리와 역사를 기억하기 위해 마음을 모아주시는 각계인사의 후원 응원 메시지입니다.',
    summaryEn: 'Cheer message from leaders gathering hearts to remember unforgotten voices and history.',
    thumbnail: 'https://img.youtube.com/vi/M0LaUcjor6Y/hqdefault.jpg',
    slides: ['https://img.youtube.com/vi/M0LaUcjor6Y/hqdefault.jpg'],
    content: `시민 한 사람 한 사람의 소중한 후원과 관심이 평화의 집을 건립하는 큰 동력이 됩니다.\n\n각계인사들의 응원 영상과 함께 기억과 평화의 집 건립에 지속적인 응원을 보내주세요!`,
    contentEn: `Citizen donations and support are the driving force behind building the House of Peace.`,
    author: '추진위원회',
    authorEn: 'Promotional Committee',
    views: 0,
    likes: 9,
    featured: true,
    badge: '후원 응원',
    youtubeId: 'M0LaUcjor6Y',
    externalLink: 'https://www.youtube.com/watch?v=M0LaUcjor6Y',
    isVideo: true
  },
  {
    id: 'cheer-video-6',
    title: '각계인사 후원 응원 메시지 영상 - "마음을 이어 만드는 평화공간" (#6)',
    titleEn: 'Cheer Message from Prominent Figures - "Creating Peace Space Together" (#6)',
    category: '활동',
    categoryEn: 'Activities',
    date: '2026.08.06',
    summary: '모두의 연대로 하나씩 지어가는 기억과 평화의 집 건립을 응원하는 메시지 영상입니다.',
    summaryEn: 'Message video cheering for the House of Memory and Peace built through everyone\'s solidarity.',
    thumbnail: 'https://img.youtube.com/vi/GQeETXAABTY/hqdefault.jpg',
    slides: ['https://img.youtube.com/vi/GQeETXAABTY/hqdefault.jpg'],
    content: `역사의 진실을 온전히 기록하고 보존할 수 있도록 각계각층 인사들께서 후원 응원 메시지를 전해주셨습니다.\n\n영상을 시청하시고 기억과 평화의 집 건립 챌린지에 소중한 동참을 부탁드립니다.`,
    contentEn: `Prominent leaders sent cheer messages to ensure historical truth is fully preserved.`,
    author: '추진위원회',
    authorEn: 'Promotional Committee',
    views: 0,
    likes: 14,
    featured: true,
    badge: '후원 응원',
    youtubeId: 'GQeETXAABTY',
    externalLink: 'https://www.youtube.com/watch?v=GQeETXAABTY',
    isVideo: true
  },
  {
    id: 'cheer-video-7',
    title: '각계인사 후원 응원 메시지 영상 - "우리가 함께 만드는 보금자리" (#7)',
    titleEn: 'Cheer Message from Prominent Figures - "A Home We Build Together" (#7)',
    category: '활동',
    categoryEn: 'Activities',
    date: '2026.08.07',
    summary: '기억과 평화의 집 건립을 향해 손을 맞잡은 인사들의 희망찬 후원 응원 인터뷰 영상입니다.',
    summaryEn: 'Hopeful cheer interview video of leaders joining hands for the House of Memory and Peace.',
    thumbnail: 'https://img.youtube.com/vi/ikDmjfff59U/hqdefault.jpg',
    slides: ['https://img.youtube.com/vi/ikDmjfff59U/hqdefault.jpg'],
    content: `기억과 평화의 집은 주한미군 기지촌 여성 인권의 아픔을 보듬고 진정한 평화를 이루어가는 상징적인 공간입니다.\n\n각계인사분들의 희망 찬 응원 메시지와 함께 뜻깊은 걸음에 많은 참여 바랍니다.`,
    contentEn: `The House of Memory and Peace is a symbolic space to heal wounds and build true peace.`,
    author: '추진위원회',
    authorEn: 'Promotional Committee',
    views: 0,
    likes: 16,
    featured: true,
    badge: '후원 응원',
    youtubeId: 'ikDmjfff59U',
    externalLink: 'https://www.youtube.com/watch?v=ikDmjfff59U',
    isVideo: true
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
