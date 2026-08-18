import { Request, Response } from 'express';
import { prisma } from '../prisma';

// Default Fallback Settings (inline to avoid cross-boundary frontend import)
const PERSONAL_INFO = {
  name: 'TRUNG LUÂN',
  fullName: 'MAI TRUNG LUÂN',
  shortName: 'LUAN',
  phone: '0974496371',
  zalo: 'https://zalo.me/0974496371',
  taglines: ['WEB DEVELOPER', 'DIGITAL CREATOR', 'BASED IN VIETNAM'],
  location: 'Thôn Chánh Oai, Xã Cát Tiến, Tỉnh Gia Lai',
  year: '2026',
  email: 'maitrungluan@gmail.com',
  telegram: 'https://t.me/hayakiteno',
  facebook: 'https://www.facebook.com/100035955261664',
  instagram: 'https://instagram.com/teno_wbd',
};

const WHAT_I_DO_ITEMS = [
  { number: '01', title: 'WEB DEVELOPMENT', description: 'Xây dựng website, landing page và các hệ thống web với giao diện hiện đại, tối ưu trải nghiệm người dùng.', skills: ['React & Next.js', 'TypeScript', 'Tailwind CSS', 'Performance Optimization', 'Responsive Architecture'] },
  { number: '02', title: 'AUTOMATION', description: 'Xây dựng bot, công cụ tự động hóa và các hệ thống giúp giảm thao tác thủ công trong công việc.', skills: ['Telegram / Discord Bots', 'Workflow Automation', 'Node.js & Python', 'Webhook Systems', 'Task Scheduling'] },
  { number: '03', title: 'DIGITAL PRODUCTS', description: 'Phát triển các sản phẩm số từ ý tưởng, thiết kế luồng hoạt động đến triển khai thực tế.', skills: ['Product Ideation', 'UX/UI Logic', 'Database Modeling', 'API Integration', 'Deployment & Scaling'] },
  { number: '04', title: 'CREATIVE WEB', description: 'Thử nghiệm animation, interaction và những trải nghiệm web không chỉ đúng chức năng mà còn có cá tính.', skills: ['Framer Motion', 'Micro-interactions', 'Custom Typography', 'Glassmorphism & Depth', 'Visual Storytelling'] },
];

const ABOUT_TEXT = `Tôi là Mai Trung Luân.\n\nTôi yêu công nghệ, thích xây dựng những sản phẩm trên Internet và luôn tò mò về cách một ý tưởng có thể trở thành thứ mà mọi người thực sự nhìn thấy và sử dụng.\n\nWebsite này là một nơi nhỏ để tôi lưu lại công việc, những dự án đã thực hiện, quê hương và một vài khoảnh khắc trong hành trình của mình.`;

const ABOUT_FRAGMENTS = [
  { image: '/images/about-01.jpg', title: 'Khát vọng vươn xa', subtitle: 'Biển Cát Tiến, Bình Định', rotation: -3, pos: 'top-left' },
  { image: '/images/about-02.jpg', title: 'Mai Trung Luân', subtitle: 'Bình minh quê hương', rotation: 2, pos: 'top-right' },
  { image: '/images/about-03.jpg', title: 'Tập trung & Tĩnh lặng', subtitle: 'Dopamine Detox', rotation: -2, pos: 'bottom-left' },
  { image: '/images/about-04.jpg', title: 'Gốc rễ vững chắc', subtitle: 'Cát Tiến, Bình Định', rotation: 3, pos: 'bottom-right' },
];

const HOMETOWN_STORY = {
  title: 'NƠI TÔI BẮT ĐẦU',
  locationName: 'THÔN CHÁNH OAI — CÁT TIẾN',
  paragraphs: [
    'Cội nguồn sinh ra và lớn lên tại Thôn Chánh Oai, Xã Cát Hải, Huyện Phù Cát, Tỉnh Bình Định — nay được đổi thành Thôn Chánh Oai, Xã Cát Tiến, Tỉnh Gia Lai.',
    'Dù địa giới hành chính có đổi thay theo thời gian, miền gió cát Chánh Oai đong đầy ký ức tuổi thơ luôn là điểm tựa vững chắc, nuôi dưỡng sự kiên trì, đam mê và khát khao tạo ra những giá trị công nghệ thực thụ.',
  ],
  quote: 'Từ cội nguồn Thôn Chánh Oai vững bước vươn ra thế giới công nghệ số.',
  heroImage: '/images/hometown-hero.jpg',
};

