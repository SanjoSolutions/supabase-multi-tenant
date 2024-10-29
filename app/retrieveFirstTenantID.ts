'use client'

import { fetchAuthSession } from 'aws-amplify/auth'

export async function retrieveFirstTenantID(): Promise<string> {
  const session = await fetchAuthSession()
  return JSON.parse(
    session.tokens!.idToken!.payload['custom:tenant_ids'] as string
  )[0]
}
