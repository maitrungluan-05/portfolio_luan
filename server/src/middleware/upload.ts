import multer from 'multer';

const fileFilter = (
  _req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ chấp nhận file hình ảnh (JPG, PNG, WebP, GIF, SVG)'));
  }
};

// Use memoryStorage: files are held in RAM as Buffer,
// then uploaded directly to Supabase Storage (no disk writes needed)
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter,
});
