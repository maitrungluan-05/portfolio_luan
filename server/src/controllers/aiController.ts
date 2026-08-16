import { Request, Response } from 'express';

export const analyzeImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { image, imageUrl, fileName, hintType } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && (image || imageUrl)) {
      try {
        // Optional Gemini Vision API integration
        const prompt = `Bạn là trợ lý AI cho website portfolio của lập trình viên và dịch vụ MMO Mai Trung Luân (Cát Tiến, Bình Định).
Hãy xem bức ảnh này và trả về JSON thuần túy (không markdown) với cấu trúc sau:
{
  "title": "Tiêu đề tiếng Việt ngắn gọn, chuyên nghiệp và truyền cảm hứng (tối đa 8 từ)",
  "category": "WORK" hoặc "HOMETOWN" hoặc "LIFESTYLE" hoặc "JOURNEY",
  "location": "Địa điểm phỏng đoán (ví dụ: Cát Tiến, Bình Định hoặc Bàn làm việc Dev)",
  "caption": "1-2 câu tiếng Việt mộc mạc, sâu sắc mô tả khoảnh khắc này",
  "tags": ["tag1", "tag2", "tag3"],
  "technologies": ["React", "TypeScript", "Node.js", "C#", "Automation"],
  "description": "Mô tả chuyên sâu về dự án hoặc khoảnh khắc"
}`;

        let imagePart: any;
        if (image && image.startsWith('data:image')) {
          const mimeType = image.split(';')[0].split(':')[1];
          const base64Data = image.split(',')[1];
          imagePart = {
            inlineData: {
              data: base64Data,
              mimeType,
            },
          };
        }

        if (imagePart) {
          const geminiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [
                  {
                    parts: [{ text: prompt }, imagePart],
                  },
                ],
              }),
            }
          );

          if (geminiRes.ok) {
            const data = await geminiRes.json();
            const textResponse =
              data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
            const cleaned = textResponse
              .replace(/```json/g, '')
              .replace(/```/g, '')
              .trim();
            const parsed = JSON.parse(cleaned);

            res.json({
              success: true,
              data: parsed,
            });
            return;
          }
        }
      } catch (geminiErr) {
        console.warn('Gemini Vision API fallback:', geminiErr);
      }
    }

    // Fallback response handled by client or default response
    res.json({
      success: true,
      data: {
        title: hintType === 'project' ? 'Dự Án Số & Tự Động Hóa' : 'Khoảnh Khắc Hành Trình',
        category: hintType === 'project' ? 'WEB / DIGITAL' : 'HOMETOWN',
        location: 'Cát Tiến, Bình Định',
        caption: 'Ghi lại dấu ấn chân thực trong hành trình phát triển công nghệ và cuộc sống.',
        tags: ['Trung Luân MMO', 'Creative Dev', 'Digital Identity'],
      },
    });
  } catch (error) {
    console.error('Lỗi phân tích AI:', error);
    res.status(500).json({ success: false, message: 'Lỗi phân tích ảnh AI' });
  }
};
