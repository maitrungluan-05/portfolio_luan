import type { ProjectItem, WhatIDoItem, MomentItem, JourneyItem, ContactLink, StoryCardItem, ServiceItem } from '../types';

export const PERSONAL_INFO = {
  name: 'TRUNG LUÂN',
  fullName: 'MAI TRUNG LUÂN',
  shortName: 'LUAN',
  phone: '0974496371',
  zalo: 'https://zalo.me/0974496371',
  taglines: ['WEB DEVELOPER', 'DIGITAL CREATOR', 'BASED IN VIETNAM'],
  location: 'Cát Tiến, Bình Định, Việt Nam',
  year: '2026',
  email: 'maitrungluan@gmail.com',
  telegram: 'https://t.me/hayakiteno',
  facebook: 'https://www.facebook.com/100035955261664',
  instagram: 'https://instagram.com/teno_wbd',
  mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3870.7637180674196!2d109.2366403!3d14.0320154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x316f4783a9870509%3A0x9cc7d822ab0ca8d2!2sTrung%20Lu%C3%A2n%20MMO!5e0!3m2!1svi!2svn!4v1700000000000!5m2!1svi!2svn',
  mapsPublicUrl: 'https://maps.app.goo.gl/a6FLgXSrK6skTnnE9',
};

export const STORY_MARQUEE_ROW_1: StoryCardItem[] = [
  { id: 's1', category: 'MOMENT', title: 'Bình minh biển Cát Tiến', image: '/images/story-01.jpg', subtitle: 'Bình Định' },
  { id: 's2', category: 'JOURNEY', title: 'Khát vọng vươn xa', image: '/images/story-02.jpg', subtitle: 'Biển Cát Tiến' },
  { id: 's3', category: 'MOMENT', title: 'Mai Trung Luân', image: '/images/story-03.jpg', subtitle: 'Đà Lạt Trip' },
  { id: 's4', category: 'WORK', title: 'Cột mốc FPT Polytechnic', image: '/images/story-04.jpg', subtitle: 'Tốt nghiệp Giỏi' },
  { id: 's5', category: 'WORK', title: 'Bàn làm việc & Học tập', image: '/images/story-05.jpg', subtitle: 'Tech Space' },
  { id: 's6', category: 'HOME', title: 'Bầu trời miền gió cát', image: '/images/story-06.jpg', subtitle: 'Bình Định' },
];

export const STORY_MARQUEE_ROW_2: StoryCardItem[] = [
  { id: 's7', category: 'MOMENT', title: 'Mây hồng sớm mai', image: '/images/story-07.jpg', subtitle: 'Biển Cát Tiến' },
  { id: 's8', category: 'MOMENT', title: 'Người bạn nhỏ đồng hành', image: '/images/story-08.jpg', subtitle: 'Lifestyle' },
  { id: 's9', category: 'HOME', title: 'Rạng đông trên biển', image: '/images/story-09.jpg', subtitle: 'Tĩnh lặng' },
  { id: 's10', category: 'HOME', title: 'Bình minh rực rỡ', image: '/images/story-10.jpg', subtitle: 'Nơi tôi bắt đầu' },
  { id: 's11', category: 'WORK', title: 'Dopamine Detox', image: '/images/story-11.jpg', subtitle: 'Tập trung' },
  { id: 's12', category: 'JOURNEY', title: 'Creative Developer', image: '/images/story-12.jpg', subtitle: 'Mai Trung Luân' },
];

export const ABOUT_TEXT = `Tôi là Mai Trung Luân.

Tôi yêu công nghệ, thích xây dựng những sản phẩm trên Internet và luôn tò mò về cách một ý tưởng có thể trở thành thứ mà mọi người thực sự nhìn thấy và sử dụng.

Website này là một nơi nhỏ để tôi lưu lại công việc, những dự án đã thực hiện, quê hương và một vài khoảnh khắc trong hành trình của mình.`;

export const ABOUT_FRAGMENTS = [
  { image: '/images/about-01.jpg', title: 'Khát vọng vươn xa', subtitle: 'Biển Cát Tiến, Bình Định', rotation: -3, pos: 'top-left' },
  { image: '/images/about-02.jpg', title: 'Mai Trung Luân', subtitle: 'Bình minh quê hương', rotation: 2, pos: 'top-right' },
  { image: '/images/about-03.jpg', title: 'Tập trung & Tĩnh lặng', subtitle: 'Dopamine Detox', rotation: -2, pos: 'bottom-left' },
  { image: '/images/about-04.jpg', title: 'Gốc rễ vững chắc', subtitle: 'Cát Tiến, Bình Định', rotation: 3, pos: 'bottom-right' },
];

