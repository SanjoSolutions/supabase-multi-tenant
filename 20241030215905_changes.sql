drop policy "Only notes of tenants that the user is member of" on "public"."notes";

revoke delete on table "public"."notes" from "anon";

revoke insert on table "public"."notes" from "anon";

revoke references on table "public"."notes" from "anon";

revoke select on table "public"."notes" from "anon";

revoke trigger on table "public"."notes" from "anon";

revoke truncate on table "public"."notes" from "anon";

revoke update on table "public"."notes" from "anon";

revoke delete on table "public"."notes" from "authenticated";

revoke insert on table "public"."notes" from "authenticated";

revoke references on table "public"."notes" from "authenticated";

revoke select on table "public"."notes" from "authenticated";

revoke trigger on table "public"."notes" from "authenticated";

revoke truncate on table "public"."notes" from "authenticated";

revoke update on table "public"."notes" from "authenticated";

revoke delete on table "public"."notes" from "service_role";

revoke insert on table "public"."notes" from "service_role";

revoke references on table "public"."notes" from "service_role";

revoke select on table "public"."notes" from "service_role";

revoke trigger on table "public"."notes" from "service_role";

revoke truncate on table "public"."notes" from "service_role";

revoke update on table "public"."notes" from "service_role";

alter table "public"."notes" drop constraint "notes_tenant_id_fkey";

alter table "public"."notes" drop constraint "notes_pkey";

drop index if exists "public"."notes_pkey";

drop table "public"."notes";

create table "public"."invitations" (
    "token" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "tenant_id" bigint not null,
    "email" text not null
);


alter table "public"."invitations" enable row level security;

create table "public"."tenant_membership_roles" (
    "user_id" uuid not null default gen_random_uuid(),
    "tenant_id" bigint not null,
    "created_at" timestamp with time zone not null default now(),
    "role" text not null
);


alter table "public"."tenant_membership_roles" enable row level security;

create table "public"."todos" (
    "id" bigint not null default nextval('notes_id_seq'::regclass),
    "content" text,
    "tenant_id" bigint
);


alter table "public"."todos" enable row level security;

alter sequence "public"."notes_id_seq" owned by "public"."todos"."id";

CREATE UNIQUE INDEX invitations_pkey ON public.invitations USING btree (token);

CREATE UNIQUE INDEX tenant_membership_roles_pkey ON public.tenant_membership_roles USING btree (user_id, tenant_id);

CREATE UNIQUE INDEX notes_pkey ON public.todos USING btree (id);

alter table "public"."invitations" add constraint "invitations_pkey" PRIMARY KEY using index "invitations_pkey";

alter table "public"."tenant_membership_roles" add constraint "tenant_membership_roles_pkey" PRIMARY KEY using index "tenant_membership_roles_pkey";

alter table "public"."todos" add constraint "notes_pkey" PRIMARY KEY using index "notes_pkey";

alter table "public"."invitations" add constraint "invitations_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."invitations" validate constraint "invitations_tenant_id_fkey";

alter table "public"."tenant_membership_roles" add constraint "tenant_membership_roles_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."tenant_membership_roles" validate constraint "tenant_membership_roles_tenant_id_fkey";

alter table "public"."tenant_membership_roles" add constraint "tenant_membership_roles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."tenant_membership_roles" validate constraint "tenant_membership_roles_user_id_fkey";

alter table "public"."todos" add constraint "notes_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."todos" validate constraint "notes_tenant_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_tenant()
 RETURNS bigint
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$-- 4
DECLARE
  tenant RECORD;
BEGIN
  INSERT INTO public.tenants DEFAULT VALUES RETURNING * INTO tenant;

  INSERT INTO public.tenant_memberships (tenant_id, user_id) VALUES (tenant.id, auth.uid());

  INSERT INTO public.tenant_membership_roles (tenant_id, user_id, role) VALUES (tenant.id, auth.uid(), 'Admin');

  return tenant;
END;$function$
;

grant delete on table "public"."invitations" to "anon";

grant insert on table "public"."invitations" to "anon";

grant references on table "public"."invitations" to "anon";

grant select on table "public"."invitations" to "anon";

grant trigger on table "public"."invitations" to "anon";

grant truncate on table "public"."invitations" to "anon";

grant update on table "public"."invitations" to "anon";

grant delete on table "public"."invitations" to "authenticated";

