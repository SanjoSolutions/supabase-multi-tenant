import { defineFunction } from '@aws-amplify/backend'

export const authorize = defineFunction({
  environment: {
    CLIENT_ID: process.env.CLIENT_ID!,
    USER_POOL_ID: process.env.USER_POOL_ID!,
  },
})
