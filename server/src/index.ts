import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load environment variables
dotenv.config();

import authRoutes from './routes/authRoutes';
import projectsRoutes from './routes/projectsRoutes';
import momentsRoutes from './routes/momentsRoutes';
import journeyRoutes from './routes/journeyRoutes';
import contactRoutes from './routes/contactRoutes';
import uploadRoutes from './routes/uploadRoutes';
import settingsRoutes from './routes/settingsRoutes';
import servicesRoutes from './routes/servicesRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend Vite dev server (and any origin in dev)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded files
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/moments', momentsRoutes);
app.use('/api/journey', journeyRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/settings', settingsRoutes);

// API Index & Health check routes
const apiIndexResponse = (_req: express.Request, res: express.Response) => {
  res.json({
    status: 'ok',
    service: 'trungluanmmo-backend-api',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: 'GET /api/health',
      projects: 'GET /api/projects (CRUD)',
      moments: 'GET /api/moments (CRUD)',
      journey: 'GET /api/journey (CRUD)',
      settings: 'GET /api/settings, PUT /api/settings/:key',
      contact: 'POST /api/contact, GET /api/contact/messages',
      auth: 'POST /api/auth/login, GET /api/auth/me',
      upload: 'POST /api/upload',
    },
    documentation: 'Xem chi tiết trong file BACKEND_GUIDE.md',
  });
};

app.get('/', apiIndexResponse);
app.get('/api', apiIndexResponse);
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'trungluanmmo-backend-api',
  });
});

// 404 handler for unknown routes
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'API Endpoint không tồn tại' });
});

app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`🚀 Backend Server running at: http://localhost:${PORT}`);
  console.log(`📁 Uploads serving from: ${uploadsDir}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`=========================================`);
});
