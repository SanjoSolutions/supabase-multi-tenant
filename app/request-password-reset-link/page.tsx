'use client'

import { useCallback, useContext, useState } from 'react'
import { SupabaseContext } from '../SupabaseContext.js'

export default function ResetPassword() {
  const supabase = useContext(SupabaseContext)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [hasRequestBeenProcessed, setHasRequestBeenProcessed] =
    useState<boolean>(false)
  const [wasThereAnError, setWasThereAnError] = useState<boolean>(false)

  const onRequestPasswordResetLink = useCallback(
    async function onRequestPasswordResetLink(event: any) {
      event.preventDefault()
      const form = event.target
      const formData = new FormData(form)
      const email = formData.get('email')?.toString()
      if (email) {
        setIsSubmitting(true)
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: new URL('/change-password', location.href).toString(),
        })
        setIsSubmitting(false)
        if (error) {
          setWasThereAnError(true)
          setHasRequestBeenProcessed(false)
        } else {
          setHasRequestBeenProcessed(true)
          setWasThereAnError(false)
        }
      }
    },
    []
  )

  return (
    <div className='row h-100 justify-content-center align-items-center'>
      <div className='col col-md-3'>
        {hasRequestBeenProcessed ? (
          <div className='alert alert-success'>
            The request has been processed by the backend. Please check your
            email inbox for the email with the password reset link.
          </div>
        ) : (
          <>
            {wasThereAnError && (
              <div className='alert alert-danger mb-2'>There was an error.</div>
            )}
            <form onSubmit={onRequestPasswordResetLink}>
              <div className='form-floating mb-2'>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  name='email'
                  placeholder='name@example.com'
                  autoFocus
                />
                <label htmlFor='floatingInput'>Email address</label>
              </div>

              <button
                className='btn btn-primary w-100 py-2'
                type='submit'
                disabled={isSubmitting}
              >
                Request password reset link
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
