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
    email
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
export const getMembershipRoles = /* GraphQL */ `query GetMembershipRoles($tenantId: ID!, $userId: ID!) {
  getMembershipRoles(tenantId: $tenantId, userId: $userId) {
    createdAt
    roles
    tenantId
    updatedAt
    userId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetMembershipRolesQueryVariables,
  APITypes.GetMembershipRolesQuery
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
      email
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
export const listMembershipRoles = /* GraphQL */ `query ListMembershipRoles(
  $filter: ModelMembershipRolesFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
  $tenantId: ModelIDKeyConditionInput
  $userId: ID
) {
  listMembershipRoles(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
    tenantId: $tenantId
    userId: $userId
  ) {
    items {
      createdAt
      roles
      tenantId
      updatedAt
      userId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMembershipRolesQueryVariables,
  APITypes.ListMembershipRolesQuery
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
export const retrieveUserTenants = /* GraphQL */ `query RetrieveUserTenants {
  retrieveUserTenants {
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
` as GeneratedQuery<
  APITypes.RetrieveUserTenantsQueryVariables,
  APITypes.RetrieveUserTenantsQuery
>;
