import type { AppSyncIdentityIAM } from 'aws-lambda'
import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider'
import { env } from '$amplify/env/joinTenant.js'

import { type Schema } from '../resource'
import { generateClient } from 'aws-amplify/data'
import { configureAmplify } from '../../configureAmplify.js'
import { createTenant } from '../../graphql/mutations.js'
import { addUserToTenant } from '../addUserToTenant.js'

configureAmplify(env)

const client = generateClient<Schema>({
  authMode: 'iam',
})

export const cognitoIdentityProviderClient = new CognitoIdentityProviderClient()

export const handler: Schema['createAndJoinTenant']['functionHandler'] =
  async event => {
    console.log('event', event)
    console.log('env', process.env)

    try {
      const result = await client.graphql({
        query: createTenant,
        variables: {
          input: {},
        },
      })
      console.log('result', result)

      const tenantId = result.data.createTenant.id

      if (tenantId) {
        await addUserToTenant(
          client,
          cognitoIdentityProviderClient,
          event.identity as AppSyncIdentityIAM,
          tenantId
        )

        return tenantId
      } else {
        throw new Error('Have failed to create the tenant.')
      }
    } catch (error) {
      console.error(error)
      throw new Error('Error')
    }
  }
