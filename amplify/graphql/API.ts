/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Invitation = {
  __typename: "Invitation",
  createdAt: string,
  email: string,
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

export type MembershipRoles = {
  __typename: "MembershipRoles",
  createdAt: string,
  roles: Array< string | null >,
  tenantId: string,
  updatedAt: string,
  userId: string,
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
  email?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelInvitationFilterInput | null,
  or?: Array< ModelInvitationFilterInput | null > | null,
  tenantId?: ModelIDInput | null,
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


export type ModelMembershipRolesFilterInput = {
  and?: Array< ModelMembershipRolesFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelMembershipRolesFilterInput | null,
  or?: Array< ModelMembershipRolesFilterInput | null > | null,
  roles?: ModelStringInput | null,
  tenantId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelIDInput | null,
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

export type ModelMembershipRolesConnection = {
  __typename: "ModelMembershipRolesConnection",
  items:  Array<MembershipRoles | null >,
  nextToken?: string | null,
};

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

export type ModelTodoConnection = {
  __typename: "ModelTodoConnection",
  items:  Array<Todo | null >,
  nextToken?: string | null,
};

export type ModelInvitationConditionInput = {
  and?: Array< ModelInvitationConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  email?: ModelStringInput | null,
  not?: ModelInvitationConditionInput | null,
  or?: Array< ModelInvitationConditionInput | null > | null,
  tenantId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateInvitationInput = {
  email: string,
  tenantId: string,
  token: string,
};

export type ModelMembershipRolesConditionInput = {
  and?: Array< ModelMembershipRolesConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  not?: ModelMembershipRolesConditionInput | null,
  or?: Array< ModelMembershipRolesConditionInput | null > | null,
  roles?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelStringInput | null,
};

export type CreateMembershipRolesInput = {
  roles: Array< string | null >,
  tenantId: string,
  userId: string,
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

export type DeleteMembershipRolesInput = {
  tenantId: string,
  userId: string,
};

export type DeleteTenantInput = {
  id: string,
};

export type DeleteTodoInput = {
  id: string,
  tenantId: string,
};

export type UpdateInvitationInput = {
  email?: string | null,
  tenantId?: string | null,
  token: string,
};

export type UpdateMembershipRolesInput = {
  roles?: Array< string | null > | null,
  tenantId: string,
  userId: string,
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
  email?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionInvitationFilterInput | null > | null,
  tenantId?: ModelSubscriptionIDInput | null,
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

export type ModelSubscriptionMembershipRolesFilterInput = {
  and?: Array< ModelSubscriptionMembershipRolesFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionMembershipRolesFilterInput | null > | null,
  roles?: ModelSubscriptionStringInput | null,
  tenantId?: ModelSubscriptionIDInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userId?: ModelStringInput | null,
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
    email: string,
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

export type GetMembershipRolesQueryVariables = {
  tenantId: string,
  userId: string,
};

export type GetMembershipRolesQuery = {
  getMembershipRoles?:  {
    __typename: "MembershipRoles",
    createdAt: string,
    roles: Array< string | null >,
    tenantId: string,
    updatedAt: string,
    userId: string,
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
      email: string,
      tenantId: string,
      token: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListMembershipRolesQueryVariables = {
  filter?: ModelMembershipRolesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
  tenantId?: ModelIDKeyConditionInput | null,
  userId?: string | null,
};

export type ListMembershipRolesQuery = {
  listMembershipRoles?:  {
    __typename: "ModelMembershipRolesConnection",
    items:  Array< {
      __typename: "MembershipRoles",
      createdAt: string,
      roles: Array< string | null >,
      tenantId: string,
      updatedAt: string,
      userId: string,
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

export type AddRoleToUserMutationVariables = {
  role: string,
  tenantId: string,
  userId: string,
};

export type AddRoleToUserMutation = {
  addRoleToUser: boolean,
};

export type CreateAndJoinTenantMutationVariables = {
};

export type CreateAndJoinTenantMutation = {
  createAndJoinTenant: string,
};

export type CreateInvitationMutationVariables = {
  condition?: ModelInvitationConditionInput | null,
  input: CreateInvitationInput,
};

export type CreateInvitationMutation = {
  createInvitation?:  {
    __typename: "Invitation",
    createdAt: string,
    email: string,
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

export type CreateMembershipRolesMutationVariables = {
  condition?: ModelMembershipRolesConditionInput | null,
  input: CreateMembershipRolesInput,
};

export type CreateMembershipRolesMutation = {
  createMembershipRoles?:  {
    __typename: "MembershipRoles",
    createdAt: string,
    roles: Array< string | null >,
    tenantId: string,
    updatedAt: string,
    userId: string,
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
    email: string,
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

export type DeleteMembershipRolesMutationVariables = {
  condition?: ModelMembershipRolesConditionInput | null,
  input: DeleteMembershipRolesInput,
};

export type DeleteMembershipRolesMutation = {
  deleteMembershipRoles?:  {
    __typename: "MembershipRoles",
    createdAt: string,
    roles: Array< string | null >,
    tenantId: string,
    updatedAt: string,
    userId: string,
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
  tenantId: string,
};

export type InviteMutation = {
  invite: boolean,
};

export type JoinTenantMutationVariables = {
  token: string,
};

export type JoinTenantMutation = {
  joinTenant: number,
};

export type UpdateInvitationMutationVariables = {
  condition?: ModelInvitationConditionInput | null,
  input: UpdateInvitationInput,
};

export type UpdateInvitationMutation = {
  updateInvitation?:  {
    __typename: "Invitation",
    createdAt: string,
    email: string,
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

export type UpdateMembershipRolesMutationVariables = {
  condition?: ModelMembershipRolesConditionInput | null,
  input: UpdateMembershipRolesInput,
};

export type UpdateMembershipRolesMutation = {
  updateMembershipRoles?:  {
    __typename: "MembershipRoles",
    createdAt: string,
    roles: Array< string | null >,
    tenantId: string,
    updatedAt: string,
    userId: string,
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
    email: string,
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

export type OnCreateMembershipRolesSubscriptionVariables = {
  filter?: ModelSubscriptionMembershipRolesFilterInput | null,
  userId?: string | null,
};

export type OnCreateMembershipRolesSubscription = {
  onCreateMembershipRoles?:  {
    __typename: "MembershipRoles",
    createdAt: string,
    roles: Array< string | null >,
    tenantId: string,
    updatedAt: string,
    userId: string,
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
    email: string,
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

export type OnDeleteMembershipRolesSubscriptionVariables = {
  filter?: ModelSubscriptionMembershipRolesFilterInput | null,
  userId?: string | null,
};

export type OnDeleteMembershipRolesSubscription = {
  onDeleteMembershipRoles?:  {
    __typename: "MembershipRoles",
    createdAt: string,
    roles: Array< string | null >,
    tenantId: string,
    updatedAt: string,
    userId: string,
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
    email: string,
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

export type OnUpdateMembershipRolesSubscriptionVariables = {
  filter?: ModelSubscriptionMembershipRolesFilterInput | null,
  userId?: string | null,
};

export type OnUpdateMembershipRolesSubscription = {
  onUpdateMembershipRoles?:  {
    __typename: "MembershipRoles",
    createdAt: string,
    roles: Array< string | null >,
    tenantId: string,
    updatedAt: string,
    userId: string,
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
