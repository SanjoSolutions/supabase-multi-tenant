import { defineFunction } from '@aws-amplify/backend'

export const invite = defineFunction({
  environment: {
    FROM_EMAIL: process.env.FROM_EMAIL!,
    FROM_EMAIL_ARN: process.env.FROM_EMAIL_ARN!,
  },
})
