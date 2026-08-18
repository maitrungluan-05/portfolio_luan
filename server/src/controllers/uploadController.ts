import { Request, Response } from 'express';
import path from 'path';
import { uploadToSupabase } from '../lib/supabaseStorage';

// POST /api/upload (Admin)
export const handleUpload = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: 'Chưa chọn file hình ảnh' });
      return;
    }

    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(req.file.originalname).toLowerCase() || '.jpg';
    const filename = `${req.file.fieldname}-${uniqueSuffix}${ext}`;

    // Upload buffer to Supabase Storage
    const publicUrl = await uploadToSupabase(
      req.file.buffer,
      filename,
      req.file.mimetype
    );

    res.json({
      success: true,
      message: 'Upload hình ảnh thành công',
      url: publicUrl,
      filename,
      size: req.file.size,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi upload hình ảnh',
      error: error.message,
    });
  }
};
