import type { ProjectItem, WhatIDoItem, MomentItem, JourneyItem, ContactLink, StoryCardItem } from '../types';

export const PERSONAL_INFO = {
  name: 'TRUNG LUÂN',
  fullName: 'MAI TRUNG LUÂN',
  shortName: 'LUAN',
  taglines: ['WEB DEVELOPER', 'DIGITAL CREATOR', 'BASED IN VIETNAM'],
  location: 'Cát Tiến, Bình Định, Việt Nam',
  year: '2026',
  email: 'contact@trungluanmmo.com',
  telegram: 'https://t.me/trungluanmmo',
  facebook: 'https://facebook.com/trungluanmmo',
  instagram: 'https://instagram.com/trungluanmmo',
  github: 'https://github.com/trungluanmmo',
  mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30983.894101485616!2d109.22739347895311!3d13.978216345607063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x316f38efcf05bf99%3A0xb35a3fa8f01b3dc9!2zQ8OhdCBUaeG6v24sIFBow7kgQ8OhdCBEaXN0cmljdCwgQmluaCBEaW5oIFByb3ZpbmNlLCBWaWV0bmFt!5e0!3m2!1svi!2svn!4v1700000000000!5m2!1svi!2svn',
  mapsPublicUrl: 'https://maps.google.com/?q=Cat+Tien,+Phu+Cat,+Binh+Dinh,+Vietnam',
};

export const STORY_MARQUEE_ROW_1: StoryCardItem[] = [
  { id: 's1', category: 'WORK', title: 'Interface Design System', image: '/images/story-01.jpg', subtitle: 'Frontend Engineering' },
  { id: 's2', category: 'HOME', title: 'Bình Định Coastline', image: '/images/story-02.jpg', subtitle: 'Cát Tiến Sunrise' },
  { id: 's3', category: 'MOMENT', title: 'Midnight Coding Focus', image: '/images/story-03.jpg', subtitle: 'Workspace Ritual' },
  { id: 's4', category: 'JOURNEY', title: 'First Digital Product', image: '/images/story-04.jpg', subtitle: '2023 Milestone' },
  { id: 's5', category: 'WORK', title: 'Data Stream Automation', image: '/images/story-05.jpg', subtitle: 'Bot Architecture' },
  { id: 's6', category: 'HOME', title: 'Trung Lương Rocky Shore', image: '/images/story-06.jpg', subtitle: 'Hometown Memory' },
];

export const STORY_MARQUEE_ROW_2: StoryCardItem[] = [
  { id: 's7', category: 'JOURNEY', title: 'Creative Web Lab', image: '/images/story-07.jpg', subtitle: 'Micro-interactions' },
  { id: 's8', category: 'MOMENT', title: 'Quiet Evening by the Sea', image: '/images/story-08.jpg', subtitle: 'Peace of Mind' },
  { id: 's9', category: 'WORK', title: 'Scalable Web Platforms', image: '/images/story-09.jpg', subtitle: 'Full-stack Systems' },
  { id: 's10', category: 'HOME', title: 'Golden Hour at Cat Tien', image: '/images/story-10.jpg', subtitle: 'Where I Grew Up' },
  { id: 's11', category: 'MOMENT', title: 'Coffee & Code Strategy', image: '/images/story-11.jpg', subtitle: 'Daily Routine' },
  { id: 's12', category: 'JOURNEY', title: 'Next Generation Web', image: '/images/story-12.jpg', subtitle: 'Future Horizons' },
];

export const ABOUT_TEXT = `Tôi là Mai Trung Luân.

Tôi yêu công nghệ, thích xây dựng những sản phẩm trên Internet và luôn tò mò về cách một ý tưởng có thể trở thành thứ mà mọi người thực sự nhìn thấy và sử dụng.

Website này là một nơi nhỏ để tôi lưu lại công việc, những dự án đã thực hiện, quê hương và một vài khoảnh khắc trong hành trình của mình.`;