export const WHAT_I_DO_ITEMS: WhatIDoItem[] = [
  {
    number: '01',
    title: 'WEB DEVELOPMENT',
    description: 'Xây dựng website, landing page và các hệ thống web với giao diện hiện đại, tối ưu trải nghiệm người dùng.',
    skills: ['React & Next.js', 'TypeScript', 'Tailwind CSS', 'Performance Optimization', 'Responsive Architecture'],
  },
  {
    number: '02',
    title: 'AUTOMATION',
    description: 'Xây dựng bot, công cụ tự động hóa và các hệ thống giúp giảm thao tác thủ công trong công việc.',
    skills: ['Telegram / Discord Bots', 'Workflow Automation', 'Node.js & Python', 'Webhook Systems', 'Task Scheduling'],
  },
  {
    number: '03',
    title: 'DIGITAL PRODUCTS',
    description: 'Phát triển các sản phẩm số từ ý tưởng, thiết kế luồng hoạt động đến triển khai thực tế.',
    skills: ['Product Ideation', 'UX/UI Logic', 'Database Modeling', 'API Integration', 'Deployment & Scaling'],
  },
  {
    number: '04',
    title: 'CREATIVE WEB',
    description: 'Thử nghiệm animation, interaction và những trải nghiệm web không chỉ đúng chức năng mà còn có cá tính.',
    skills: ['Framer Motion', 'Micro-interactions', 'Custom Typography', 'Glassmorphism & Depth', 'Visual Storytelling'],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'dld-media',
    number: '01',
    name: 'DLD MEDIA',
    type: 'WEB / DIGITAL',
    description: 'Website và hệ thống digital phục vụ thương hiệu, dịch vụ trực tuyến và các hoạt động truyền thông.',
    longDescription: 'Hệ thống nền tảng trực tuyến toàn diện cho thương hiệu DLD Media với khả năng hiển thị danh mục dịch vụ ấn tượng, hệ thống quản trị nội dung tối ưu SEO, tốc độ tải trang dưới 0.8 giây và trải nghiệm người dùng liền mạch trên mọi thiết bị.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite', 'Cloudflare'],
    images: ['/images/project-dld-01.jpg', '/images/project-dld-02.jpg', '/images/project-dld-03.jpg'],
    metrics: [
      { label: 'Tốc độ tải', value: '< 0.8s' },
      { label: 'Điểm Lighthouse', value: '98/100' },
      { label: 'Tương tác người dùng', value: '+140%' },
    ],
    liveUrl: '#',
    featured: true,
  },
  {
    id: 'automation-system',
    number: '02',
    name: 'AUTOMATION SYSTEM',
    type: 'BOT / BACKEND',
    description: 'Hệ thống bot và automation hỗ trợ theo dõi dữ liệu, xử lý tác vụ và gửi thông báo tự động.',
    longDescription: 'Kiến trúc tự động hóa phân tán giúp xử lý hàng ngàn tác vụ định kỳ mỗi ngày, quét dữ liệu thời gian thực, tự động gửi cảnh báo tức thời qua Telegram Bot API và tích hợp dashboard quản lý trạng thái máy chủ 24/7.',
    technologies: ['Node.js', 'Python', 'Telegram API', 'Redis', 'Docker', 'Webhooks'],
    images: ['/images/project-auto-01.jpg', '/images/project-auto-02.jpg', '/images/project-auto-03.jpg'],
    metrics: [
      { label: 'Tác vụ/ngày', value: '50,000+' },
      { label: 'Thời gian phản hồi', value: '< 200ms' },
      { label: 'Thời gian hoạt động (Uptime)', value: '99.9%' },
    ],
    liveUrl: '#',
    featured: true,
  },
  {
    id: 'creative-experiments',
    number: '03',
    name: 'EXPERIMENTS',
    type: 'CREATIVE DEVELOPMENT',
    description: 'Những thử nghiệm về giao diện, hiệu ứng, animation và trải nghiệm tương tác trên web.',
    longDescription: 'Không gian phòng thí nghiệm sáng tạo dành riêng cho việc nghiên cứu các kỹ thuật tương tác thị giác tiên tiến: magnetic physics, scroll-driven visual narratives, spatial typography và bố cục tạp chí tương tác thế hệ mới.',
    technologies: ['Framer Motion', 'Canvas API', 'Kinetic Typography', 'CSS Shaders', 'Web Audio API'],
    images: ['/images/project-lab-01.jpg', '/images/project-lab-02.jpg', '/images/project-lab-03.jpg'],
    metrics: [
      { label: 'Thử nghiệm UI', value: '24+ Labs' },
      { label: 'Tỷ lệ khung hình', value: '60 FPS' },
      { label: 'Trải nghiệm thị giác', value: 'Aesthetic' },
    ],
    liveUrl: '#',
    featured: true,
  },
];

