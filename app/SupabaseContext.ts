import { createClient } from '@/utils/supabase/client.js'
import { createContext } from 'react'

export const SupabaseContext = createContext(createClient())
