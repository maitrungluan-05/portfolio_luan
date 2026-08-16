import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const INITIAL_PROJECTS = [
  {
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
    sortOrder: 1,
  },
  {
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
    sortOrder: 2,
  },
  {
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
    sortOrder: 3,
  },
];

const INITIAL_MOMENTS = [
  {
    title: 'Bình minh trên biển Cát Tiến',
    category: 'HOMETOWN',
    location: 'Cát Tiến, Bình Định',
    aspectRatio: 'landscape',
    image: '/images/moment-01.jpg',
    caption: 'Những buổi sớm mai ngập tràn ánh vàng trên bãi biển quê hương, nơi mang lại nguồn năng lượng tĩnh lặng nhất.',
    sortOrder: 1,
  },
  {
    title: 'Góc làm việc & Không gian sáng tạo',
    category: 'WORK',
    location: 'Studio Desk',
    aspectRatio: 'portrait',
    image: '/images/moment-02.jpg',
    caption: 'Nơi biến những ý tưởng mộc mạc thành dòng code sống động trên màn hình.',
    sortOrder: 2,
  },
  {
    title: 'Bờ đá Trung Lương',
    category: 'HOMETOWN',
    location: 'Khu dã ngoại Trung Lương',
    aspectRatio: 'square',
    image: '/images/moment-03.jpg',
    caption: 'Sóng vỗ vào những phiến đá sừng sững qua năm tháng, biểu tượng của sự bền bỉ.',
    sortOrder: 3,
  },
  {
    title: 'Đêm muộn & Luồng suy nghĩ',
    category: 'WORK',
    location: 'Night Session',
    aspectRatio: 'landscape',
    image: '/images/moment-04.jpg',
    caption: 'Khi cả thế giới chìm vào giấc ngủ, những giải pháp kiến trúc phần mềm tốt nhất lại xuất hiện.',
    sortOrder: 4,
  },
  {
    title: 'Hành trình khám phá dải đất miền Trung',
    category: 'TRAVEL',
    location: 'Duyên hải Nam Trung Bộ',
    aspectRatio: 'wide',
    image: '/images/moment-05.jpg',
    caption: 'Mỗi cung đường là một bài học mới về con người, thiên nhiên và tư duy nhìn nhận cuộc sống.',
    sortOrder: 5,
  },
  {
    title: 'Khoảnh khắc tĩnh tại',
    category: 'LIFESTYLE',
    location: 'Vietnam',
    aspectRatio: 'portrait',
    image: '/images/moment-06.jpg',
    caption: 'Giữ cho tâm trí luôn cân bằng giữa tốc độ chóng mặt của kỷ nguyên số.',
    sortOrder: 6,
  },
  {
    title: 'Hoàng hôn trên đồi cát',
    category: 'HOMETOWN',
    location: 'Đồi cát Phương Mai, Bình Định',
    aspectRatio: 'landscape',
    image: '/images/moment-07.jpg',
    caption: 'Ánh hoàng hôn buông xuống trên miền cát trắng trải dài bất tận.',
    sortOrder: 7,
  },
];

const INITIAL_JOURNEY = [
  {
    number: '01',
    stage: 'START',
    period: '2020 — 2021',
    title: 'Niềm say mê công nghệ ban đầu',
    description: 'Bắt đầu tò mò về cách các website và hệ thống trên mạng Internet vận hành. Tự học những dòng code HTML, CSS đầu tiên và xây dựng các trang web đơn giản.',
    tags: ['Tự học', 'Cơ bản Web', 'Khám phá', 'Đam mê'],
    sortOrder: 1,
  },
  {
    number: '02',
    stage: 'WEB DEVELOPMENT',
    period: '2022 — 2023',
    title: 'Học hỏi & Xây dựng giao diện web chuyên nghiệp',
    description: 'Đào sâu vào hệ sinh thái hiện đại: React, TypeScript, Tailwind CSS, tối ưu hiệu năng và kiến trúc giao diện tương tác mượt mà.',
    tags: ['React', 'TypeScript', 'UI/UX', 'Component Systems'],
    sortOrder: 2,
  },
  {
    number: '03',
    stage: 'BUILDING PRODUCTS',
    period: '2024 — 2025',
    title: 'Tự động hóa, Bots & Sản phẩm thực tế',
    description: 'Mở rộng sang backend và hệ thống tự động hóa: phát triển bot, xử lý dữ liệu tự động, API và giải pháp số cho các dịch vụ trực tuyến.',
    tags: ['Automation', 'Bot System', 'Digital Services', 'Real Impact'],
    sortOrder: 3,
  },
  {
    number: '04',
    stage: 'NOW',
    period: '2026 & Tương lai',
    title: 'Tiếp tục học hỏi, thử nghiệm & sáng tạo',
    description: 'Không ngừng nâng cấp kỹ năng, kết hợp tư duy sản phẩm với trải nghiệm thị giác đột phá để tạo nên những sản phẩm số đậm chất riêng.',
    tags: ['Creative Dev', 'Motion Design', 'Digital Identity', 'Scaling'],
    sortOrder: 4,
  },
];