const STORY_MARQUEE_ROW_1 = [
  { id: 's1', category: 'MOMENT', title: 'Bình minh biển Cát Tiến', image: '/images/story-01.jpg', subtitle: 'Bình Định' },
  { id: 's2', category: 'JOURNEY', title: 'Khát vọng vươn xa', image: '/images/story-02.jpg', subtitle: 'Biển Cát Tiến' },
  { id: 's3', category: 'MOMENT', title: 'Mai Trung Luân', image: '/images/story-03.jpg', subtitle: 'Đà Lạt Trip' },
  { id: 's4', category: 'WORK', title: 'Cột mốc FPT Polytechnic', image: '/images/story-04.jpg', subtitle: 'Tốt nghiệp Giỏi' },
  { id: 's5', category: 'WORK', title: 'Bàn làm việc & Học tập', image: '/images/story-05.jpg', subtitle: 'Tech Space' },
  { id: 's6', category: 'HOME', title: 'Bầu trời miền gió cát', image: '/images/story-06.jpg', subtitle: 'Bình Định' },
];

const STORY_MARQUEE_ROW_2 = [
  { id: 's7', category: 'MOMENT', title: 'Mây hồng sớm mai', image: '/images/story-07.jpg', subtitle: 'Biển Cát Tiến' },
  { id: 's8', category: 'MOMENT', title: 'Người bạn nhỏ đồng hành', image: '/images/story-08.jpg', subtitle: 'Lifestyle' },
  { id: 's9', category: 'HOME', title: 'Rạng đông trên biển', image: '/images/story-09.jpg', subtitle: 'Tĩnh lặng' },
  { id: 's10', category: 'HOME', title: 'Bình minh rực rỡ', image: '/images/story-10.jpg', subtitle: 'Nơi tôi bắt đầu' },
  { id: 's11', category: 'WORK', title: 'Dopamine Detox', image: '/images/story-11.jpg', subtitle: 'Tập trung' },
  { id: 's12', category: 'JOURNEY', title: 'Creative Developer', image: '/images/story-12.jpg', subtitle: 'Mai Trung Luân' },
];

// GET /api/settings
export const getAllSettings = async (_req: Request, res: Response): Promise<void> => {
  try {
    const settings = await (prisma as any).siteSetting.findMany();
    const settingsMap: Record<string, any> = {
      personal_info: PERSONAL_INFO,
      what_i_do: WHAT_I_DO_ITEMS,
      about: { text: ABOUT_TEXT, fragments: ABOUT_FRAGMENTS },
      hometown: HOMETOWN_STORY,
      marquee: { row1: STORY_MARQUEE_ROW_1, row2: STORY_MARQUEE_ROW_2 },
    };

    // Override with database values if present
    for (const item of settings) {
      try {
        settingsMap[item.key] = JSON.parse(item.value);
      } catch {
        settingsMap[item.key] = item.value;
      }
    }

    res.json({ success: true, data: settingsMap });
  } catch (error: any) {
    console.error('Error fetching settings:', error);
    res.json({
      success: true,
      data: {
        personal_info: PERSONAL_INFO,
        what_i_do: WHAT_I_DO_ITEMS,
        about: { text: ABOUT_TEXT, fragments: ABOUT_FRAGMENTS },
        hometown: HOMETOWN_STORY,
        marquee: { row1: STORY_MARQUEE_ROW_1, row2: STORY_MARQUEE_ROW_2 },
      },
    });
  }
};

// PUT /api/settings/:key (Admin)
export const updateSetting = async (req: Request, res: Response): Promise<void> => {
  try {
    const { key } = req.params;
    const { value } = req.body;

    if (value === undefined) {
      res.status(400).json({ success: false, message: 'Giá trị cập nhật không được để trống' });
      return;
    }

    const valueString = typeof value === 'string' ? value : JSON.stringify(value);

    const updated = await (prisma as any).siteSetting.upsert({
      where: { key },
      update: { value: valueString },
      create: { key, value: valueString },
    });

    res.json({
      success: true,
      message: `Đã cập nhật cấu hình ${key} thành công`,
      data: {
        key: updated.key,
        value: typeof value === 'string' ? value : JSON.parse(updated.value),
      },
    });
  } catch (error: any) {
    console.error('Error updating setting:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi cập nhật cài đặt', error: error.message });
  }
};
