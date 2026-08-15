import { Request, Response } from 'express';
import { prisma } from '../prisma';

// Helper to send Telegram message notification
const sendTelegramNotification = async (name: string, contactInfo: string, message: string) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) return;

  try {
    const text = `📬 *TIN NHẮN MỚI TỪ WEBSITE TRUNGLUANMMO*:\n\n👤 *Họ tên:* ${name}\n📞 *Liên hệ:* ${contactInfo}\n💬 *Nội dung:*\n${message}\n\n⏰ *Thời gian:* ${new Date().toLocaleString('vi-VN')}`;

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
      }),
    });
  } catch (err) {
    console.error('Lỗi khi gửi thông báo Telegram:', err);
  }
};

// POST /api/contact (Public Submit)
export const submitContactMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ họ tên, thông tin liên hệ và tin nhắn' });
      return;
    }

    const newMessage = await prisma.contactMessage.create({
      data: {
        name,
        contactInfo: email,
        message,
      },
    });

    // Send Telegram alert in background (non-blocking)
    sendTelegramNotification(name, email, message).catch(() => {});

    res.status(201).json({
      success: true,
      message: 'Tin nhắn của bạn đã được gửi thành công!',
      data: newMessage,
    });
  } catch (error: any) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi gửi tin nhắn', error: error.message });
  }
};

// GET /api/contact/messages (Admin)
export const getAllMessages = async (_req: Request, res: Response): Promise<void> => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: messages });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Lỗi khi lấy tin nhắn', error: error.message });
  }
};

// PATCH /api/contact/messages/:id/read (Admin)
export const toggleMessageRead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const existing = await prisma.contactMessage.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, message: 'Không tìm thấy tin nhắn' });
      return;
    }

    const updated = await prisma.contactMessage.update({
      where: { id },
      data: { isRead: !existing.isRead },
    });

    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
};

// DELETE /api/contact/messages/:id (Admin)
export const deleteMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.contactMessage.delete({ where: { id } });
    res.json({ success: true, message: 'Đã xóa tin nhắn' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
};