export const HOMETOWN_STORY = {
  title: 'NƠI TÔI BẮT ĐẦU',
  locationName: 'CÁT TIẾN — BÌNH ĐỊNH',
  paragraphs: [
    'Trước khi có những dòng code, những dự án và những ý tưởng trên Internet, tôi bắt đầu từ một nơi rất bình dị.',
    'Đây là quê hương của tôi — một phần trong câu chuyện mà tôi luôn muốn giữ lại.',
  ],
  quote: 'Biển xanh, bình minh rạng rỡ và ngọn gió miền Trung nuôi dưỡng sự kiên định trong từng dòng mã.',
  heroImage: '/images/hometown-hero.jpg',
};

export const MOMENTS: MomentItem[] = [
  {
    id: 'm1',
    title: 'Bình minh trên biển Cát Tiến',
    category: 'HOMETOWN',
    location: 'Cát Tiến, Bình Định',
    aspectRatio: 'landscape',
    image: '/images/moment-01.jpg',
    caption: 'Những buổi sớm mai ngập tràn ánh hồng rực rỡ đón tia nắng đầu ngày trên bãi biển quê hương.',
  },
  {
    id: 'm2',
    title: 'Góc làm việc & Học tập không ngừng',
    category: 'WORK',
    location: 'Workspace',
    aspectRatio: 'landscape',
    image: '/images/moment-02.jpg',
    caption: 'Góc công nghệ với bàn phím cơ RGB, không gian trau dồi kiến thức và phát triển hệ thống.',
  },
  {
    id: 'm3',
    title: 'Cột mốc FPT Polytechnic',
    category: 'WORK',
    location: 'FPT Polytechnic',
    aspectRatio: 'landscape',
    image: '/images/moment-03.jpg',
    caption: 'Tốt nghiệp loại Giỏi chuyên ngành CNTT & Chứng chỉ tiếng Anh tại FPT Polytechnic.',
  },
  {
    id: 'm4',
    title: 'Dopamine Detox & Đọc sách',
    category: 'LIFESTYLE',
    location: 'Studio Desk',
    aspectRatio: 'portrait',
    image: '/images/moment-04.jpg',
    caption: 'Thanh lọc tâm trí để tập trung tối đa vào những mục tiêu và kiến trúc phần mềm cốt lõi.',
  },
  {
    id: 'm5',
    title: 'Biển xanh & Nắng sớm Cát Tiến',
    category: 'TRAVEL',
    location: 'Duyên hải Bình Định',
    aspectRatio: 'portrait',
    image: '/images/moment-05.jpg',
    caption: 'Chiếc nón đỏ đứng trước dải biển bao la, sẵn sàng đón nhận mọi thử thách và chân trời mới.',
  },
  {
    id: 'm6',
    title: 'Người bạn nhỏ đồng hành',
    category: 'LIFESTYLE',
    location: 'Cát Tiến, Bình Định',
    aspectRatio: 'portrait',
    image: '/images/moment-06.jpg',
    caption: 'Khoảnh khắc vui vẻ và năng lượng tích cực từ người bạn nhỏ đồng hành trên từng cung đường.',
  },
  {
    id: 'm7',
    title: 'Rạng đông trên biển quê hương',
    category: 'HOMETOWN',
    location: 'Cát Tiến, Bình Định',
    aspectRatio: 'landscape',
    image: '/images/moment-07.jpg',
    caption: 'Những tia sáng bình minh đầu tiên vừa ló rạng phía chân trời biển Đông Cát Tiến.',
  },
];