async function main() {
  console.log('🌱 Bắt đầu nạp dữ liệu mẫu (Seeding Database)...');

  // 1. Create Default Admin User
  const defaultUser = process.env.ADMIN_USERNAME || 'admin';
  const defaultPass = process.env.ADMIN_PASSWORD || 'adminpassword123';
  const hashedPassword = await bcrypt.hash(defaultPass, 10);

  const existingAdmin = await prisma.adminUser.findUnique({
    where: { username: defaultUser },
  });

  if (!existingAdmin) {
    await prisma.adminUser.create({
      data: {
        username: defaultUser,
        password: hashedPassword,
      },
    });
    console.log(`✅ Đã tạo tài khoản Admin: "${defaultUser}" / "${defaultPass}"`);
  }

  // 2. Seed Projects
  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    for (const p of INITIAL_PROJECTS) {
      await prisma.project.create({
        data: {
          number: p.number,
          name: p.name,
          type: p.type,
          description: p.description,
          longDescription: p.longDescription,
          technologies: JSON.stringify(p.technologies),
          images: JSON.stringify(p.images),
          metrics: JSON.stringify(p.metrics),
          liveUrl: p.liveUrl,
          featured: p.featured,
          sortOrder: p.sortOrder,
        },
      });
    }
    console.log(`✅ Đã nạp ${INITIAL_PROJECTS.length} dự án vào Database`);
  }

  // 3. Seed Moments
  const momentCount = await prisma.moment.count();
  if (momentCount === 0) {
    for (const m of INITIAL_MOMENTS) {
      await prisma.moment.create({
        data: {
          title: m.title,
          category: m.category,
          location: m.location,
          aspectRatio: m.aspectRatio,
          image: m.image,
          caption: m.caption,
          sortOrder: m.sortOrder,
        },
      });
    }
    console.log(`✅ Đã nạp ${INITIAL_MOMENTS.length} khoảnh khắc/ảnh vào Database`);
  }

  // 4. Seed Journey
  const journeyCount = await prisma.journeyStep.count();
  if (journeyCount === 0) {
    for (const j of INITIAL_JOURNEY) {
      await prisma.journeyStep.create({
        data: {
          number: j.number,
          stage: j.stage,
          period: j.period,
          title: j.title,
          description: j.description,
          tags: JSON.stringify(j.tags),
          sortOrder: j.sortOrder,
        },
      });
    }
    console.log(`✅ Đã nạp ${INITIAL_JOURNEY.length} cột mốc hành trình vào Database`);
  }

  // 5. Seed Site Settings (Profile, About, Hometown, Services)
  const defaultSettings = [
    {
      key: 'personal_info',
      value: JSON.stringify({
        name: 'LUAN.',
        fullName: 'Mai Trung Luân',
        shortName: 'LUAN.DEV',
        taglines: [
          'CREATIVE DEVELOPER',
          'SYSTEM & AUTOMATION',
          'BASED IN BINH DINH, VIETNAM',
        ],
        location: 'Cát Tiến, Phù Cát, Bình Định',
        year: 2026,
        email: 'contact@trungluanmmo.com',
        telegram: 'https://t.me/trungluanmmo',
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
        mapsEmbedUrl:
          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3870.7637180674196!2d109.2366403!3d14.0320154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x316f4783a9870509%3A0x9cc7d822ab0ca8d2!2sTrung%20Lu%C3%A2n%20MMO!5e0!3m2!1svi!2svn!4v1700000000000!5m2!1svi!2svn',
        mapsPublicUrl: 'https://maps.app.goo.gl/a6FLgXSrK6skTnnE9',
      }),
    },
    {
      key: 'about',
      value: JSON.stringify({
        text: 'Tôi là Mai Trung Luân — một lập trình viên trẻ xuất thân từ vùng biển Cát Tiến, Bình Định. Đam mê xây dựng các sản phẩm số tinh tế, hệ thống tự động hóa hiệu quả và trải nghiệm web tương tác giàu tính thị giác.',
      }),
    },
    {
      key: 'hometown',
      value: JSON.stringify({
        title: 'QUÊ HƯƠNG TÔI',
        locationName: 'CÁT TIẾN, BÌNH ĐỊNH',
        paragraphs: [
          'Nơi có bờ biển xanh trải dài, những đồi cát lộng gió và vẻ đẹp mộc mạc của dải đất duyên hải miền Trung.',
          'Quê hương là điểm tựa vững chắc, nơi nuôi dưỡng sự kiên trì, đam mê và khát khao tạo ra những giá trị công nghệ thực thụ.',
        ],
        quote: 'Từ miền gió cát vươn ra thế giới số.',
        heroImage: '/images/hometown-hero.jpg',
      }),
    },
  ];

  // Seed Services
  const INITIAL_SERVICES = [
    {
      id: 'facebook',
      category: 'FACEBOOK SERVICES',
      icon: 'Facebook',
      accentColor: '#1877F2',
      title: 'Dịch Vụ Facebook & Tool Automation',
      tagline: 'Tăng trưởng tương tác, bảo mật tài khoản & giải pháp tự động hóa Facebook.',
      features: JSON.stringify([
        'Tăng Like, Follower, Bình luận, Mắt xem Livestream người dùng thật',
        'Chăm sóc & phát triển Fanpage, Group, Profile cá nhân chuẩn tệp',
        'Viết Tool / Bot tự động Check LIVE/DIE & Quản lý tài khoản số lượng lớn',
        'Khắc phục sự cố, bảo mật & mở khóa tài khoản Facebook nhanh chóng',
      ]),
      ctaUrl: 'https://t.me/trungluanmmo',
      ctaText: 'Tư vấn Facebook ngay',
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
      features: JSON.stringify([
        'Khởi tạo & Xác minh địa điểm Google Maps chuẩn xác (như TRUNG LUÂN MMO)',
        'Tăng đánh giá (Review) 5 sao thực tế, seeding nhận xét uy tín',
        'Tối ưu SEO Top 1 Google Search & Google Maps cho cửa hàng, doanh nghiệp',
        'Kháng nghị, xử lý Maps bị tạm ngưng hoặc đổi thông tin nhanh chóng',
      ]),
      ctaUrl: 'https://t.me/trungluanmmo',
      ctaText: 'Tư vấn Google Maps',
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
      features: JSON.stringify([
        'Tăng Follower, Tim, View video TikTok đúng tệp khách hàng mục tiêu',
        'Tăng mắt xem Livestream, đẩy đề xuất và tương tác thời gian thực',
        'Tư vấn định hướng nội dung & chiến lược xây kênh TikTok bền vững',
        'Tool / Script tự động hóa đăng bài, quét dữ liệu xu hướng TikTok',
      ]),
      ctaUrl: 'https://t.me/trungluanmmo',
      ctaText: 'Tư vấn TikTok ngay',
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
      features: JSON.stringify([
        'Tăng Subscribe, Lượt xem (Views) & Giờ xem chất lượng cao',
        'Hỗ trợ đạt điều kiện bật kiếm tiền YouTube an toàn 100%',
        'Tối ưu SEO Tiêu đề, Thẻ Tag, Thumbnail đạt Top tìm kiếm YouTube',
        'Hỗ trợ chiến lược phát triển Video dài & YouTube Shorts',
      ]),
      ctaUrl: 'https://t.me/trungluanmmo',
      ctaText: 'Tư vấn YouTube',
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
      features: JSON.stringify([
        'Tăng Follower, Like bài viết, Thả tim Story & Reels tương tác cao',
        'Tối ưu giao diện Bio, Highlight & layout Instagram chuyên nghiệp',
        'Seeding bình luận bán hàng và uy tín cho shop thương mại điện tử',
        'Giải pháp bảo vệ bản quyền hình ảnh và an toàn tài khoản',
      ]),
      ctaUrl: 'https://t.me/trungluanmmo',
      ctaText: 'Tư vấn Instagram',
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
      features: JSON.stringify([
        'Thiết kế Landing Page / Website MMO chuẩn SEO, tải trang dưới 0.8 giây',
        'Lập trình Telegram Bot, Discord Bot tự động nhận diện thanh toán & thông báo',
        'Xây dựng hệ thống Backend .NET / Node.js / Python chạy liên tục 24/7',
        'Bàn giao đầy đủ Source Code và hướng dẫn vận hành chi tiết',
      ]),
      ctaUrl: 'https://t.me/trungluanmmo',
      ctaText: 'Đặt làm Web / Bot',
      highlight: true,
      sortOrder: 6,
    },
  ];

  for (const srv of INITIAL_SERVICES) {
    const existing = await (prisma as any).service.findUnique({
      where: { id: srv.id },
    });
    if (!existing) {
      await (prisma as any).service.create({
        data: srv,
      });
    }
  }
  console.log(`✅ Đã đồng bộ ${INITIAL_SERVICES.length} dịch vụ MMO vào Database`);

  console.log('🎉 Seeding Database hoàn tất thành công!');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi seed DB:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
