'use strict'

import { createContext } from 'react'

export const TenantIdContext = createContext<{
  tenantId: string | null
  setTenantId: (tenantId: string | null) => void
}>({
  tenantId: null,
  setTenantId: () => {},
})
