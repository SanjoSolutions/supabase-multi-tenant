'use client'

import { useState, useEffect, useCallback, useContext } from 'react'
import NavBar from './NavBar.jsx'
import { TenantContext } from './TenantContext.js'
import { Tenant } from '@/types.js'
import { SupabaseContext } from './SupabaseContext.js'

export default function ({ children }: { children: React.ReactNode }) {
  const supabase = useContext(SupabaseContext)
  const [tenant, setTenantState] = useState<Tenant | null>(null)

  useEffect(function () {
    async function f() {
      const { data } = await supabase.auth.getSession()
      const lastTenantId = data.session?.user.user_metadata.lastTenantId
      if (lastTenantId) {
        const { data } = await supabase
          .from('tenants')
          .select()
          .eq('id', lastTenantId)
          .single()
        setTenant(data)
      } else {
        setTenant(null)
      }
    }

    f()

    const { data } = supabase.auth.onAuthStateChange(event => {
      if (event === 'SIGNED_IN') {
        f()
      }
    })

    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  const setTenant = useCallback(async function setTenant(
    tenant: Tenant | null
  ) {
    setTenantState(tenant)
    await supabase.auth.updateUser({
      data: {
        lastTenantId: tenant?.id ?? null,
      },
    })
  },
  [])

  return (
    <TenantContext.Provider value={{ tenant, setTenant }}>
      <NavBar />
      <main className='p-2'>{children}</main>
    </TenantContext.Provider>
  )
}
