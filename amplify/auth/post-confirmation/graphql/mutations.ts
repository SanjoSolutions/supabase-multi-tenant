/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createInvitation = /* GraphQL */ `mutation CreateInvitation(
  $condition: ModelInvitationConditionInput
  $input: CreateInvitationInput!
) {
  createInvitation(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateInvitationMutationVariables,
  APITypes.CreateInvitationMutation
>;
export const createTenant = /* GraphQL */ `mutation CreateTenant(
  $condition: ModelTenantConditionInput
  $input: CreateTenantInput!
) {
  createTenant(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateTenantMutationVariables,
  APITypes.CreateTenantMutation
>;
export const createTodo = /* GraphQL */ `mutation CreateTodo(
  $condition: ModelTodoConditionInput
  $input: CreateTodoInput!
) {
  createTodo(condition: $condition, input: $input) {
    content
    createdAt
    id
    tenantId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateTodoMutationVariables,
  APITypes.CreateTodoMutation
>;
export const deleteInvitation = /* GraphQL */ `mutation DeleteInvitation(
  $condition: ModelInvitationConditionInput
  $input: DeleteInvitationInput!
) {
  deleteInvitation(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteInvitationMutationVariables,
  APITypes.DeleteInvitationMutation
>;
export const deleteTenant = /* GraphQL */ `mutation DeleteTenant(
  $condition: ModelTenantConditionInput
  $input: DeleteTenantInput!
) {
  deleteTenant(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteTenantMutationVariables,
  APITypes.DeleteTenantMutation
>;
export const deleteTodo = /* GraphQL */ `mutation DeleteTodo(
  $condition: ModelTodoConditionInput
  $input: DeleteTodoInput!
) {
  deleteTodo(condition: $condition, input: $input) {
    content
    createdAt
    id
    tenantId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteTodoMutationVariables,
  APITypes.DeleteTodoMutation
>;
export const invite = /* GraphQL */ `mutation Invite($email: AWSEmail!) {
  invite(email: $email) {
    success
    __typename
  }
}
` as GeneratedMutation<
  APITypes.InviteMutationVariables,
  APITypes.InviteMutation
>;
export const updateInvitation = /* GraphQL */ `mutation UpdateInvitation(
  $condition: ModelInvitationConditionInput
  $input: UpdateInvitationInput!
) {
  updateInvitation(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateInvitationMutationVariables,
  APITypes.UpdateInvitationMutation
>;
export const updateTenant = /* GraphQL */ `mutation UpdateTenant(
  $condition: ModelTenantConditionInput
  $input: UpdateTenantInput!
) {
  updateTenant(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateTenantMutationVariables,
  APITypes.UpdateTenantMutation
>;
export const updateTodo = /* GraphQL */ `mutation UpdateTodo(
  $condition: ModelTodoConditionInput
  $input: UpdateTodoInput!
) {
  updateTodo(condition: $condition, input: $input) {
    content
    createdAt
    id
    tenantId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateTodoMutationVariables,
  APITypes.UpdateTodoMutation
>;
