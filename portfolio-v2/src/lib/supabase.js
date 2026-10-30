import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  !supabaseUrl.includes('your-project-id')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

/**
 * Uploads an image or document to the 'portfolio-media' Supabase Storage bucket.
 * @param {File} file 
 * @param {string} [folder='uploads'] 
 * @returns {Promise<{ url: string | null, path: string | null, error: any }>}
 */
export async function uploadMedia(file, folder = 'uploads') {
  if (!isSupabaseConfigured || !supabase) {
    return {
      url: null,
      path: null,
      error: new Error('Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'),
    };
  }

  try {
    const fileExt = file.name.split('.').pop();
    const cleanFileName = file.name
      .replace(`.${fileExt}`, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .toLowerCase();
    const filePath = `${folder}/${Date.now()}_${cleanFileName}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('portfolio-media')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('portfolio-media')
      .getPublicUrl(filePath);

    return { url: data.publicUrl, path: filePath, error: null };
  } catch (error) {
    console.error('Error uploading media:', error);
    return { url: null, path: null, error };
  }
}

/**
 * Deletes a file from the 'portfolio-media' storage bucket.
 * @param {string} filePath 
 */
export async function deleteMedia(filePath) {
  if (!isSupabaseConfigured || !supabase) {
    return { error: new Error('Supabase is not configured') };
  }

  const { error } = await supabase.storage
    .from('portfolio-media')
    .remove([filePath]);

  return { error };
}
