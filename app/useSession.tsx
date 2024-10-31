'use client'
import { Session } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import { supabase } from './page.jsx'

export function useSession(): Session | null {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(function () {
    async function f() {
      const { data } = await supabase.auth.getSession()
      setSession(data.session || null)
    }

    f()
  }, [])

  return session
}
