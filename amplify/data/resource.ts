import { type ClientSchema, a, defineData } from '@aws-amplify/backend'
import { postConfirmation } from '../auth/post-confirmation/resource.js'
import { invite } from './invite/resource.js'
import { authorize } from './authorize/resource.js'

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
    Invitation: a
      .model({
        tenantId: a.string().required(),
        token: a.string().required(),
        tenant: a.belongsTo('Tenant', 'tenantId'),
      })
      .identifier(['token'])
      .authorization(allow => [allow.custom()]),
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
        email: a.email().required(),
      })
      .handler(a.handler.function(invite).async())
      .authorization(allow => [allow.group('Admins')]),
  })
  .authorization(allow => [allow.resource(postConfirmation)])

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
