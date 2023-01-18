ALTER TABLE public.subscription_notification ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS subscription_notification_select on public.subscription_notification;
CREATE POLICY subscription_notification_select
ON public.subscription_notification
AS PERMISSIVE
FOR SELECT TO authenticated USING (
    exists (select * from public.profile where id = auth.uid() and ios_subscription_fk = subscription_notification.ios_subscription_fk)
);

-- There are no more policies here as the supabase functions should manage the rest with a service level supabase client