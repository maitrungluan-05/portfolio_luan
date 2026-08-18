// Local development entry point — NOT used by Vercel
// Vercel uses /api/index.ts (serverless function) instead
import app from './app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`🚀 Backend running at: http://localhost:${PORT}`);
  console.log(`📦 Storage: Supabase Storage (uploads bucket)`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`=========================================`);
});