export const JOURNEY_STEPS: JourneyItem[] = [
  {
    number: '01',
    stage: 'START',
    period: '2020 — 2021',
    title: 'Niềm say mê công nghệ ban đầu',
    description: 'Bắt đầu tò mò về cách các website và hệ thống trên mạng Internet vận hành. Tự học những dòng code HTML, CSS đầu tiên và xây dựng các trang web đơn giản.',
    tags: ['Tự học', 'Cơ bản Web', 'Khám phá', 'Đam mê'],
  },
  {
    number: '02',
    stage: 'WEB DEVELOPMENT',
    period: '2022 — 2023',
    title: 'Học hỏi & Xây dựng giao diện web chuyên nghiệp',
    description: 'Đào sâu vào hệ sinh thái hiện đại: React, TypeScript, Tailwind CSS, tối ưu hiệu năng và kiến trúc giao diện tương tác mượt mà.',
    tags: ['React', 'TypeScript', 'UI/UX', 'Component Systems'],
  },
  {
    number: '03',
    stage: 'BUILDING PRODUCTS',
    period: '2024 — 2025',
    title: 'Tự động hóa, Bots & Sản phẩm thực tế',
    description: 'Mở rộng sang backend và hệ thống tự động hóa: phát triển bot, xử lý dữ liệu tự động, API và giải pháp số cho các dịch vụ trực tuyến.',
    tags: ['Automation', 'Bot System', 'Digital Services', 'Real Impact'],
  },
  {
    number: '04',
    stage: 'NOW',
    period: '2026 & Tương lai',
    title: 'Tiếp tục học hỏi, thử nghiệm & sáng tạo',
    description: 'Không ngừng nâng cấp kỹ năng, kết hợp tư duy sản phẩm với trải nghiệm thị giác đột phá để tạo nên những sản phẩm số đậm chất riêng.',
    tags: ['Creative Dev', 'Motion Design', 'Digital Identity', 'Scaling'],
  },
];

