alter table "auth"."users" enable row level security;

grant select (id, raw_user_meta_data) on table "auth"."users" to "authenticated";

create policy "Only members of tenants where the user is admin of"
on "auth"."users"
as permissive
for select
to authenticated
using (id IN (SELECT user_id FROM tenant_memberships WHERE tenant_id IN (SELECT tenant_id FROM tenant_membership_roles WHERE user_id = (SELECT auth.uid()) AND role = 'Admin')));
