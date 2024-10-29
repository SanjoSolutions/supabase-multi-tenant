import type { Schema } from '../resource'
import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2'
import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/data'
import { env } from '$amplify/env/invite'
import { randomUUID } from 'crypto'

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

const sesClient = new SESv2Client()

export const handler: Schema['invite']['functionHandler'] = async (
  event,
  context
) => {
  try {
    console.log('event', event)

    const { email, tenantId } = event.arguments

    const result = (await client.graphql({
      query: /* GraphQL */ `
        mutation CreateInvitation($input: CreateInvitationInput!) {
          createInvitation(input: $input) {
            token
          }
        }
      `,
      variables: {
        input: {
          tenantId,
          email,
          token: randomUUID(),
        },
      },
    })) as any

    const invitationUrl = `http://localhost:3001/invitation/${result.data.createInvitation.token}`

    const input = {
      FromEmailAddress: env.FROM_EMAIL,
      FromEmailAddressIdentityArn: env.FROM_EMAIL_ARN,
      Destination: {
        ToAddresses: [email],
      },
      ReplyToAddresses: [env.FROM_EMAIL],
      FeedbackForwardingEmailAddress: env.FROM_EMAIL,
      FeedbackForwardingEmailAddressIdentityArn: env.FROM_EMAIL_ARN,
      Content: {
        Simple: {
          Subject: {
            Data: 'Invitation',
          },
          Body: {
            Text: {
              Data: `You have been invited: ${invitationUrl}`,
            },
            Html: {
              Data: `You have been invited: <a href="${invitationUrl}" target="_blank">open invitation</a>`,
            },
          },
        },
      },
    }
    const command = new SendEmailCommand(input)
    const response = await sesClient.send(command)
    console.log('response', response)
    return true
  } catch (error: any) {
    console.error('error', error)
    return false
  }
}
