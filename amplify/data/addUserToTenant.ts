import { env } from '$amplify/env/joinTenant.js'
import { JoinResult } from '@/app/invitation/JoinResult.js'
import { AdminUpdateUserAttributesCommand } from '@aws-sdk/client-cognito-identity-provider'
import type { AppSyncIdentityIAM } from 'aws-lambda'
import { retrieveTenantIDs } from './retrieveTenantIDs.js'
import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider'
import { Schema } from './resource.js'
import type { V6Client } from '@aws-amplify/api-graphql'
import { createMembershipRoles } from '../graphql/mutations.js'

export async function addUserToTenant(
  client: V6Client<Schema>,
  cognitoIdentityProviderClient: CognitoIdentityProviderClient,
  identity: AppSyncIdentityIAM,
  tenantId: string
): Promise<JoinResult> {
  const tenantIDs = new Set(
    await retrieveTenantIDs(cognitoIdentityProviderClient, identity)
  )
  if (tenantIDs.has(tenantId)) {
    return JoinResult.WasAlreadyMember
  } else {
    tenantIDs.add(tenantId)

    const command = new AdminUpdateUserAttributesCommand({
      UserPoolId: env.AMPLIFY_AUTH_USERPOOL_ID,
      Username: identity.username,
      UserAttributes: [
        {
          Name: 'custom:tenant_ids',
          Value: JSON.stringify(Array.from(tenantIDs)),
        },
      ],
    })
    const response = await cognitoIdentityProviderClient.send(command)
    console.log('response', response)

    await client.graphql({
      query: createMembershipRoles,
      variables: {
        input: {
          userId: identity.username,
          tenantId,
          roles: [],
        },
      },
    })

    return JoinResult.HasJoined
  }
}
