-- This functions checks whether a user has a permission. This must be called from a context of where the 
-- user is signed in as it uses auth.uid() to determine what user it is.

create or replace function has_permission(p_permission_name varchar)
returns bool
language plpgsql
as
$$
begin
  return exists (select permission.id from profile 
    join profile_role_junction as urj on urj.profile_fk = profile.id
    join role on role.id = urj.role_fk
    join role_permission_junction as rpj on rpj.role_fk = role.id
    join permission on permission.id = rpj.permission_fk
    where permission.name = p_permission_name and profile.id = auth.uid()
    );
end;
$$


