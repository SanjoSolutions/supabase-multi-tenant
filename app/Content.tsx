'use client'

import { useState, useEffect, useCallback, useContext } from 'react'
import { NavBar } from './NavBar.jsx'
import { TenantContext } from './TenantContext.js'
import { Tenant } from '@/types.js'
import { SupabaseContext } from './SupabaseContext.js'
import { useLastTenantId } from './useLastTenantId.jsx'

export function Content({ children }: { children: React.ReactNode }) {
  const supabase = useContext(SupabaseContext)
  const lastTenantId = useLastTenantId()
  const [tenantId, setTenantId] = useState<number | null>(lastTenantId)
  const [tenant, setTenantState] = useState<Tenant | null>(null)
  const [hasInitializedTenantId, setHasInitializedTenantId] =
    useState<boolean>(false)
  const [hasInitializedTenant, setHasInitializedTenant] =
    useState<boolean>(false)
  const [hasSetTenantBeenCalled, setHasSetTenantBeenCalled] =
    useState<boolean>(false)

  const fetchTenant = useCallback(async function fetchTenant(tenantId: number) {
    const { data } = await supabase
      .from('tenants')
      .select()
      .eq('id', tenantId)
      .single()
    setTenantState(data)
  }, [])

  useEffect(
    function () {
      if (!hasInitializedTenant && !hasSetTenantBeenCalled && lastTenantId) {
        setTenantId(lastTenantId)
        setHasInitializedTenantId(true)
        fetchTenant(lastTenantId).then(() => setHasInitializedTenant(true))
      }
    },
    [hasInitializedTenant, hasSetTenantBeenCalled, lastTenantId]
  )

  useEffect(
    function () {
      if (tenantId) {
        if (tenantId !== tenant?.id) {
          fetchTenant(tenantId)
        }
      } else {
        setTenantState(null)
      }
    },
    [tenantId, fetchTenant]
  )

  const setTenant = useCallback(async function setTenant(
    tenant: Tenant | null
  ) {
    setHasSetTenantBeenCalled(true)
    const tenantId = tenant?.id ?? null
    setTenantId(tenantId)
    setTenantState(tenant)
    await supabase.auth.updateUser({
      data: {
        lastTenantId: tenantId,
      },
    })
  },
  [])

  return (
    <TenantContext.Provider
      value={{
        hasTenantIdBeenInitialized: hasInitializedTenantId,
        hasTenantBeenInitialized: hasInitializedTenant,
        tenantId,
        tenant,
        setTenant,
      }}
    >
      <NavBar />
      <main className='flex-grow-1 flex-shrink-0 p-2'>{children}</main>
    </TenantContext.Provider>
  )
}
