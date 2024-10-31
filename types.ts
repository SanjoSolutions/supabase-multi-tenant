import { Tables } from './database.types.js'

export type Tenant = Tables<'tenants'>
export type Todo = Tables<'todos'>
export type TenantMembership = Tables<'tenant_memberships'>
