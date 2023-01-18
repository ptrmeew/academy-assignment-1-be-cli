ALTER TABLE public.product_description ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS product_description_select on public.product_description;
CREATE POLICY product_description_select
ON public.product_description
AS PERMISSIVE
FOR SELECT TO authenticated USING (
  true
);

-- There are no more policies here as the supabase functions should manage the rest with a service level supabase client