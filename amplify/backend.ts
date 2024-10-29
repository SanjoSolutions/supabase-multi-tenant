import { defineBackend } from '@aws-amplify/backend'
import { auth } from './auth/resource.js'
import { data } from './data/resource.js'
import { invite } from './data/invite/resource.js'
import * as iam from 'aws-cdk-lib/aws-iam'

const backend = defineBackend({
  auth,
  data,
  invite,
})

backend.invite.resources.lambda.addToRolePolicy(
  new iam.PolicyStatement({
    sid: 'AllowSendEmail',
    actions: ['ses:SendEmail'],
    resources: [process.env.FROM_EMAIL_ARN!],
  })
)
