'use client'

import { useState, useEffect, useContext, useCallback } from 'react'
import '@aws-amplify/ui-react/styles.css'
import { configureAmplify } from './configureAmplify'
import { TenantContext } from './TenantContext.js'
import { Todo } from '@/types.js'
import { SupabaseContext } from './SupabaseContext.js'
import { RequiresLogin } from './RequiresLogin.jsx'

configureAmplify()

export default function App() {
  const supabase = useContext(SupabaseContext)
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

  return (
    <RequiresLogin>
      <main>
        <h1>Todos</h1>
        <button className='btn btn-primary' onClick={createTodo}>
          Create new todo
        </button>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>{todo.content}</li>
          ))}
        </ul>
      </main>
    </RequiresLogin>
  )
}
