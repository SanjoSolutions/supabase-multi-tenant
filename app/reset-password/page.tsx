'use client'

import { useCallback, useContext, useState } from 'react'
import { SupabaseContext } from '../SupabaseContext.js'

export default function ResetPassword() {
  const supabase = useContext(SupabaseContext)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const onResetPassword = useCallback(async function onResetPassword(
    event: any
  ) {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const email = formData.get('email')?.toString()
    if (email) {
      setIsSubmitting(true)
      const { data, error } = await supabase.auth.resetPasswordForEmail(email)
      setIsSubmitting(false)
    }
  },
  [])

  return (
    <div className='row h-100 justify-content-center align-items-center'>
      <div className='col col-md-3'>
        <form onSubmit={onResetPassword}>
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
            Reset password
          </button>
        </form>
      </div>
    </div>
  )
}
