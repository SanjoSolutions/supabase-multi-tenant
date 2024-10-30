import type { AppSyncAuthorizerHandler } from 'aws-lambda'
import { CognitoJwtVerifier } from 'aws-jwt-verify'
import { DefinitionNode, parse } from 'graphql'
import { retrieveTenantIDs } from '../retrieveTenantIDs.js'
import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider'

const cognitoIdentityProviderClient = new CognitoIdentityProviderClient()

console.log('env', process.env)

const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.USER_POOL_ID as string,
  tokenUse: 'id',
  clientId: process.env.CLIENT_ID as string,
})

function isValidQuery(
  definition: DefinitionNode,
  variables: { [key: string]: any },
  userTenantIds: Set<string>
): boolean {
  const isValidGraphQL = Boolean(
    definition.kind === 'OperationDefinition' &&
      definition.operation === 'query' &&
      definition.variableDefinitions?.some(
        variableDefinition =>
          variableDefinition.variable.name.value === 'filter'
      ) &&
      definition.selectionSet.selections.every(
        selection =>
          selection.kind === 'Field' &&
          selection.name.value.startsWith('list') &&
          selection.arguments?.some(
            argument =>
              argument.name.value === 'filter' &&
              argument.value.kind === 'Variable' &&
              argument.value.name.value === 'filter'
          )
      )
  )

  if (isValidGraphQL) {
    const tenantID = variables.filter?.tenantId?.eq
    return Boolean(tenantID && userTenantIds.has(tenantID))
  }

  return false
}

function isValidSubscription(
  definition: DefinitionNode,
  variables: { [key: string]: any },
  userTenantIds: Set<string>
): boolean {
  const isValidGraphQL = Boolean(
    definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription' &&
      definition.variableDefinitions?.some(
        variableDefinition =>
          variableDefinition.variable.name.value === 'filter'
      ) &&
      definition.selectionSet.selections.every(
        selection =>
          selection.kind === 'Field' &&
          selection.name.value.startsWith('on') &&
          selection.arguments?.some(
            argument =>
              argument.name.value === 'filter' &&
              argument.value.kind === 'Variable' &&
              argument.value.name.value === 'filter'
          )
      )
  )

  if (isValidGraphQL) {
    const tenantID = variables.filter?.tenantId?.eq
    return Boolean(tenantID && userTenantIds.has(tenantID))
  }

  return false
}

function isValidMutation(
  definition: DefinitionNode,
  variables: { [key: string]: any },
  userTenantIds: Set<string>
): boolean {
  return (
    isValidCreateMutation(definition, variables, userTenantIds) ||
    isValidInviteMutation(definition, variables, userTenantIds)
  )
}

function isValidCreateMutation(
  definition: DefinitionNode,
  variables: { [key: string]: any },
  userTenantIds: Set<string>
): boolean {
  const isValidGraphQL = Boolean(
    definition.kind === 'OperationDefinition' &&
      definition.operation === 'mutation' &&
      definition.variableDefinitions?.some(
        variableDefinition => variableDefinition.variable.name.value === 'input'
      ) &&
      definition.selectionSet.selections.every(
        selection =>
          selection.kind === 'Field' &&
          selection.name.value.startsWith('create') &&
          selection.arguments?.some(
            argument =>
              argument.name.value === 'input' &&
              argument.value.kind === 'Variable' &&
              argument.value.name.value === 'input'
          )
      )
  )

  if (isValidGraphQL) {
    const tenantID = variables.input?.tenantId
    return Boolean(tenantID && userTenantIds.has(tenantID))
  }

  return false
}

function isValidInviteMutation(
  definition: DefinitionNode,
  variables: { [key: string]: any },
  userTenantIds: Set<string>
): boolean {
  const isValidGraphQL = Boolean(
    definition.kind === 'OperationDefinition' &&
      definition.operation === 'mutation' &&
      definition.variableDefinitions?.some(
        variableDefinition =>
          variableDefinition.variable.name.value === 'tenantId'
      ) &&
      definition.selectionSet.selections.every(
        selection =>
          selection.kind === 'Field' &&
          selection.name.value === 'invite' &&
          selection.arguments?.some(
            argument =>
              argument.name.value === 'tenantId' &&
              argument.value.kind === 'Variable' &&
              argument.value.name.value === 'tenantId'
          )
      )
  )

  if (isValidGraphQL) {
    const tenantID = variables.tenantId
    return Boolean(tenantID && userTenantIds.has(tenantID))
  }

  return false
}

export const handler: AppSyncAuthorizerHandler = async event => {
  console.log(`EVENT: ${JSON.stringify(event)}`)
  let response
  try {
    const {
      authorizationToken,
      requestContext: { operationName },
    } = event

    const payload = await verifier.verify(authorizationToken.substring(2))
    console.log('payload', payload)

    if (operationName === 'Deepdish:Connect') {
      response = {
        isAuthorized: true,
      }
    } else {
      const {
        requestContext: { queryString },
      } = event

      const userTenantIds = new Set<string>(
        await retrieveTenantIDs(
          cognitoIdentityProviderClient,
          payload['cognito:username']
        )
      )
      console.log('userTenantIds', userTenantIds)

      const variables = event.requestContext.variables

      const document = parse(queryString)
      const isValid = document.definitions.every(
        definition =>
          isValidQuery(definition, variables, userTenantIds) ||
          isValidSubscription(definition, variables, userTenantIds) ||
          isValidMutation(definition, variables, userTenantIds)
      )

      response = {
        isAuthorized: isValid,
      }
    }
  } catch (error) {
    console.error(error)
    response = {
      isAuthorized: false,
    }
  }
  console.log('response', response)
  return response
}
