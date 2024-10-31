ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public REVOKE ALL ON FUNCTIONS FROM PUBLIC, anon, authenticated; -- Does not seem to revoke it from PUBLIC

create sequence "public"."todos_id_seq";

create table "public"."invitations" (
    "token" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "tenant_id" bigint not null,
    "email" text not null
);


alter table "public"."invitations" enable row level security;

create table "public"."tenant_membership_roles" (
    "user_id" uuid not null,
    "tenant_id" bigint not null,
    "created_at" timestamp with time zone not null default now(),
    "role" text not null
);


alter table "public"."tenant_membership_roles" enable row level security;

create table "public"."tenant_memberships" (
    "user_id" uuid not null,
    "tenant_id" bigint not null,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."tenant_memberships" enable row level security;

create table "public"."tenants" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "name" text
);


alter table "public"."tenants" enable row level security;

create table "public"."todos" (
    "id" bigint not null default nextval('todos_id_seq'::regclass),
    "content" text,
    "tenant_id" bigint
);


alter table "public"."todos" enable row level security;

alter sequence "public"."todos_id_seq" owned by "public"."todos"."id";

CREATE UNIQUE INDEX invitations_pkey ON public.invitations USING btree (token);

CREATE UNIQUE INDEX notes_pkey ON public.todos USING btree (id);

CREATE UNIQUE INDEX tenant_membership_roles_pkey ON public.tenant_membership_roles USING btree (user_id, tenant_id);

CREATE UNIQUE INDEX tenant_memberships_pkey ON public.tenant_memberships USING btree (user_id, tenant_id);

CREATE UNIQUE INDEX tenants_pkey ON public.tenants USING btree (id);

alter table "public"."invitations" add constraint "invitations_pkey" PRIMARY KEY using index "invitations_pkey";

alter table "public"."tenant_membership_roles" add constraint "tenant_membership_roles_pkey" PRIMARY KEY using index "tenant_membership_roles_pkey";

alter table "public"."tenant_memberships" add constraint "tenant_memberships_pkey" PRIMARY KEY using index "tenant_memberships_pkey";

alter table "public"."tenants" add constraint "tenants_pkey" PRIMARY KEY using index "tenants_pkey";

alter table "public"."todos" add constraint "notes_pkey" PRIMARY KEY using index "notes_pkey";

alter table "public"."invitations" add constraint "invitations_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."invitations" validate constraint "invitations_tenant_id_fkey";

alter table "public"."tenant_membership_roles" add constraint "tenant_membership_roles_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."tenant_membership_roles" validate constraint "tenant_membership_roles_tenant_id_fkey";

alter table "public"."tenant_membership_roles" add constraint "tenant_membership_roles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."tenant_membership_roles" validate constraint "tenant_membership_roles_user_id_fkey";

alter table "public"."tenant_memberships" add constraint "tenant_memberships_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."tenant_memberships" validate constraint "tenant_memberships_tenant_id_fkey";

alter table "public"."tenant_memberships" add constraint "tenant_memberships_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."tenant_memberships" validate constraint "tenant_memberships_user_id_fkey";

alter table "public"."todos" add constraint "notes_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."todos" validate constraint "notes_tenant_id_fkey";

set check_function_bodies = off;

BEGIN;
CREATE OR REPLACE FUNCTION public.create_tenant()
 RETURNS tenants
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  tenant tenants;
BEGIN
  INSERT INTO tenants DEFAULT VALUES RETURNING * INTO tenant;

  INSERT INTO tenant_memberships (tenant_id, user_id) VALUES (tenant.id, auth.uid());

  INSERT INTO tenant_membership_roles (tenant_id, user_id, role) VALUES (tenant.id, auth.uid(), 'Admin');

  return tenant;
END;$function$
;
REVOKE ALL ON FUNCTION public.create_tenant FROM PUBLIC;
grant execute on function public.create_tenant to authenticated;
COMMIT;

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

grant delete on table "public"."tenant_memberships" to "anon";

grant insert on table "public"."tenant_memberships" to "anon";

grant references on table "public"."tenant_memberships" to "anon";

grant select on table "public"."tenant_memberships" to "anon";

grant trigger on table "public"."tenant_memberships" to "anon";

grant truncate on table "public"."tenant_memberships" to "anon";

grant update on table "public"."tenant_memberships" to "anon";

grant delete on table "public"."tenant_memberships" to "authenticated";

grant insert on table "public"."tenant_memberships" to "authenticated";

grant references on table "public"."tenant_memberships" to "authenticated";

grant select on table "public"."tenant_memberships" to "authenticated";

grant trigger on table "public"."tenant_memberships" to "authenticated";

grant truncate on table "public"."tenant_memberships" to "authenticated";

grant update on table "public"."tenant_memberships" to "authenticated";

grant delete on table "public"."tenant_memberships" to "service_role";

grant insert on table "public"."tenant_memberships" to "service_role";

grant references on table "public"."tenant_memberships" to "service_role";

grant select on table "public"."tenant_memberships" to "service_role";

grant trigger on table "public"."tenant_memberships" to "service_role";

grant truncate on table "public"."tenant_memberships" to "service_role";

grant update on table "public"."tenant_memberships" to "service_role";

grant delete on table "public"."tenants" to "anon";

grant insert on table "public"."tenants" to "anon";

grant references on table "public"."tenants" to "anon";

grant select on table "public"."tenants" to "anon";

grant trigger on table "public"."tenants" to "anon";

grant truncate on table "public"."tenants" to "anon";

grant update on table "public"."tenants" to "anon";

grant delete on table "public"."tenants" to "authenticated";

grant insert on table "public"."tenants" to "authenticated";

grant references on table "public"."tenants" to "authenticated";

grant select on table "public"."tenants" to "authenticated";

grant trigger on table "public"."tenants" to "authenticated";

grant truncate on table "public"."tenants" to "authenticated";

grant update on table "public"."tenants" to "authenticated";

grant delete on table "public"."tenants" to "service_role";

grant insert on table "public"."tenants" to "service_role";

grant references on table "public"."tenants" to "service_role";

grant select on table "public"."tenants" to "service_role";

grant trigger on table "public"."tenants" to "service_role";

grant truncate on table "public"."tenants" to "service_role";

grant update on table "public"."tenants" to "service_role";

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


create policy "Only records for the user"
on "public"."tenant_memberships"
as permissive
for select
to authenticated
using ((user_id = ( SELECT auth.uid() AS uid)));


create policy "Only tenants where the user is member of"
on "public"."tenants"
as permissive
for select
to authenticated
using (id IN ( SELECT tenant_memberships.tenant_id
   FROM tenant_memberships
  WHERE (tenant_memberships.user_id = auth.uid())));


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

alter publication supabase_realtime add table public.tenant_memberships;
alter publication supabase_realtime add table public.todos;
