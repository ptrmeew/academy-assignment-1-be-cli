drop index if exists index_role_name;
create index index_role_name on public.role using btree (name);

drop index if exists index_permission_name;
create index index_permission_name on public.permission using btree (name);
