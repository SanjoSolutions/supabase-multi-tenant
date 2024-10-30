import { defineAuth } from '@aws-amplify/backend'
import { postConfirmation } from './post-confirmation/resource.js'
import { joinTenant } from '../data/joinTenant/resource.js'
import { createAndJoinTenant } from '../data/createAndJoinTenant/resource.js'
import { retrieveUserTenants } from '../data/retrieveUserTenants/resource.js'
import { authorize } from '../data/authorize/resource.js'

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
    allow.resource(retrieveUserTenants).to(['getUser']),
    allow.resource(authorize).to(['getUser']),
  ],
})
