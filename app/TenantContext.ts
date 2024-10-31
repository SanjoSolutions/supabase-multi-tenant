'use strict'

import { Tenant } from '@/types.js'
import { createContext } from 'react'

export const TenantContext = createContext<{
  tenant: Tenant | null
  setTenant: (tenant: Tenant | null) => void
}>({
  tenant: null,
  setTenant: () => {},
})
