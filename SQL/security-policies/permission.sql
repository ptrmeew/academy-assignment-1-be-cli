ALTER TABLE public.permission ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS permission_select on public.permission;
CREATE POLICY permission_select
ON public.permission
AS PERMISSIVE
FOR SELECT TO authenticated USING (
  true
);

DROP POLICY IF EXISTS permission_insert on public.permission;
CREATE POLICY permission_insert
ON public.permission
AS PERMISSIVE
FOR INSERT TO authenticated WITH CHECK (
  has_permission('MANAGE_PERMISSIONS')
);

DROP POLICY IF EXISTS permission_update on public.permission;
CREATE POLICY permission_update
ON public.permission
AS PERMISSIVE
FOR UPDATE TO authenticated USING (
  has_permission('MANAGE_PERMISSIONS')
) WITH CHECK (
  has_permission('MANAGE_PERMISSIONS')
);


DROP POLICY IF EXISTS permission_delete on public.permission;
CREATE POLICY permission_delete
ON public.permission
AS PERMISSIVE
FOR DELETE TO authenticated USING (
  has_permission('MANAGE_PERMISSIONS')
);
