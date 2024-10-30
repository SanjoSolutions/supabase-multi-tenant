import { env } from '$amplify/env/joinTenant.js'
import {
  AdminGetUserCommand,
  CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider'

export async function retrieveTenantIDs(
  cognitoIdentityProviderClient: CognitoIdentityProviderClient,
  username: string
): Promise<string[]> {
  const command = new AdminGetUserCommand({
    UserPoolId: env.AMPLIFY_AUTH_USERPOOL_ID,
    Username: username,
  })
  const response = await cognitoIdentityProviderClient.send(command)
  const attribute = response.UserAttributes!.find(
    attribute => attribute.Name === 'custom:tenant_ids'
  )
  return typeof attribute?.Value === 'string' ? JSON.parse(attribute.Value) : []
}
