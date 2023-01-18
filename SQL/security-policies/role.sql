ALTER TABLE public.role ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS role_select on public.role;
CREATE POLICY role_select
ON public.role
AS PERMISSIVE
FOR SELECT TO authenticated USING (
  true
);

DROP POLICY IF EXISTS role_insert on public.role;
CREATE POLICY role_insert
ON public.role
AS PERMISSIVE
FOR INSERT TO authenticated WITH CHECK (
  has_permission('MANAGE_ROLES')
);

DROP POLICY IF EXISTS role_update on public.role;
CREATE POLICY role_update
ON public.role
AS PERMISSIVE
FOR UPDATE TO authenticated USING (
  has_permission('MANAGE_ROLES')
) WITH CHECK (
  has_permission('MANAGE_ROLES')
);


DROP POLICY IF EXISTS role_delete on public.role;
CREATE POLICY role_delete
ON public.role
AS PERMISSIVE
FOR DELETE TO authenticated USING (
  has_permission('MANAGE_ROLES')
);
