// Vercel Serverless Function entrypoint
// This file is the single entry point for ALL /api/* routes on Vercel.
// Vercel detects this file at /api/index.ts and routes /api/* traffic here.
//
// The Express app (server/src/app.ts) handles all routing internally.
// No app.listen() is called — Vercel manages the HTTP lifecycle.

import app from '../server/src/app';

export default app;
