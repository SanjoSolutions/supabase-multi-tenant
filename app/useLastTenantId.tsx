'use client'
import { useSession } from './useSession.jsx'

export function useLastTenantId(): number | null {
  const { session } = useSession()
  return session?.user.user_metadata.lastTenantId ?? null
}
