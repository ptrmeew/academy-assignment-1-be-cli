import { supabase } from '../../supabase';

describe('has_permission function test', () => {
  afterAll(async () => {
    await supabase.auth.signOut();
  });

  test('has permission accurately reports that a user have a permission', async () => {
    console.log('Make sure to run the populate script users.ts before running test');

    // This user has the admin role
    await supabase.auth.signInWithPassword({
      email: 'test1@mail.dk',
      password: '12345678',
    });

    expect((await supabase.rpc('has_permission', { p_permission_name: 'MANAGE_ROLES' })).data).toBe(true);
    expect((await supabase.rpc('has_permission', { p_permission_name: 'NONEXISTING_PERMISSION' })).data).toBe(false);

    // This user does not have the admin role
    const res = await supabase.auth.signInWithPassword({
      email: 'test2@mail.dk',
      password: '12345678',
    });

    expect((await supabase.rpc('has_permission', { p_permission_name: 'MANAGE_ROLES' })).data).toBe(false);
    expect((await supabase.rpc('has_permission', { p_permission_name: 'NONEXISTING_PERMISSION' })).data).toBe(false);
  });
});
