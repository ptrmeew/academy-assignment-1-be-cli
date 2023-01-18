ALTER TABLE public.ios_subscription ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS ios_subscription_select on public.ios_subscription;
CREATE POLICY ios_subscription_select
ON public.ios_subscription
AS PERMISSIVE
FOR SELECT TO authenticated USING (
  exists (select * from public.profile where id = auth.uid() and ios_subscription_fk = ios_subscription.id )
);

-- There are no more policies here as the supabase functions should manage the rest with a service level supabase client