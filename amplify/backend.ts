import { defineBackend } from '@aws-amplify/backend'
import { auth } from './auth/resource.js'
import { data } from './data/resource.js'
import { authorize } from './data/authorize/resource.js'

const backend = defineBackend({
  auth,
  data,
  authorize,
})

// Comment this out when you receive a circular dependency error.
// Then let it deploy. Then comment it in again and let it deploy again.
backend.authorize.addEnvironment(
  'CLIENT_ID',
  backend.auth.resources.userPoolClient.userPoolClientId
)
backend.authorize.addEnvironment(
  'USER_POOL_ID',
  backend.auth.resources.userPool.userPoolId
)
