import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import type { Database } from './types/database.types';

dotenv.config({
  path: __dirname + '/../../.env',
});

// It is important that persistSession is set to false, otherwise you will not be able to sign in
export const supabaseAdmin = createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!, { auth: { persistSession: false } });
export const supabase = createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
