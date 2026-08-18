import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables (no-op in production where env vars are injected)
dotenv.config();

import authRoutes from './routes/authRoutes';
import projectsRoutes from './routes/projectsRoutes';
import momentsRoutes from './routes/momentsRoutes';
import journeyRoutes from './routes/journeyRoutes';
import contactRoutes from './routes/contactRoutes';
import uploadRoutes from './routes/uploadRoutes';
import settingsRoutes from './routes/settingsRoutes';
import servicesRoutes from './routes/servicesRoutes';
import aiRoutes from './routes/aiRoutes';

const app = express();

// CORS: allow same-origin (production Vercel) and localhost dev
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (server-to-server, curl, Vercel Function internal)
      if (!origin) return callback(null, true);
      // In production (same-domain Vercel), origin matches the deployment URL
      // Also allow all vercel.app subdomains for preview deployments
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app') ||
        process.env.NODE_ENV !== 'production'
      ) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/moments', momentsRoutes);
app.use('/api/journey', journeyRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/settings', settingsRoutes);

// API Index & Health check
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

app.get('/api', apiIndexResponse);
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'trungluanmmo-backend-api',
  });
});

// 404 handler for unknown API routes
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'API Endpoint không tồn tại' });
});

export default app;
