'use client'

import { useState, useEffect, useContext, useCallback } from 'react'
import '@aws-amplify/ui-react/styles.css'
import { configureAmplify } from './configureAmplify'
import { TenantContext } from './TenantContext.js'
import { createClient } from '@/utils/supabase/client.js'
import { useSession } from './useSession.jsx'
import { Todo } from '@/types.js'

configureAmplify()

export const supabase = createClient()

export default function App() {
  const session = useSession()
  const [todos, setTodos] = useState<Todo[]>([])

  const { tenant } = useContext(TenantContext)

  useEffect(() => {
    async function listTodos() {
      const { data, error } = await supabase
        .from('todos')
        .select()
        .eq('tenant_id', tenant!.id)
      setTodos(data ?? [])
    }

    if (tenant) {
      listTodos()

      const subscription = supabase
        .channel('todos')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'todos' },
          function (payload) {
            if (payload.eventType === 'INSERT' && payload.new) {
              setTodos(todos => [...todos, payload.new as Todo])
            }
          }
        )
        .subscribe()
      return () => subscription.unsubscribe()
    } else {
      return () => {}
    }
  }, [tenant])

  const createTodo = useCallback(
    async function createTodo() {
      if (tenant) {
        const content = window.prompt('Todo content')
        const { data, error } = await supabase.from('todos').insert({
          tenant_id: tenant.id,
          content,
        })
      }
    },
    [tenant]
  )

  return session?.user ? (
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
  ) : (
    <div className='alert alert-info'>Please log in.</div>
  )
}
