'use client'

import { useState, useEffect, useCallback } from 'react'
import NavBar from './NavBar.jsx'
import { TenantContext } from './TenantContext.js'
import { Tenant } from '@/types.js'

export default function ({ children }: { children: React.ReactNode }) {
  const [tenant, setTenantState] = useState<Tenant | null>(null)

  useEffect(function () {
    const tenantSerialized = localStorage.getItem('tenant')
    try {
      setTenant(tenantSerialized ? JSON.parse(tenantSerialized) : null)
    } catch (error: any) {
      setTenant(null)
    }
  }, [])

  const setTenant = useCallback(function setTenant(tenant: Tenant | null) {
    setTenantState(tenant)
    localStorage.setItem('tenant', JSON.stringify(tenant))
  }, [])

  return (
    <TenantContext.Provider value={{ tenant, setTenant }}>
      <NavBar />
      <main className='p-2'>{children}</main>
    </TenantContext.Provider>
  )
}
