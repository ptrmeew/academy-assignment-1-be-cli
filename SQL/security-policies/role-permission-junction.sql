ALTER TABLE public.role_permission_junction ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS role_permission_junction_select on public.role_permission_junction;
CREATE POLICY role_permission_junction_select
ON public.role_permission_junction
AS PERMISSIVE
FOR SELECT TO authenticated USING (
  true
);

DROP POLICY IF EXISTS role_permission_junction_insert on public.role_permission_junction;
CREATE POLICY role_permission_junction_insert
ON public.role_permission_junction
AS PERMISSIVE
FOR INSERT TO authenticated WITH CHECK (
  has_permission('MANAGE_ROLES')
);

DROP POLICY IF EXISTS role_permission_junction_update on public.role_permission_junction;
CREATE POLICY role_permission_junction_update
ON public.role_permission_junction
AS PERMISSIVE
FOR UPDATE TO authenticated USING (
  has_permission('MANAGE_ROLES')
) WITH CHECK (
  has_permission('MANAGE_ROLES')
);


DROP POLICY IF EXISTS role_permission_junction_delete on public.role_permission_junction;
CREATE POLICY role_permission_junction_delete
ON public.role_permission_junction
AS PERMISSIVE
FOR DELETE TO authenticated USING (
  has_permission('MANAGE_ROLES')
);
