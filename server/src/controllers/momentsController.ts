import { Request, Response } from 'express';
import { prisma } from '../prisma';

// GET /api/moments
export const getAllMoments = async (_req: Request, res: Response): Promise<void> => {
  try {
    const moments = await prisma.moment.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
    res.json({ success: true, data: moments });
  } catch (error: any) {
    console.error('Error fetching moments:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi lấy danh sách moments', error: error.message });
  }
};

// POST /api/moments (Admin)
export const createMoment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, category, location, aspectRatio, image, caption, sortOrder } = req.body;

    if (!title || !category || !image || !caption) {
      res.status(400).json({ success: false, message: 'Tiêu đề, phân loại, ảnh và mô tả là bắt buộc' });
      return;
    }

    const count = await prisma.moment.count();

    const newMoment = await prisma.moment.create({
      data: {
        title,
        category: category.toUpperCase(),
        location: location || '',
        aspectRatio: aspectRatio || 'landscape',
        image,
        caption,
        sortOrder: typeof sortOrder === 'number' ? sortOrder : count,
      },
    });

    res.status(201).json({ success: true, message: 'Thêm khoảnh khắc thành công', data: newMoment });
  } catch (error: any) {
    console.error('Error creating moment:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi tạo moment', error: error.message });
  }
};

// PUT /api/moments/:id (Admin)
export const updateMoment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, category, location, aspectRatio, image, caption, sortOrder } = req.body;

    const existing = await prisma.moment.findUnique({ where: { id: id as string } });
    if (!existing) {
      res.status(404).json({ success: false, message: 'Không tìm thấy moment để cập nhật' });
      return;
    }

    const updated = await prisma.moment.update({
      where: { id: id as string },
      data: {
        title: title !== undefined ? title : existing.title,
        category: category !== undefined ? category.toUpperCase() : existing.category,
        location: location !== undefined ? location : existing.location,
        aspectRatio: aspectRatio !== undefined ? aspectRatio : existing.aspectRatio,
        image: image !== undefined ? image : existing.image,
        caption: caption !== undefined ? caption : existing.caption,
        sortOrder: sortOrder !== undefined ? Number(sortOrder) : existing.sortOrder,
      },
    });

    res.json({ success: true, message: 'Cập nhật moment thành công', data: updated });
  } catch (error: any) {
    console.error('Error updating moment:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi cập nhật moment', error: error.message });
  }
};

// DELETE /api/moments/:id (Admin)
export const deleteMoment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const existing = await prisma.moment.findUnique({ where: { id: id as string } });
    if (!existing) {
      res.status(404).json({ success: false, message: 'Không tìm thấy moment để xóa' });
      return;
    }

    await prisma.moment.delete({ where: { id: id as string } });
    res.json({ success: true, message: 'Đã xóa moment thành công' });
  } catch (error: any) {
    console.error('Error deleting moment:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi xóa moment', error: error.message });
  }
};
