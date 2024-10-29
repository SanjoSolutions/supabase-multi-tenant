import type { PostConfirmationTriggerHandler } from 'aws-lambda'
import {
  CognitoIdentityProviderClient,
  AdminUpdateUserAttributesCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import { env } from '$amplify/env/post-confirmation'

import { configureAmplify } from '../../configureAmplify.js'

configureAmplify(env)

const cognitoIdentityProviderClient = new CognitoIdentityProviderClient()

export const handler: PostConfirmationTriggerHandler = async event => {
  console.log('event', event)

  try {
    const command = new AdminUpdateUserAttributesCommand({
      UserPoolId: event.userPoolId,
      Username: event.userName,
      UserAttributes: [
        {
          Name: 'custom:tenant_ids',
          Value: JSON.stringify([]),
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
