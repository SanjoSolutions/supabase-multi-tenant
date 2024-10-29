import { defineAuth } from '@aws-amplify/backend'
import { postConfirmation } from './post-confirmation/resource.js'
import { joinTenant } from '../data/joinTenant/resource.js'
import { createAndJoinTenant } from '../data/createAndJoinTenant/resource.js'
import { retrieveUserTenantIds } from '../data/retrieveUserTenantIds/resource.js'

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
  groups: ['Admins'],
  userAttributes: {
    'custom:tenant_ids': {
      dataType: 'String',
      mutable: true,
    },
  },
  access: allow => [
    allow
      .resource(postConfirmation)
      .to(['updateUserAttributes', 'addUserToGroup']),
    allow.resource(createAndJoinTenant).to(['updateUserAttributes', 'getUser']),
    allow.resource(joinTenant).to(['updateUserAttributes', 'getUser']),
    allow.resource(retrieveUserTenantIds).to(['getUser']),
  ],
})
