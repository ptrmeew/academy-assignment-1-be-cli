ALTER TABLE public.profile_role_junction ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS profile_role_junction_select on public.profile_role_junction;
CREATE POLICY profile_role_junction_select
ON public.profile_role_junction
AS PERMISSIVE
FOR SELECT TO authenticated USING (
  true
);

DROP POLICY IF EXISTS profile_role_junction_insert on public.profile_role_junction;
CREATE POLICY profile_role_junction_insert
ON public.profile_role_junction
AS PERMISSIVE
FOR INSERT TO authenticated WITH CHECK (
  has_permission('MANAGE_ROLES')
);

DROP POLICY IF EXISTS profile_role_junction_update on public.profile_role_junction;
CREATE POLICY profile_role_junction_update
ON public.profile_role_junction
AS PERMISSIVE
FOR UPDATE TO authenticated USING (
  has_permission('MANAGE_ROLES')
) WITH CHECK (
  has_permission('MANAGE_ROLES')
);


DROP POLICY IF EXISTS profile_role_junction_delete on public.profile_role_junction;
CREATE POLICY profile_role_junction_delete
ON public.profile_role_junction
AS PERMISSIVE
FOR DELETE TO authenticated USING (
  has_permission('MANAGE_ROLES')
);
