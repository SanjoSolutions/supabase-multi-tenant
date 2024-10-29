'use client'

import { useState, useEffect } from 'react'
import { generateClient } from '@/app/generateClient'
import type { Schema } from '@/amplify/data/resource'
import '@aws-amplify/ui-react/styles.css'
import { Authenticator } from '@aws-amplify/ui-react'
import { configureAmplify } from './configureAmplify'
import { retrieveFirstTenantID } from './retrieveFirstTenantID'

configureAmplify()

const client = generateClient()

export default function App() {
  const [todos, setTodos] = useState<Array<Schema['Todo']['type']>>([])

  useEffect(() => {
    async function listTodos() {
      ;(await client).models.Todo.observeQuery({
        filter: {
          tenantId: { eq: await retrieveFirstTenantID() },
        },
      }).subscribe({
        next: data => {
          setTodos([...data.items])
        },
      })
    }

    listTodos()
  }, [])

  async function createTodo() {
    const content = window.prompt('Todo content')
    ;(await client).models.Todo.create({
      tenantId: await retrieveFirstTenantID(),
      id: crypto.randomUUID(),
      content,
    })
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>My todos</h1>
          <button onClick={createTodo}>+ new</button>
          <ul>
            {todos.map(todo => (
              <li key={todo.id}>{todo.content}</li>
            ))}
          </ul>
          <div>
            🥳 App successfully hosted. Try creating a new todo.
            <br />
            <a href='https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/'>
              Review next steps of this tutorial.
            </a>
          </div>
        </main>
      )}
    </Authenticator>
  )
}
