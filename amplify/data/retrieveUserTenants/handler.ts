import type { AppSyncIdentityIAM } from 'aws-lambda'
import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider'
import { type Schema } from '../resource.js'
import { retrieveTenantIDs } from '../retrieveTenantIDs.js'
import { configureAmplify } from '../../configureAmplify.js'
import { env } from '$amplify/env/retrieveUserTenants'
import { generateClient } from 'aws-amplify/api'
import { getTenant } from '../../graphql/queries.js'
import { pick } from 'lodash-es'

type Tenant = Schema['Tenant']['type']

const cognitoIdentityProviderClient = new CognitoIdentityProviderClient()

configureAmplify(env)

const client = generateClient<Schema>({
  authMode: 'iam',
})

export const handler: Schema['retrieveUserTenants']['functionHandler'] =
  async event => {
    const tenantIds = await retrieveTenantIDs(
      cognitoIdentityProviderClient,
      (event.identity as AppSyncIdentityIAM).username
    )

    const result = await Promise.all(
      tenantIds.map(tenantId =>
        client.graphql({
          query: getTenant,
          variables: {
            id: tenantId,
          },
        })
      )
    )

    const a = result.map<Tenant>(
      item =>
        pick(item.data.getTenant, 'name', 'id', 'createdAt', 'updatedAt') as any
    )
    console.log('a', a)
    return a
  }