export const ABOUT_FRAGMENTS = [
  { image: '/images/about-01.jpg', title: 'Digital Craft', subtitle: 'Frontend Engineering', rotation: -3, pos: 'top-left' },
  { image: '/images/about-02.jpg', title: 'Automation Flow', subtitle: 'Backend & Systems', rotation: 2, pos: 'top-right' },
  { image: '/images/about-03.jpg', title: 'Creative Lab', subtitle: 'Interaction Design', rotation: -2, pos: 'bottom-left' },
  { image: '/images/about-04.jpg', title: 'Identity', subtitle: 'Based in Vietnam', rotation: 3, pos: 'bottom-right' },
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
  quote: 'Biển xanh, núi đá và ngọn gió miền Trung nuôi dưỡng sự kiên định trong từng dòng mã.',
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
    caption: 'Những buổi sớm mai ngập tràn ánh vàng trên bãi biển quê hương, nơi mang lại nguồn năng lượng tĩnh lặng nhất.',
  },
  {
    id: 'm2',
    title: 'Góc làm việc & Không gian sáng tạo',
    category: 'WORK',
    location: 'Studio Desk',
    aspectRatio: 'portrait',
    image: '/images/moment-02.jpg',
    caption: 'Nơi biến những ý tưởng mộc mạc thành dòng code sống động trên màn hình.',
  },
  {
    id: 'm3',
    title: 'Bờ đá Trung Lương',
    category: 'HOMETOWN',
    location: 'Khu dã ngoại Trung Lương',
    aspectRatio: 'square',
    image: '/images/moment-03.jpg',
    caption: 'Sóng vỗ vào những phiến đá sừng sững qua năm tháng, biểu tượng của sự bền bỉ.',
  },
  {
    id: 'm4',
    title: 'Đêm muộn & Luồng suy nghĩ',
    category: 'WORK',
    location: 'Night Session',
    aspectRatio: 'landscape',
    image: '/images/moment-04.jpg',
    caption: 'Khi cả thế giới chìm vào giấc ngủ, những giải pháp kiến trúc phần mềm tốt nhất lại xuất hiện.',
  },
  {
    id: 'm5',
    title: 'Hành trình khám phá dải đất miền Trung',
    category: 'TRAVEL',
    location: 'Duyên hải Nam Trung Bộ',
    aspectRatio: 'wide',
    image: '/images/moment-05.jpg',
    caption: 'Mỗi cung đường là một bài học mới về con người, thiên nhiên và tư duy nhìn nhận cuộc sống.',
  },
  {
    id: 'm6',
    title: 'Khoảnh khắc tĩnh tại',
    category: 'LIFESTYLE',
    location: 'Vietnam',
    aspectRatio: 'portrait',
    image: '/images/moment-06.jpg',
    caption: 'Giữ cho tâm trí luôn cân bằng giữa tốc độ chóng mặt của kỷ nguyên số.',
  },
  {
    id: 'm7',
    title: 'Hoàng hôn trên đồi cát',
    category: 'HOMETOWN',
    location: 'Đồi cát Phương Mai, Bình Định',
    aspectRatio: 'landscape',
    image: '/images/moment-07.jpg',
    caption: 'Ánh hoàng hôn buông xuống trên miền cát trắng trải dài bất tận.',
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
    name: 'TELEGRAM',
    handle: '@trungluanmmo',
    url: 'https://t.me/trungluanmmo',
    category: 'Trực tiếp & Phản hồi nhanh',
    isPrimary: true,
  },
  {
    name: 'FACEBOOK',
    handle: 'Mai Trung Luân',
    url: 'https://facebook.com/trungluanmmo',
    category: 'Mạng xã hội cá nhân',
  },
  {
    name: 'INSTAGRAM',
    handle: '@trungluanmmo',
    url: 'https://instagram.com/trungluanmmo',
    category: 'Hình ảnh & Đời sống',
  },
  {
    name: 'EMAIL',
    handle: 'contact@trungluanmmo.com',
    url: 'mailto:contact@trungluanmmo.com',
    category: 'Hợp tác & Dự án',
  },
];