grant insert on table "public"."invitations" to "authenticated";

grant references on table "public"."invitations" to "authenticated";

grant select on table "public"."invitations" to "authenticated";

grant trigger on table "public"."invitations" to "authenticated";

grant truncate on table "public"."invitations" to "authenticated";

grant update on table "public"."invitations" to "authenticated";

grant delete on table "public"."invitations" to "service_role";

grant insert on table "public"."invitations" to "service_role";

grant references on table "public"."invitations" to "service_role";

grant select on table "public"."invitations" to "service_role";

grant trigger on table "public"."invitations" to "service_role";

grant truncate on table "public"."invitations" to "service_role";

grant update on table "public"."invitations" to "service_role";

grant delete on table "public"."tenant_membership_roles" to "anon";

grant insert on table "public"."tenant_membership_roles" to "anon";

grant references on table "public"."tenant_membership_roles" to "anon";

grant select on table "public"."tenant_membership_roles" to "anon";

grant trigger on table "public"."tenant_membership_roles" to "anon";

grant truncate on table "public"."tenant_membership_roles" to "anon";

grant update on table "public"."tenant_membership_roles" to "anon";

grant delete on table "public"."tenant_membership_roles" to "authenticated";

grant insert on table "public"."tenant_membership_roles" to "authenticated";

grant references on table "public"."tenant_membership_roles" to "authenticated";

grant select on table "public"."tenant_membership_roles" to "authenticated";

grant trigger on table "public"."tenant_membership_roles" to "authenticated";

grant truncate on table "public"."tenant_membership_roles" to "authenticated";

grant update on table "public"."tenant_membership_roles" to "authenticated";

grant delete on table "public"."tenant_membership_roles" to "service_role";

grant insert on table "public"."tenant_membership_roles" to "service_role";

grant references on table "public"."tenant_membership_roles" to "service_role";

grant select on table "public"."tenant_membership_roles" to "service_role";

grant trigger on table "public"."tenant_membership_roles" to "service_role";

grant truncate on table "public"."tenant_membership_roles" to "service_role";

grant update on table "public"."tenant_membership_roles" to "service_role";

grant delete on table "public"."todos" to "anon";

grant insert on table "public"."todos" to "anon";

grant references on table "public"."todos" to "anon";

grant select on table "public"."todos" to "anon";

grant trigger on table "public"."todos" to "anon";

grant truncate on table "public"."todos" to "anon";

grant update on table "public"."todos" to "anon";

grant delete on table "public"."todos" to "authenticated";

grant insert on table "public"."todos" to "authenticated";

grant references on table "public"."todos" to "authenticated";

grant select on table "public"."todos" to "authenticated";

grant trigger on table "public"."todos" to "authenticated";

grant truncate on table "public"."todos" to "authenticated";

grant update on table "public"."todos" to "authenticated";

grant delete on table "public"."todos" to "service_role";

grant insert on table "public"."todos" to "service_role";

grant references on table "public"."todos" to "service_role";

grant select on table "public"."todos" to "service_role";

grant trigger on table "public"."todos" to "service_role";

grant truncate on table "public"."todos" to "service_role";

grant update on table "public"."todos" to "service_role";

create policy "Only tenant members can insert to the tenant"
on "public"."invitations"
as permissive
for insert
to authenticated
with check ((tenant_id IN ( SELECT tenant_memberships.tenant_id
   FROM tenant_memberships
  WHERE (tenant_memberships.user_id = ( SELECT auth.uid() AS uid)))));


create policy "User can only access rows for them"
on "public"."tenant_membership_roles"
as permissive
for select
to authenticated
using ((user_id = ( SELECT auth.uid() AS uid)));


create policy "Allow to create new tenants"
on "public"."tenants"
as permissive
for insert
to authenticated;


create policy "Allow user to add todo to tenants they are member of"
on "public"."todos"
as permissive
for insert
to authenticated
with check ((tenant_id IN ( SELECT tenant_memberships.tenant_id
   FROM tenant_memberships
  WHERE (tenant_memberships.user_id = ( SELECT auth.uid() AS uid)))));


create policy "Only notes of tenants that the user is member of"
on "public"."todos"
as permissive
for select
to authenticated
using ((tenant_id IN ( SELECT tenant_memberships.tenant_id
   FROM tenant_memberships
  WHERE (tenant_memberships.user_id = auth.uid()))));
