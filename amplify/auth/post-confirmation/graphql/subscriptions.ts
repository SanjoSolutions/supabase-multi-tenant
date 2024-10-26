/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateTenant = /* GraphQL */ `subscription OnCreateTenant($filter: ModelSubscriptionTenantFilterInput) {
  onCreateTenant(filter: $filter) {
    createdAt
    id
    name
    owner
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateTenantSubscriptionVariables,
  APITypes.OnCreateTenantSubscription
>;
export const onCreateTodo = /* GraphQL */ `subscription OnCreateTodo(
  $filter: ModelSubscriptionTodoFilterInput
  $owner: String
) {
  onCreateTodo(filter: $filter, owner: $owner) {
    content
    createdAt
    id
    owner
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateTodoSubscriptionVariables,
  APITypes.OnCreateTodoSubscription
>;
export const onDeleteTenant = /* GraphQL */ `subscription OnDeleteTenant($filter: ModelSubscriptionTenantFilterInput) {
  onDeleteTenant(filter: $filter) {
    createdAt
    id
    name
    owner
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteTenantSubscriptionVariables,
  APITypes.OnDeleteTenantSubscription
>;
export const onDeleteTodo = /* GraphQL */ `subscription OnDeleteTodo(
  $filter: ModelSubscriptionTodoFilterInput
  $owner: String
) {
  onDeleteTodo(filter: $filter, owner: $owner) {
    content
    createdAt
    id
    owner
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteTodoSubscriptionVariables,
  APITypes.OnDeleteTodoSubscription
>;
export const onUpdateTenant = /* GraphQL */ `subscription OnUpdateTenant($filter: ModelSubscriptionTenantFilterInput) {
  onUpdateTenant(filter: $filter) {
    createdAt
    id
    name
    owner
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateTenantSubscriptionVariables,
  APITypes.OnUpdateTenantSubscription
>;
export const onUpdateTodo = /* GraphQL */ `subscription OnUpdateTodo(
  $filter: ModelSubscriptionTodoFilterInput
  $owner: String
) {
  onUpdateTodo(filter: $filter, owner: $owner) {
    content
    createdAt
    id
    owner
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateTodoSubscriptionVariables,
  APITypes.OnUpdateTodoSubscription
>;
