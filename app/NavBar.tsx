'use client'

import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { TenantContext } from './TenantContext.js'
import { Tenant, TenantMembership } from '@/types.js'
import { useSession } from './useSession.jsx'
import { SupabaseContext } from './SupabaseContext.js'
import Link from 'next/link.js'
import { Role } from './Role.js'

export function NavBar() {
  const supabase = useContext(SupabaseContext)
  const { session } = useSession()
  const { tenantId } = useContext(TenantContext)

  const dropdownRef = useRef<HTMLAnchorElement>(null)

  useEffect(
    function () {
      if (dropdownRef.current) {
        const bootstrap = require('bootstrap')
        const dropdown = new bootstrap.Dropdown(dropdownRef.current)
        return () => dropdown.dispose()
      }
    },
    [dropdownRef]
  )

  const [tenants, setTenants] = useState<Tenant[] | null>(null)

  useEffect(
    function () {
      async function updateTenants() {
        const result = await supabase.from('tenants').select()
        const tenants = result.data
        console.log('tenants', tenants)
        setTenants(tenants)
      }

      // TODO: Update tenant list when a tenant membership of the user is removed.

      updateTenants()

      const { data } = supabase.auth.onAuthStateChange(event => {
        if (event === 'SIGNED_IN') {
          updateTenants()
        } else if (event === 'SIGNED_OUT') {
          setTenants(null)
        }
      })

      const subscription = supabase
        .channel('tenant_memberships')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'tenant_memberships' },
          async function (payload) {
            if (payload.eventType === 'INSERT' && payload.new) {
              const tenantMembership = payload.new as TenantMembership
              const { data: tenant, error } = await supabase
                .from('tenants')
                .select()
                .eq('id', tenantMembership.tenant_id)
                .single()
              if (tenant) {
                setTenants(tenants =>
                  tenants === null ? [tenant] : [...tenants, tenant]
                )
              }
            }
          }
        )
        .subscribe()
      return () => {
        subscription.unsubscribe()
        data.subscription.unsubscribe()
      }
    },
    [supabase]
  )

  const { tenant, setTenant } = useContext(TenantContext)

  const selectTenant = useCallback(function selectTenant(tenant: Tenant) {
    setTenant(tenant)
  }, [])

  const onSelectTenant = useCallback(function onSelectTenant(
    event: any,
    tenant: Tenant
  ) {
    event.preventDefault()
    selectTenant(tenant)
  },
  [])

  const onCreateTenant = useCallback(async function onCreateTenant(event: any) {
    event.preventDefault()
    const result = await supabase.rpc('create_tenant')
    if (result.data) {
      const tenantId = result.data
      selectTenant(tenantId)
    }
  }, [])

  const onLogOut = useCallback(async function onLogOut() {
    const result = await supabase.auth.signOut()
  }, [])

  const [roles, setRoles] = useState<Set<Role>>(new Set())

  useEffect(
    function () {
      async function f() {
        if (tenantId) {
          const { data: roles } = await supabase
            .from('tenant_membership_roles')
            .select('role')
            .eq('tenant_id', tenantId)
          setRoles(new Set((roles as any) ?? []))
        }
      }

      f()
    },
    [supabase, tenantId]
  )

  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary'>
      <div className='container-fluid'>
        <Link className='navbar-brand' href='/'>
          Multi-tenant
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            {session?.user && (
              <li className='nav-item'>
                <a
                  className='nav-link active'
                  aria-current='page'
                  href='/invite'
                >
                  Invite
                </a>
              </li>
            )}

            {session?.user && roles.has(Role.Admin) && (
              <li className='nav-item'>
                <a
                  className='nav-link active'
                  aria-current='page'
                  href='/members'
                >
                  Members
                </a>
              </li>
            )}
          </ul>

          <ul className='navbar-nav'>
            {session?.user && (
              <li className='nav-item dropdown'>
                <a
                  ref={dropdownRef}
                  className='nav-link dropdown-toggle'
                  href='#'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  {tenant ? renderTenantName(tenant) : 'Select tenant'}
                </a>
                <ul className='dropdown-menu'>
                  {tenants?.map(tenant => (
                    <li key={tenant.id}>
                      <a
                        className='dropdown-item'
                        href='#'
                        onClick={event => onSelectTenant(event, tenant)}
                      >
                        {renderTenantName(tenant)}
                      </a>
                    </li>
                  ))}

                  {tenants && tenants.length >= 1 && (
                    <li>
                      <hr className='dropdown-divider' />
                    </li>
                  )}

                  <li>
                    <a
                      className='dropdown-item'
                      href='#'
                      onClick={onCreateTenant}
                    >
                      Create tenant
                    </a>
                  </li>
                </ul>
              </li>
            )}
            {session?.user && (
              <li className='nav-item'>
                <button
                  className='btn btn-outline-secondary'
                  type='button'
                  onClick={onLogOut}
                >
                  Log out
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

function renderTenantName(tenant: Tenant): string {
  return tenant.name || `Tenant ${tenant.id}`
}
