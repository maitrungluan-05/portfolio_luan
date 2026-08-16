import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all services
export const getServices = async (_req: Request, res: Response): Promise<void> => {
  try {
    const services = await (prisma as any).service.findMany({
      orderBy: { sortOrder: 'asc' },
    });

    const parsed = services.map((s: any) => ({
      ...s,
      features: typeof s.features === 'string' ? JSON.parse(s.features) : s.features,
    }));

    res.json({ success: true, data: parsed });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ success: false, message: 'Lỗi lấy danh sách dịch vụ' });
  }
};

// CREATE service
export const createService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, icon, accentColor, title, tagline, features, ctaUrl, ctaText, highlight, sortOrder } = req.body;

    if (!title) {
      res.status(400).json({ success: false, message: 'Tiêu đề dịch vụ là bắt buộc' });
      return;
    }

    const newService = await (prisma as any).service.create({
      data: {
        category: category || 'FACEBOOK SERVICES',
        icon: icon || 'Code',
        accentColor: accentColor || '#00D2FF',
        title,
        tagline: tagline || '',
        features: JSON.stringify(features || []),
        ctaUrl: ctaUrl || 'https://t.me/trungluanmmo',
        ctaText: ctaText || 'Tư vấn ngay',
        highlight: !!highlight,
        sortOrder: sortOrder || 0,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Tạo dịch vụ thành công',
      data: {
        ...newService,
        features: typeof newService.features === 'string' ? JSON.parse(newService.features) : newService.features,
      },
    });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ success: false, message: 'Lỗi tạo dịch vụ' });
  }
};

// UPDATE service
export const updateService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { category, icon, accentColor, title, tagline, features, ctaUrl, ctaText, highlight, sortOrder } = req.body;

    const data: any = {};
    if (category !== undefined) data.category = category;
    if (icon !== undefined) data.icon = icon;
    if (accentColor !== undefined) data.accentColor = accentColor;
    if (title !== undefined) data.title = title;
    if (tagline !== undefined) data.tagline = tagline;
    if (features !== undefined) data.features = JSON.stringify(features);
    if (ctaUrl !== undefined) data.ctaUrl = ctaUrl;
    if (ctaText !== undefined) data.ctaText = ctaText;
    if (highlight !== undefined) data.highlight = !!highlight;
    if (sortOrder !== undefined) data.sortOrder = sortOrder;

    const updated = await (prisma as any).service.update({
      where: { id },
      data,
    });

    res.json({
      success: true,
      message: 'Cập nhật dịch vụ thành công',
      data: {
        ...updated,
        features: typeof updated.features === 'string' ? JSON.parse(updated.features) : updated.features,
      },
    });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ success: false, message: 'Lỗi cập nhật dịch vụ' });
  }
};

// DELETE service
export const deleteService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await (prisma as any).service.delete({ where: { id } });
    res.json({ success: true, message: 'Đã xóa dịch vụ' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ success: false, message: 'Lỗi xóa dịch vụ' });
  }
};
