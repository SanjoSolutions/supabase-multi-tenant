'use client'

import type { Schema } from '@/amplify/data/resource'
import { generateClient as generateClientBase } from 'aws-amplify/data'

export function generateClient() {
  return generateClientBase<Schema>({
    authMode: 'userPool',
  })
}
