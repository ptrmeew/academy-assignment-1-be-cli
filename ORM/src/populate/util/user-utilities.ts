import { supabase } from '../../supabase';

export const createOrUseSupabaseUser = async (email: string, password: string) => {
  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (user) {
    return user;
  }

  const {
    data: { user: newUser },
  } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (!newUser) {
    throw new Error('Failed to create user');
  }
  return newUser;
};
