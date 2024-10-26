import { defineAuth } from '@aws-amplify/backend'
import { postConfirmation } from './post-confirmation/resource.js'

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  triggers: {
    postConfirmation,
  },
  userAttributes: {
    'custom:tenant_id': {
      dataType: 'String',
      mutable: true,
    },
  },
  access: allow => [
    allow.resource(postConfirmation).to(['updateUserAttributes']),
  ],
})
