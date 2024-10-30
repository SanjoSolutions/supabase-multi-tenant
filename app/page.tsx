'use client'

import { useState, useEffect, useContext, useCallback } from 'react'
import { generateClient } from '@/app/generateClient'
import type { Schema } from '@/amplify/data/resource'
import '@aws-amplify/ui-react/styles.css'
import { Authenticator } from '@aws-amplify/ui-react'
import { configureAmplify } from './configureAmplify'
import { TenantIdContext } from './TenantIdContext.js'
import { Subscription } from 'rxjs'

configureAmplify()

const clientPromise = generateClient()

export default function App() {
  const [todos, setTodos] = useState<Array<Schema['Todo']['type']>>([])

  const { tenantId } = useContext(TenantIdContext)

  useEffect(() => {
    let subscription: Subscription | null = null

    async function listTodos() {
      const client = await clientPromise
      subscription = client.models.Todo.observeQuery({
        filter: {
          tenantId: { eq: tenantId },
        },
      }).subscribe({
        next: data => {
          setTodos([...data.items])
        },
      })
      return () => subscription?.unsubscribe()
    }

    listTodos()
  }, [tenantId])

  const createTodo = useCallback(
    async function createTodo() {
      if (tenantId) {
        const content = window.prompt('Todo content')
        const client = await clientPromise
        client.models.Todo.create({
          tenantId,
          id: crypto.randomUUID(),
          content,
        })
      }
    },
    [tenantId]
  )

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
