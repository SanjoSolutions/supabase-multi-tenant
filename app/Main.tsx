'use client'

import { useState } from 'react'
import NavBar from './NavBar.jsx'
import { TenantIdContext } from './TenantIdContext.js'

export default function ({ children }: { children: React.ReactNode }) {
  const [tenantId, setTenantId] = useState<string | null>(null)
  return (
    <TenantIdContext.Provider value={{ tenantId, setTenantId }}>
      <NavBar />
      {children}
    </TenantIdContext.Provider>
  )
}
