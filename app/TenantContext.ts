'use client'

import { Tenant } from '@/types.js'
import { createContext } from 'react'

export const TenantContext = createContext<{
  hasTenantIdBeenInitialized: boolean
  hasTenantBeenInitialized: boolean
  tenantId: number | null
  tenant: Tenant | null
  setTenant: (tenant: Tenant | null) => void
}>({
  hasTenantIdBeenInitialized: false,
  hasTenantBeenInitialized: false,
  tenantId: null,
  tenant: null,
  setTenant: () => {},
})
