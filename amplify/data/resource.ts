import { type ClientSchema, a, defineData } from '@aws-amplify/backend'
import { postConfirmation } from '../auth/post-confirmation/resource.js'
import { invite } from './invite/resource.js'
import { authorize } from './authorize/resource.js'
import { joinTenant } from './joinTenant/resource.js'
import { createAndJoinTenant } from './createAndJoinTenant/resource.js'
import { retrieveUserTenantIds } from './retrieveUserTenantIds/resource.js'

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a
  .schema({
    Tenant: a
      .model({
        name: a.string(),
        invitations: a.hasMany('Invitation', 'tenantId'),
      })
      .authorization(allow => [allow.custom()]),

    MembershipRoles: a
      .model({
        userId: a.id().required(),
        tenantId: a.id().required(),
        roles: a.string().array().required(),
      })
      .identifier(['userId', 'tenantId'])
      .authorization(allow => [allow.ownerDefinedIn('userId').to(['read'])]),

    Invitation: a
      .model({
        tenantId: a.id().required(),
        tenant: a.belongsTo('Tenant', 'tenantId'),
        email: a.email().required(),
        token: a.string().required(),
      })
      .identifier(['token'])
      .authorization(allow => [
        allow.custom(),
        allow.publicApiKey().to(['read']),
      ]),

    Todo: a
      .model({
        tenantId: a.id().required(),
        id: a.id().required(),
        content: a.string(),
      })
      .identifier(['tenantId', 'id'])
      .authorization(allow => [allow.custom()]),

    invite: a
      .mutation()
      .arguments({
        tenantId: a.id().required(),
        email: a.email().required(),
      })
      .returns(a.boolean().required())
      .handler(a.handler.function(invite))
      .authorization(allow => [allow.custom()]),

    createAndJoinTenant: a
      .mutation()
      .handler(a.handler.function(createAndJoinTenant))
      .authorization(allow => [allow.authenticated()])
      .returns(a.id().required()),

    joinTenant: a
      .mutation()
      .arguments({ token: a.id().required() })
      .returns(a.integer().required())
      .handler(a.handler.function(joinTenant))
      .authorization(allow => [allow.authenticated()]),

    addRoleToUser: a
      .mutation()
      .arguments({
        userId: a.id().required(),
        tenantId: a.id().required(),
        role: a.string().required(),
      })
      .returns(a.boolean().required())
      .handler(
        a.handler.custom({
          dataSource: a.ref('User'),
          entry: './addRoleToUser.js',
        })
      )
      .authorization(allow => [allow.custom()]),

    retrieveUserTenantIds: a
      .query()
      .returns(a.string().required().array().required())
      .handler(a.handler.function(retrieveUserTenantIds))
      .authorization(allow => [allow.authenticated()]),
  })
  .authorization(allow => [
    allow.resource(postConfirmation),
    allow.resource(invite),
    allow.resource(createAndJoinTenant),
    allow.resource(joinTenant),
  ])

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'lambda',
    lambdaAuthorizationMode: {
      function: authorize,
      timeToLiveInSeconds: 0,
    },
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
})

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
