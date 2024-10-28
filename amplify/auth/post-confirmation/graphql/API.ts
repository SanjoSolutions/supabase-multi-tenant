/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Invitation = {
  __typename: "Invitation",
  createdAt: string,
  tenant?: Tenant | null,
  tenantId: string,
  token: string,
  updatedAt: string,
};

export type Tenant = {
  __typename: "Tenant",
  createdAt: string,
  id: string,
  invitations?: ModelInvitationConnection | null,
  name?: string | null,
  updatedAt: string,
};

export type ModelInvitationConnection = {
  __typename: "ModelInvitationConnection",
  items:  Array<Invitation | null >,
  nextToken?: string | null,
};

export type Todo = {
  __typename: "Todo",
  content?: string | null,
  createdAt: string,
  id: string,
  tenantId: string,
  updatedAt: string,
};

export type ModelInvitationFilterInput = {
  and?: Array< ModelInvitationFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelInvitationFilterInput | null,
  or?: Array< ModelInvitationFilterInput | null > | null,
  tenantId?: ModelStringInput | null,
  token?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelTenantFilterInput = {
  and?: Array< ModelTenantFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  not?: ModelTenantFilterInput | null,
  or?: Array< ModelTenantFilterInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelTenantConnection = {
  __typename: "ModelTenantConnection",
  items:  Array<Tenant | null >,
  nextToken?: string | null,
};

export type ModelTodoFilterInput = {
  and?: Array< ModelTodoFilterInput | null > | null,
  content?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelTodoFilterInput | null,
  or?: Array< ModelTodoFilterInput | null > | null,
  tenantId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelIDKeyConditionInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
};

export type ModelTodoConnection = {
  __typename: "ModelTodoConnection",
  items:  Array<Todo | null >,
  nextToken?: string | null,
};

export type ModelInvitationConditionInput = {
  and?: Array< ModelInvitationConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  not?: ModelInvitationConditionInput | null,
  or?: Array< ModelInvitationConditionInput | null > | null,
  tenantId?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateInvitationInput = {
  tenantId: string,
  token: string,
};

export type ModelTenantConditionInput = {
  and?: Array< ModelTenantConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelTenantConditionInput | null,
  or?: Array< ModelTenantConditionInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateTenantInput = {
  id?: string | null,
  name?: string | null,
};

export type ModelTodoConditionInput = {
  and?: Array< ModelTodoConditionInput | null > | null,
  content?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  not?: ModelTodoConditionInput | null,
  or?: Array< ModelTodoConditionInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateTodoInput = {
  content?: string | null,
  id?: string | null,
  tenantId: string,
};

export type DeleteInvitationInput = {
  token: string,
};

export type DeleteTenantInput = {
  id: string,
};

export type DeleteTodoInput = {
  id: string,
  tenantId: string,
};

export type EventInvocationResponse = {
  __typename: "EventInvocationResponse",
  success: boolean,
};

export type UpdateInvitationInput = {
  tenantId?: string | null,
  token: string,
};

export type UpdateTenantInput = {
  id: string,
  name?: string | null,
};

export type UpdateTodoInput = {
  content?: string | null,
  id: string,
  tenantId: string,
};

export type ModelSubscriptionInvitationFilterInput = {
  and?: Array< ModelSubscriptionInvitationFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionInvitationFilterInput | null > | null,
  tenantId?: ModelSubscriptionStringInput | null,
  token?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionTenantFilterInput = {
  and?: Array< ModelSubscriptionTenantFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionTenantFilterInput | null > | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionTodoFilterInput = {
  and?: Array< ModelSubscriptionTodoFilterInput | null > | null,
  content?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionTodoFilterInput | null > | null,
  tenantId?: ModelSubscriptionIDInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type GetInvitationQueryVariables = {
  token: string,
};

export type GetInvitationQuery = {
  getInvitation?:  {
    __typename: "Invitation",
    createdAt: string,
    tenant?:  {
      __typename: "Tenant",
      createdAt: string,
      id: string,
      name?: string | null,
      updatedAt: string,
    } | null,
    tenantId: string,
    token: string,
    updatedAt: string,
  } | null,
};

export type GetTenantQueryVariables = {
  id: string,
};

export type GetTenantQuery = {
  getTenant?:  {
    __typename: "Tenant",
    createdAt: string,
    id: string,
    invitations?:  {
      __typename: "ModelInvitationConnection",
      nextToken?: string | null,
    } | null,
    name?: string | null,
    updatedAt: string,
  } | null,
};

export type GetTodoQueryVariables = {
  id: string,
  tenantId: string,
};

export type GetTodoQuery = {
  getTodo?:  {
    __typename: "Todo",
    content?: string | null,
    createdAt: string,
    id: string,
    tenantId: string,
    updatedAt: string,
  } | null,
};

export type ListInvitationsQueryVariables = {
  filter?: ModelInvitationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
  token?: string | null,
};

export type ListInvitationsQuery = {
  listInvitations?:  {
    __typename: "ModelInvitationConnection",
    items:  Array< {
      __typename: "Invitation",
      createdAt: string,
      tenantId: string,
      token: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListTenantsQueryVariables = {
  filter?: ModelTenantFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTenantsQuery = {
  listTenants?:  {
    __typename: "ModelTenantConnection",
    items:  Array< {
      __typename: "Tenant",
      createdAt: string,
      id: string,
      name?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListTodosQueryVariables = {
  filter?: ModelTodoFilterInput | null,
  id?: ModelIDKeyConditionInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
  tenantId?: string | null,
};

export type ListTodosQuery = {
  listTodos?:  {
    __typename: "ModelTodoConnection",
    items:  Array< {
      __typename: "Todo",
      content?: string | null,
      createdAt: string,
      id: string,
      tenantId: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CreateInvitationMutationVariables = {
  condition?: ModelInvitationConditionInput | null,
  input: CreateInvitationInput,
};

export type CreateInvitationMutation = {
  createInvitation?:  {
    __typename: "Invitation",
    createdAt: string,
    tenant?:  {
      __typename: "Tenant",
      createdAt: string,
      id: string,
      name?: string | null,
      updatedAt: string,
    } | null,
    tenantId: string,
    token: string,
    updatedAt: string,
  } | null,
};

export type CreateTenantMutationVariables = {
  condition?: ModelTenantConditionInput | null,
  input: CreateTenantInput,
};

export type CreateTenantMutation = {
  createTenant?:  {
    __typename: "Tenant",
    createdAt: string,
    id: string,
    invitations?:  {
      __typename: "ModelInvitationConnection",
      nextToken?: string | null,
    } | null,
    name?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateTodoMutationVariables = {
  condition?: ModelTodoConditionInput | null,
  input: CreateTodoInput,
};

export type CreateTodoMutation = {
  createTodo?:  {
    __typename: "Todo",
    content?: string | null,
    createdAt: string,
    id: string,
    tenantId: string,
    updatedAt: string,
  } | null,
};

export type DeleteInvitationMutationVariables = {
  condition?: ModelInvitationConditionInput | null,
  input: DeleteInvitationInput,
};

export type DeleteInvitationMutation = {
  deleteInvitation?:  {
    __typename: "Invitation",
    createdAt: string,
    tenant?:  {
      __typename: "Tenant",
      createdAt: string,
      id: string,
      name?: string | null,
      updatedAt: string,
    } | null,
    tenantId: string,
    token: string,
    updatedAt: string,
  } | null,
};

export type DeleteTenantMutationVariables = {
  condition?: ModelTenantConditionInput | null,
  input: DeleteTenantInput,
};

export type DeleteTenantMutation = {
  deleteTenant?:  {
    __typename: "Tenant",
    createdAt: string,
    id: string,
    invitations?:  {
      __typename: "ModelInvitationConnection",
      nextToken?: string | null,
    } | null,
    name?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteTodoMutationVariables = {
  condition?: ModelTodoConditionInput | null,
  input: DeleteTodoInput,
};

export type DeleteTodoMutation = {
  deleteTodo?:  {
    __typename: "Todo",
    content?: string | null,
    createdAt: string,
    id: string,
    tenantId: string,
    updatedAt: string,
  } | null,
};

export type InviteMutationVariables = {
  email: string,
};

export type InviteMutation = {
  invite?:  {
    __typename: "EventInvocationResponse",
    success: boolean,
  } | null,
};

export type UpdateInvitationMutationVariables = {
  condition?: ModelInvitationConditionInput | null,
  input: UpdateInvitationInput,
};

export type UpdateInvitationMutation = {
  updateInvitation?:  {
    __typename: "Invitation",
    createdAt: string,
    tenant?:  {
      __typename: "Tenant",
      createdAt: string,
      id: string,
      name?: string | null,
      updatedAt: string,
    } | null,
    tenantId: string,
    token: string,
    updatedAt: string,
  } | null,
};

export type UpdateTenantMutationVariables = {
  condition?: ModelTenantConditionInput | null,
  input: UpdateTenantInput,
};

export type UpdateTenantMutation = {
  updateTenant?:  {
    __typename: "Tenant",
    createdAt: string,
    id: string,
    invitations?:  {
      __typename: "ModelInvitationConnection",
      nextToken?: string | null,
    } | null,
    name?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateTodoMutationVariables = {
  condition?: ModelTodoConditionInput | null,
  input: UpdateTodoInput,
};

export type UpdateTodoMutation = {
  updateTodo?:  {
    __typename: "Todo",
    content?: string | null,
    createdAt: string,
    id: string,
    tenantId: string,
    updatedAt: string,
  } | null,
};

export type OnCreateInvitationSubscriptionVariables = {
  filter?: ModelSubscriptionInvitationFilterInput | null,
};

export type OnCreateInvitationSubscription = {
  onCreateInvitation?:  {
    __typename: "Invitation",
    createdAt: string,
    tenant?:  {
      __typename: "Tenant",
      createdAt: string,
      id: string,
      name?: string | null,
      updatedAt: string,
    } | null,
    tenantId: string,
    token: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTenantSubscriptionVariables = {
  filter?: ModelSubscriptionTenantFilterInput | null,
};

export type OnCreateTenantSubscription = {
  onCreateTenant?:  {
    __typename: "Tenant",
    createdAt: string,
    id: string,
    invitations?:  {
      __typename: "ModelInvitationConnection",
      nextToken?: string | null,
    } | null,
    name?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateTodoSubscriptionVariables = {
  filter?: ModelSubscriptionTodoFilterInput | null,
};

export type OnCreateTodoSubscription = {
  onCreateTodo?:  {
    __typename: "Todo",
    content?: string | null,
    createdAt: string,
    id: string,
    tenantId: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteInvitationSubscriptionVariables = {
  filter?: ModelSubscriptionInvitationFilterInput | null,
};

export type OnDeleteInvitationSubscription = {
  onDeleteInvitation?:  {
    __typename: "Invitation",
    createdAt: string,
    tenant?:  {
      __typename: "Tenant",
      createdAt: string,
      id: string,
      name?: string | null,
      updatedAt: string,
    } | null,
    tenantId: string,
    token: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTenantSubscriptionVariables = {
  filter?: ModelSubscriptionTenantFilterInput | null,
};

export type OnDeleteTenantSubscription = {
  onDeleteTenant?:  {
    __typename: "Tenant",
    createdAt: string,
    id: string,
    invitations?:  {
      __typename: "ModelInvitationConnection",
      nextToken?: string | null,
    } | null,
    name?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteTodoSubscriptionVariables = {
  filter?: ModelSubscriptionTodoFilterInput | null,
};

export type OnDeleteTodoSubscription = {
  onDeleteTodo?:  {
    __typename: "Todo",
    content?: string | null,
    createdAt: string,
    id: string,
    tenantId: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateInvitationSubscriptionVariables = {
  filter?: ModelSubscriptionInvitationFilterInput | null,
};

export type OnUpdateInvitationSubscription = {
  onUpdateInvitation?:  {
    __typename: "Invitation",
    createdAt: string,
    tenant?:  {
      __typename: "Tenant",
      createdAt: string,
      id: string,
      name?: string | null,
      updatedAt: string,
    } | null,
    tenantId: string,
    token: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTenantSubscriptionVariables = {
  filter?: ModelSubscriptionTenantFilterInput | null,
};

export type OnUpdateTenantSubscription = {
  onUpdateTenant?:  {
    __typename: "Tenant",
    createdAt: string,
    id: string,
    invitations?:  {
      __typename: "ModelInvitationConnection",
      nextToken?: string | null,
    } | null,
    name?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateTodoSubscriptionVariables = {
  filter?: ModelSubscriptionTodoFilterInput | null,
};

export type OnUpdateTodoSubscription = {
  onUpdateTodo?:  {
    __typename: "Todo",
    content?: string | null,
    createdAt: string,
    id: string,
    tenantId: string,
    updatedAt: string,
  } | null,
};
