import { User } from '@supabase/supabase-js';
import { supabase, supabaseAdmin } from '../../supabase';

let user: User;
const profileIds: string[] = [];

describe('User tests', () => {
  beforeAll(async () => {
    console.log('Make sure to run the populate script profiles.ts before running test');

    const res = await supabase.auth.signInWithPassword({
      email: 'test1@mail.dk',
      password: '12345678',
    });

    user = res.data.user!;
  });

  afterAll(async () => {
    await supabase.auth.signOut();
    await supabaseAdmin.from('profile').delete().in('id', profileIds);
  });

  test('User table read access', async () => {
    const { data, error } = await supabase.from('profile').select('*');

    expect(data?.length).toBe(1);
    expect(error).toBe(null);
  });

  test('User table insert with id different that auth user', async () => {
    const otherProfile = await supabaseAdmin.from('profile').select('*').neq('id', user.id).limit(1).single();

    const insertInvalid = await supabase
      .from('profile')
      .insert({
        first_name: 'guy',
        last_name: 'guysen',
        age: 90,
        id: otherProfile.data!.id,
      })
      .select()
      .single();

    if (insertInvalid.data) {
      profileIds.push(insertInvalid.data!.id);
    }

    expect(insertInvalid.error !== null).toBe(true);
  });
});
