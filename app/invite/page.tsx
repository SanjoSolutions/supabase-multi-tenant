'use client'

import { useCallback, useContext } from 'react'
import { configureAmplify } from '@/app/configureAmplify'
import { TenantContext } from '../TenantContext.js'
import { SupabaseContext } from '../SupabaseContext.js'

configureAmplify()

export default function () {
  const supabase = useContext(SupabaseContext)
  const { tenant: tenant } = useContext(TenantContext)

  const onSubmit = useCallback(async function onSubmit(event: any) {
    event.preventDefault()

    const form = event.target
    const formData = new FormData(form)
    const email = formData.get('email')?.toString()!
    const { data, error } = await supabase.functions.invoke('invite', {
      body: {
        tenantId: tenant!.id,
        email,
      },
    })
    if (!error) {
    }
  }, [])

  return tenant ? (
    <form onSubmit={onSubmit}>
      <div>
        <label>
          Email
          <br />
          <input className='form-control' name='email' type='email' autoFocus />
        </label>
      </div>

      <div style={{ marginTop: '0.5rem' }}>
        <button className='btn btn-primary' type='submit'>
          Invite
        </button>
      </div>
    </form>
  ) : (
    <div className='alert alert-info'>Please select a tenant first.</div>
  )
}
