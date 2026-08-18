import { Request, Response } from 'express';
import { prisma } from '../prisma';

const formatJourney = (j: any) => ({
  id: j.id,
  number: j.number,
  stage: j.stage,
  period: j.period,
  title: j.title,
  description: j.description,
  tags: typeof j.tags === 'string' ? JSON.parse(j.tags) : j.tags,
  sortOrder: j.sortOrder,
});

// GET /api/journey
export const getAllJourneySteps = async (_req: Request, res: Response): Promise<void> => {
  try {
    const steps = await prisma.journeyStep.findMany({
      orderBy: [{ sortOrder: 'asc' }, { number: 'asc' }],
    });
    res.json({ success: true, data: steps.map(formatJourney) });
  } catch (error: any) {
    console.error('Error fetching journey:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi lấy danh sách journey', error: error.message });
  }
};

// POST /api/journey (Admin)
export const createJourneyStep = async (req: Request, res: Response): Promise<void> => {
  try {
    const { number, stage, period, title, description, tags, sortOrder } = req.body;

    if (!stage || !period || !title || !description) {
      res.status(400).json({ success: false, message: 'Thiếu thông tin bắt buộc' });
      return;
    }

    const count = await prisma.journeyStep.count();
    const formattedNumber = number || `0${count + 1}`.slice(-2);

    const newStep = await prisma.journeyStep.create({
      data: {
        number: formattedNumber,
        stage,
        period,
        title,
        description,
        tags: JSON.stringify(Array.isArray(tags) ? tags : [tags].filter(Boolean)),
        sortOrder: typeof sortOrder === 'number' ? sortOrder : count,
      },
    });

    res.status(201).json({ success: true, message: 'Thêm cột mốc thành công', data: formatJourney(newStep) });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
};

// PUT /api/journey/:id (Admin)
export const updateJourneyStep = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { number, stage, period, title, description, tags, sortOrder } = req.body;

    const existing = await prisma.journeyStep.findUnique({ where: { id: id as string } });
    if (!existing) {
      res.status(404).json({ success: false, message: 'Không tìm thấy cột mốc' });
      return;
    }

    const updated = await prisma.journeyStep.update({
      where: { id: id as string },
      data: {
        number: number !== undefined ? number : existing.number,
        stage: stage !== undefined ? stage : existing.stage,
        period: period !== undefined ? period : existing.period,
        title: title !== undefined ? title : existing.title,
        description: description !== undefined ? description : existing.description,
        tags: tags !== undefined ? JSON.stringify(tags) : existing.tags,
        sortOrder: sortOrder !== undefined ? Number(sortOrder) : existing.sortOrder,
      },
    });

    res.json({ success: true, message: 'Cập nhật thành công', data: formatJourney(updated) });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
};

// DELETE /api/journey/:id (Admin)
export const deleteJourneyStep = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.journeyStep.delete({ where: { id: id as string } });
    res.json({ success: true, message: 'Đã xóa cột mốc' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
};
