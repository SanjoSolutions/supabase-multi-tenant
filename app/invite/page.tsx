'use client'

import { useCallback, useContext } from 'react'
import { configureAmplify } from '@/app/configureAmplify'
import { TenantContext } from '../TenantContext.js'
import { SupabaseContext } from '../SupabaseContext.js'
import { RequiresLogin } from '../RequiresLogin.jsx'
import { useState } from 'react'
import { ShowLoading } from '../ShowLoading.jsx'

configureAmplify()

export default function () {
  const supabase = useContext(SupabaseContext)
  const { hasTenantIdBeenInitialized, tenantId } = useContext(TenantContext)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [hasInvited, setHasInvited] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = useCallback(
    async function onSubmit(event: any) {
      event.preventDefault()

      setIsSubmitting(true)
      const form = event.target
      const formData = new FormData(form)
      const email = formData.get('email')?.toString()!
      const { error } = await supabase.functions.invoke('invite', {
        body: {
          tenantId,
          email,
        },
      })
      setError(error)
      setHasInvited(!error)
      setIsSubmitting(false)
    },
    [tenantId]
  )

  return (
    <RequiresLogin>
      <ShowLoading until={hasTenantIdBeenInitialized}>
        <form className='h-100' onSubmit={onSubmit}>
          <div className='row h-100 align-items-center justify-content-center'>
            <div className='col col-md-3'>
              {error && renderError()}

              {hasInvited
                ? renderInvitationHasBeenSent()
                : tenantId
                ? renderForm({ isSubmitting })
                : renderPleaseSelectTenantFirst()}
            </div>
          </div>
        </form>
      </ShowLoading>
    </RequiresLogin>
  )
}

function renderError() {
  return <div className='alert alert-danger'>There was an error.</div>
}

function renderInvitationHasBeenSent() {
  return <div className='alert alert-success'>Invitation was sent.</div>
}

function renderPleaseSelectTenantFirst() {
  return <div className='alert alert-info'>Please select a tenant first.</div>
}

function renderForm({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <div className='input-group'>
      <div className='form-floating'>
        <input
          className='form-control'
          id='email'
          name='email'
          type='email'
          autoFocus
        />
        <label htmlFor='email'>Email</label>
      </div>

      <button className='btn btn-primary' type='submit' disabled={isSubmitting}>
        Invite
      </button>
    </div>
  )
}
