'use client'

import { Session } from '@supabase/supabase-js'
import { useState, useEffect, useContext } from 'react'
import { SupabaseContext } from './SupabaseContext.js'

export function useSession(): Session | null {
  const supabase = useContext(SupabaseContext)
  const [session, setSession] = useState<Session | null>(null)

  useEffect(function () {
    async function f() {
      const { data } = await supabase.auth.getSession()
      setSession(data.session || null)
    }

    f()

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
    })

    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  return session
}
