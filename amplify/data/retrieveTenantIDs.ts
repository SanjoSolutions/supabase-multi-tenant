import { env } from '$amplify/env/joinTenant.js'
import {
  AdminGetUserCommand,
  CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider'
import type { AppSyncIdentityIAM } from 'aws-lambda'

export async function retrieveTenantIDs(
  cognitoIdentityProviderClient: CognitoIdentityProviderClient,
  identity: AppSyncIdentityIAM
): Promise<string[]> {
  const command = new AdminGetUserCommand({
    UserPoolId: env.AMPLIFY_AUTH_USERPOOL_ID,
    Username: identity.username,
  })
  const response = await cognitoIdentityProviderClient.send(command)
  const attribute = response.UserAttributes!.find(
    attribute => attribute.Name === 'custom:tenant_ids'
  )
  return typeof attribute?.Value === 'string' ? JSON.parse(attribute.Value) : []
}
