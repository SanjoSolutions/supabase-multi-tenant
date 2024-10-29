import type { AppSyncIdentityIAM } from 'aws-lambda'
import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider'
import { env } from '$amplify/env/joinTenant.js'
import { JoinResult } from '@/app/invitation/JoinResult.js'

import { type Schema } from '../../data/resource'
import { generateClient } from 'aws-amplify/data'
import { configureAmplify } from '../../configureAmplify.js'
import { getInvitation } from '../../graphql/queries.js'
import { addUserToTenant } from '../addUserToTenant.js'

configureAmplify(env)

const client = generateClient<Schema>({
  authMode: 'iam',
})

const cognitoIdentityProviderClient = new CognitoIdentityProviderClient()

export const handler: Schema['joinTenant']['functionHandler'] = async event => {
  console.log('event', event)
  console.log('env', process.env)

  try {
    const result = await client.graphql({
      query: getInvitation,
      variables: {
        token: event.arguments.token,
      },
    })
    console.log('result', result)

    const tenantId = result.data.getInvitation?.tenantId

    if (tenantId) {
      return await addUserToTenant(
        client,
        cognitoIdentityProviderClient,
        event.identity as AppSyncIdentityIAM,
        tenantId
      )
    } else {
      return JoinResult.HasFailed
    }
  } catch (error) {
    console.error(error)
    return JoinResult.HasFailed
  }
}
