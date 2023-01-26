-- Use Postgres to create avatars bucket

-- drop bucket if exists not possible?
insert into storage.buckets (id, name)
values ('avatars', 'avatars');