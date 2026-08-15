import { Request, Response } from 'express';

// POST /api/upload (Admin)
export const handleUpload = (req: Request, res: Response): void => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: 'Chưa chọn file hình ảnh' });
      return;
    }

    const fileUrl = `/uploads/${req.file.filename}`;

    res.json({
      success: true,
      message: 'Upload hình ảnh thành công',
      url: fileUrl,
      filename: req.file.filename,
      size: req.file.size,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi upload hình ảnh', error: error.message });
  }
};
