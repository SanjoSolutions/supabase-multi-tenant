/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateInvitation = /* GraphQL */ `subscription OnCreateInvitation(
  $filter: ModelSubscriptionInvitationFilterInput
) {
  onCreateInvitation(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateInvitationSubscriptionVariables,
  APITypes.OnCreateInvitationSubscription
>;
export const onCreateMembershipRoles = /* GraphQL */ `subscription OnCreateMembershipRoles(
  $filter: ModelSubscriptionMembershipRolesFilterInput
  $userId: String
) {
  onCreateMembershipRoles(filter: $filter, userId: $userId) {
    createdAt
    roles
    tenantId
    updatedAt
    userId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateMembershipRolesSubscriptionVariables,
  APITypes.OnCreateMembershipRolesSubscription
>;
export const onCreateTenant = /* GraphQL */ `subscription OnCreateTenant($filter: ModelSubscriptionTenantFilterInput) {
  onCreateTenant(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateTenantSubscriptionVariables,
  APITypes.OnCreateTenantSubscription
>;
export const onCreateTodo = /* GraphQL */ `subscription OnCreateTodo($filter: ModelSubscriptionTodoFilterInput) {
  onCreateTodo(filter: $filter) {
    content
    createdAt
    id
    tenantId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateTodoSubscriptionVariables,
  APITypes.OnCreateTodoSubscription
>;
export const onDeleteInvitation = /* GraphQL */ `subscription OnDeleteInvitation(
  $filter: ModelSubscriptionInvitationFilterInput
) {
  onDeleteInvitation(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteInvitationSubscriptionVariables,
  APITypes.OnDeleteInvitationSubscription
>;
export const onDeleteMembershipRoles = /* GraphQL */ `subscription OnDeleteMembershipRoles(
  $filter: ModelSubscriptionMembershipRolesFilterInput
  $userId: String
) {
  onDeleteMembershipRoles(filter: $filter, userId: $userId) {
    createdAt
    roles
    tenantId
    updatedAt
    userId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteMembershipRolesSubscriptionVariables,
  APITypes.OnDeleteMembershipRolesSubscription
>;
export const onDeleteTenant = /* GraphQL */ `subscription OnDeleteTenant($filter: ModelSubscriptionTenantFilterInput) {
  onDeleteTenant(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteTenantSubscriptionVariables,
  APITypes.OnDeleteTenantSubscription
>;
export const onDeleteTodo = /* GraphQL */ `subscription OnDeleteTodo($filter: ModelSubscriptionTodoFilterInput) {
  onDeleteTodo(filter: $filter) {
    content
    createdAt
    id
    tenantId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteTodoSubscriptionVariables,
  APITypes.OnDeleteTodoSubscription
>;
export const onUpdateInvitation = /* GraphQL */ `subscription OnUpdateInvitation(
  $filter: ModelSubscriptionInvitationFilterInput
) {
  onUpdateInvitation(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateInvitationSubscriptionVariables,
  APITypes.OnUpdateInvitationSubscription
>;
export const onUpdateMembershipRoles = /* GraphQL */ `subscription OnUpdateMembershipRoles(
  $filter: ModelSubscriptionMembershipRolesFilterInput
  $userId: String
) {
  onUpdateMembershipRoles(filter: $filter, userId: $userId) {
    createdAt
    roles
    tenantId
    updatedAt
    userId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateMembershipRolesSubscriptionVariables,
  APITypes.OnUpdateMembershipRolesSubscription
>;
export const onUpdateTenant = /* GraphQL */ `subscription OnUpdateTenant($filter: ModelSubscriptionTenantFilterInput) {
  onUpdateTenant(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateTenantSubscriptionVariables,
  APITypes.OnUpdateTenantSubscription
>;
export const onUpdateTodo = /* GraphQL */ `subscription OnUpdateTodo($filter: ModelSubscriptionTodoFilterInput) {
  onUpdateTodo(filter: $filter) {
    content
    createdAt
    id
    tenantId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateTodoSubscriptionVariables,
  APITypes.OnUpdateTodoSubscription
>;
