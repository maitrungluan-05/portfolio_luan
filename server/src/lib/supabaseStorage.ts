import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Use service role key for server-side operations (bypasses RLS)
export const supabase = createClient(supabaseUrl, supabaseServiceKey);

const BUCKET = 'uploads';

/**
 * Upload a file buffer to Supabase Storage
 * @returns Public URL of the uploaded file
 */
export async function uploadToSupabase(
  buffer: Buffer,
  filename: string,
  mimeType: string
): Promise<string> {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      'SUPABASE_URL và SUPABASE_SERVICE_ROLE_KEY chưa được cấu hình trong .env'
    );
  }

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(filename, buffer, {
      contentType: mimeType,
      upsert: true,
    });

  if (error) {
    throw new Error(`Supabase Storage upload lỗi: ${error.message}`);
  }

  const { data: urlData } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}

/**
 * Delete a file from Supabase Storage by its public URL
 */
export async function deleteFromSupabase(publicUrl: string): Promise<void> {
  try {
    // Extract the path from the public URL
    // URL format: https://xxx.supabase.co/storage/v1/object/public/uploads/filename
    const url = new URL(publicUrl);
    const pathParts = url.pathname.split(`/object/public/${BUCKET}/`);
    if (pathParts.length < 2) return;

    const filePath = pathParts[1];
    await supabase.storage.from(BUCKET).remove([filePath]);
  } catch {
    // Non-critical: log but don't throw
    console.warn('Không thể xóa file khỏi Supabase Storage:', publicUrl);
  }
}
