--*** Set up access control for the avatars bucket ***--

DROP POLICY IF EXISTS avatars_bucket_select on storage.objects;
create policy avatars_bucket_select
on storage.objects for select to authenticated
using (
  bucket_id = 'avatars'
);

DROP POLICY IF EXISTS avatars_bucket_insert on storage.objects;
create policy avatars_bucket_insert
on storage.objects for insert to authenticated
with check (bucket_id = 'avatars');

DROP POLICY IF EXISTS avatars_bucket_update on storage.objects;
create policy avatars_bucket_update
on storage.objects for update to authenticated using (
  bucket_id = 'avatars'
  and auth.uid() = owner
);