/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getInvitation = /* GraphQL */ `query GetInvitation($token: String!) {
  getInvitation(token: $token) {
    createdAt
    tenant {
      createdAt
      id
      name
      updatedAt
      __typename
    }
    tenantId
    token
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetInvitationQueryVariables,
  APITypes.GetInvitationQuery
>;
export const getTenant = /* GraphQL */ `query GetTenant($id: ID!) {
  getTenant(id: $id) {
    createdAt
    id
    invitations {
      nextToken
      __typename
    }
    name
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetTenantQueryVariables, APITypes.GetTenantQuery>;
export const getTodo = /* GraphQL */ `query GetTodo($id: ID!, $tenantId: ID!) {
  getTodo(id: $id, tenantId: $tenantId) {
    content
    createdAt
    id
    tenantId
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetTodoQueryVariables, APITypes.GetTodoQuery>;
export const listInvitations = /* GraphQL */ `query ListInvitations(
  $filter: ModelInvitationFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
  $token: String
) {
  listInvitations(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
    token: $token
  ) {
    items {
      createdAt
      tenantId
      token
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListInvitationsQueryVariables,
  APITypes.ListInvitationsQuery
>;
export const listTenants = /* GraphQL */ `query ListTenants(
  $filter: ModelTenantFilterInput
  $limit: Int
  $nextToken: String
) {
  listTenants(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      id
      name
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTenantsQueryVariables,
  APITypes.ListTenantsQuery
>;
export const listTodos = /* GraphQL */ `query ListTodos(
  $filter: ModelTodoFilterInput
  $id: ModelIDKeyConditionInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
  $tenantId: ID
) {
  listTodos(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
    tenantId: $tenantId
  ) {
    items {
      content
      createdAt
      id
      tenantId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListTodosQueryVariables, APITypes.ListTodosQuery>;
