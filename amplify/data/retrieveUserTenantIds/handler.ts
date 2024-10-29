import type { AppSyncIdentityIAM } from 'aws-lambda'
import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider'
import { type Schema } from '../../data/resource'
import { retrieveTenantIDs } from '../retrieveTenantIDs.js'

export const cognitoIdentityProviderClient = new CognitoIdentityProviderClient()

export const handler: Schema['retrieveUserTenantIds']['functionHandler'] =
  async event => {
    return retrieveTenantIDs(
      cognitoIdentityProviderClient,
      event.identity as AppSyncIdentityIAM
    )
  }