export const CONTACT_CHANNELS: ContactLink[] = [
  {
    name: 'ZALO',
    handle: '0974.496.371 (Mai Trung Luân)',
    url: 'https://zalo.me/0974496371',
    category: 'Tư vấn trực tiếp & Ưu tiên phản hồi nhanh nhất',
    isPrimary: true,
  },
  {
    name: 'FACEBOOK',
    handle: 'Mai Trung Luân',
    url: 'https://www.facebook.com/100035955261664',
    category: 'Mạng xã hội cá nhân & Khách hàng',
  },
  {
    name: 'TELEGRAM',
    handle: '@hayakiteno',
    url: 'https://t.me/hayakiteno',
    category: 'Trao đổi công việc & Kỹ thuật Bot',
  },
  {
    name: 'INSTAGRAM',
    handle: '@teno_wbd',
    url: 'https://instagram.com/teno_wbd',
    category: 'Hình ảnh & Đời sống thường ngày',
  },
  {
    name: 'EMAIL',
    handle: 'maitrungluan@gmail.com',
    url: 'mailto:maitrungluan@gmail.com',
    category: 'Hợp tác & Dự án lớn',
  },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'facebook',
    category: 'FACEBOOK SERVICES',
    icon: 'Facebook',
    accentColor: '#1877F2',
    title: 'Dịch Vụ Facebook & Tool Automation',
    tagline: 'Tăng trưởng tương tác, bảo mật tài khoản & giải pháp tự động hóa Facebook.',
    features: [
      'Tăng Like, Follower, Bình luận, Mắt xem Livestream người dùng thật',
      'Chăm sóc & phát triển Fanpage, Group, Profile cá nhân chuẩn tệp',
      'Viết Tool / Bot tự động Check LIVE/DIE & Quản lý tài khoản số lượng lớn',
      'Khắc phục sự cố, bảo mật & mở khóa tài khoản Facebook nhanh chóng',
    ],
    ctaUrl: 'https://zalo.me/0974496371',
    ctaText: 'Chat Zalo Tư Vấn Facebook',
    highlight: true,
    sortOrder: 1,
  },
  {
    id: 'google-maps',
    category: 'GOOGLE MAPS SEO',
    icon: 'MapPin',
    accentColor: '#34A853',
    title: 'Dịch Vụ Google Maps & Local SEO',
    tagline: 'Xác minh địa điểm, kéo khách hàng thực tế và thống trị tìm kiếm địa phương.',
    features: [
      'Khởi tạo & Xác minh địa điểm Google Maps chuẩn xác (như TRUNG LUÂN MMO)',
      'Tăng đánh giá (Review) 5 sao thực tế, seeding nhận xét uy tín',
      'Tối ưu SEO Top 1 Google Search & Google Maps cho cửa hàng, doanh nghiệp',
      'Kháng nghị, xử lý Maps bị tạm ngưng hoặc đổi thông tin nhanh chóng',
    ],
    ctaUrl: 'https://zalo.me/0974496371',
    ctaText: 'Tư Vấn Google Maps Qua Zalo',
    highlight: true,
    sortOrder: 2,
  },
  {
    id: 'tiktok',
    category: 'TIKTOK SERVICES',
    icon: 'Video',
    accentColor: '#FE2C55',
    title: 'Dịch Vụ TikTok & Xây Kênh',
    tagline: 'Tăng tốc độ lan tỏa video, kéo Follower thật và xây kênh thương hiệu.',
    features: [
      'Tăng Follower, Tim, View video TikTok đúng tệp khách hàng mục tiêu',
      'Tăng mắt xem Livestream, đẩy đề xuất và tương tác thời gian thực',
      'Tư vấn định hướng nội dung & chiến lược xây kênh TikTok bền vững',
      'Tool / Script tự động hóa đăng bài, quét dữ liệu xu hướng TikTok',
    ],
    ctaUrl: 'https://zalo.me/0974496371',
    ctaText: 'Nhắn Zalo Tư Vấn TikTok',
    highlight: false,
    sortOrder: 3,
  },
  {
    id: 'youtube',
    category: 'YOUTUBE GROWTH',
    icon: 'Youtube',
    accentColor: '#FF0000',
    title: 'Dịch Vụ YouTube & Bật Kiếm Tiền',
    tagline: 'Tối ưu chuẩn SEO Video, đạt đủ điều kiện kiếm tiền và giữ chân người xem.',
    features: [
      'Tăng Subscribe, Lượt xem (Views) & Giờ xem chất lượng cao',
      'Hỗ trợ đạt điều kiện bật kiếm tiền YouTube an toàn 100%',
      'Tối ưu SEO Tiêu đề, Thẻ Tag, Thumbnail đạt Top tìm kiếm YouTube',
      'Hỗ trợ chiến lược phát triển Video dài & YouTube Shorts',
    ],
    ctaUrl: 'https://zalo.me/0974496371',
    ctaText: 'Tư Vấn YouTube Qua Zalo',
    highlight: false,
    sortOrder: 4,
  },
  {
    id: 'instagram',
    category: 'INSTAGRAM BRANDING',
    icon: 'Instagram',
    accentColor: '#E1306C',
    title: 'Dịch Vụ Instagram & Engagement',
    tagline: 'Xây dựng hình ảnh trang cá nhân / shop sang trọng, thu hút tệp khách cao cấp.',
    features: [
      'Tăng Follower, Like bài viết, Thả tim Story & Reels tương tác cao',
      'Tối ưu giao diện Bio, Highlight & layout Instagram chuyên nghiệp',
      'Seeding bình luận bán hàng và uy tín cho shop thương mại điện tử',
      'Giải pháp bảo vệ bản quyền hình ảnh và an toàn tài khoản',
    ],
    ctaUrl: 'https://zalo.me/0974496371',
    ctaText: 'Tư Vấn Instagram Qua Zalo',
    highlight: false,
    sortOrder: 5,
  },
  {
    id: 'coding-bot',
    category: 'DEVELOPMENT & BOTS',
    icon: 'Code',
    accentColor: '#00D2FF',
    title: 'Lập Trình Web & Bot MMO Theo Yêu Cầu',
    tagline: 'Thiết kế website bán hàng, Landing Page tốc độ cao và Bot Telegram 24/7.',
    features: [
      'Thiết kế Landing Page / Website MMO chuẩn SEO, tải trang dưới 0.8 giây',
      'Lập trình Telegram Bot, Discord Bot tự động nhận diện thanh toán & thông báo',
      'Xây dựng hệ thống Backend .NET / Node.js / Python chạy liên tục 24/7',
      'Bàn giao đầy đủ Source Code và hướng dẫn vận hành chi tiết',
    ],
    ctaUrl: 'https://zalo.me/0974496371',
    ctaText: 'Đặt Làm Web / Bot (Zalo)',
    highlight: true,
    sortOrder: 6,
  },
];
