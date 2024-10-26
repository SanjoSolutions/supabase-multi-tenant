import type { PostConfirmationTriggerHandler } from 'aws-lambda'
import {
  CognitoIdentityProviderClient,
  AdminUpdateUserAttributesCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import { env } from '$amplify/env/post-confirmation'

import { type Schema } from '../../data/resource'
import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/data'
import { createTenant } from './graphql/mutations'

Amplify.configure(
  {
    API: {
      GraphQL: {
        endpoint: env.AMPLIFY_DATA_GRAPHQL_ENDPOINT,
        region: env.AWS_REGION,
        defaultAuthMode: 'iam',
      },
    },
  },
  {
    Auth: {
      credentialsProvider: {
        getCredentialsAndIdentityId: async () => ({
          credentials: {
            accessKeyId: env.AWS_ACCESS_KEY_ID,
            secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
            sessionToken: env.AWS_SESSION_TOKEN,
          },
        }),
        clearCredentialsAndIdentityId: () => {
          /* noop */
        },
      },
    },
  }
)

const client = generateClient<Schema>({
  authMode: 'iam',
})

const cognitoIdentityProviderClient = new CognitoIdentityProviderClient()

export const handler: PostConfirmationTriggerHandler = async event => {
  console.log('event', event)

  try {
    const result = await client.graphql({
      query: createTenant,
      variables: {
        input: {},
      },
    })
    console.log('result', result)

    const tenantId = result.data.createTenant.id

    const command = new AdminUpdateUserAttributesCommand({
      UserPoolId: event.userPoolId,
      Username: event.userName,
      UserAttributes: [
        {
          Name: 'custom:tenant_id',
          Value: tenantId,
        },
      ],
    })
    const response = await cognitoIdentityProviderClient.send(command)
    console.log('response', response)
  } catch (error) {
    console.error(error)
  }

  return event
}
