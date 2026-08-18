import { Request, Response } from 'express';
import { prisma } from '../prisma';

// Helper to format DB Project for Frontend
const formatProject = (p: any) => ({
  id: p.id,
  number: p.number,
  name: p.name,
  type: p.type,
  description: p.description,
  longDescription: p.longDescription || undefined,
  technologies: typeof p.technologies === 'string' ? JSON.parse(p.technologies) : p.technologies,
  images: typeof p.images === 'string' ? JSON.parse(p.images) : p.images,
  metrics: p.metrics ? (typeof p.metrics === 'string' ? JSON.parse(p.metrics) : p.metrics) : undefined,
  liveUrl: p.liveUrl || undefined,
  featured: p.featured,
  sortOrder: p.sortOrder,
  createdAt: p.createdAt,
  updatedAt: p.updatedAt,
});

// GET /api/projects
export const getAllProjects = async (_req: Request, res: Response): Promise<void> => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
    res.json({ success: true, data: projects.map(formatProject) });
  } catch (error: any) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi lấy danh sách dự án', error: error.message });
  }
};

// GET /api/projects/:id
export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const project = await prisma.project.findUnique({ where: { id: id as string } });
    if (!project) {
      res.status(404).json({ success: false, message: 'Không tìm thấy dự án' });
      return;
    }
    res.json({ success: true, data: formatProject(project) });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
};

// POST /api/projects (Admin)
export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      number,
      name,
      type,
      description,
      longDescription,
      technologies,
      images,
      metrics,
      liveUrl,
      featured,
      sortOrder,
    } = req.body;

    if (!name || !type || !description) {
      res.status(400).json({ success: false, message: 'Tên, loại dự án và mô tả là bắt buộc' });
      return;
    }

    const count = await prisma.project.count();
    const formattedNumber = number || `0${count + 1}`.slice(-2);

    const newProject = await prisma.project.create({
      data: {
        number: formattedNumber,
        name,
        type,
        description,
        longDescription: longDescription || null,
        technologies: JSON.stringify(Array.isArray(technologies) ? technologies : [technologies].filter(Boolean)),
        images: JSON.stringify(Array.isArray(images) ? images : (images ? [images] : ['/images/project-dld-01.jpg'])),
        metrics: metrics ? JSON.stringify(metrics) : null,
        liveUrl: liveUrl || '#',
        featured: Boolean(featured),
        sortOrder: typeof sortOrder === 'number' ? sortOrder : count,
      },
    });

    res.status(201).json({ success: true, message: 'Tạo dự án thành công', data: formatProject(newProject) });
  } catch (error: any) {
    console.error('Error creating project:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi tạo dự án', error: error.message });
  }
};

// PUT /api/projects/:id (Admin)
export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      number,
      name,
      type,
      description,
      longDescription,
      technologies,
      images,
      metrics,
      liveUrl,
      featured,
      sortOrder,
    } = req.body;

    const existing = await prisma.project.findUnique({ where: { id: id as string } });
    if (!existing) {
      res.status(404).json({ success: false, message: 'Không tìm thấy dự án để cập nhật' });
      return;
    }

    const updated = await prisma.project.update({
      where: { id: id as string },
      data: {
        number: number !== undefined ? number : existing.number,
        name: name !== undefined ? name : existing.name,
        type: type !== undefined ? type : existing.type,
        description: description !== undefined ? description : existing.description,
        longDescription: longDescription !== undefined ? longDescription : existing.longDescription,
        technologies: technologies !== undefined ? JSON.stringify(technologies) : existing.technologies,
        images: images !== undefined ? JSON.stringify(images) : existing.images,
        metrics: metrics !== undefined ? (metrics ? JSON.stringify(metrics) : null) : existing.metrics,
        liveUrl: liveUrl !== undefined ? liveUrl : existing.liveUrl,
        featured: featured !== undefined ? Boolean(featured) : existing.featured,
        sortOrder: sortOrder !== undefined ? Number(sortOrder) : existing.sortOrder,
      },
    });

    res.json({ success: true, message: 'Cập nhật dự án thành công', data: formatProject(updated) });
  } catch (error: any) {
    console.error('Error updating project:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi cập nhật dự án', error: error.message });
  }
};

// DELETE /api/projects/:id (Admin)
export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const existing = await prisma.project.findUnique({ where: { id: id as string } });
    if (!existing) {
      res.status(404).json({ success: false, message: 'Không tìm thấy dự án để xóa' });
      return;
    }

    await prisma.project.delete({ where: { id: id as string } });
    res.json({ success: true, message: 'Đã xóa dự án thành công' });
  } catch (error: any) {
    console.error('Error deleting project:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi xóa dự án', error: error.message });
  }
};
