'use client'

import type { Schema } from '@/amplify/data/resource'
import { generateClient as generateClientBase } from 'aws-amplify/data'
import { fetchAuthSession } from 'aws-amplify/auth'

export async function generateClient() {
  const session = await fetchAuthSession()
  console.log('token', session.tokens?.idToken?.toString()!)
  return generateClientBase<Schema>({
    authMode: 'lambda',
    authToken: 'a ' + session.tokens?.idToken?.toString()!,
  })
}
