'use client'

import { useContext } from 'react'
import { SupabaseContext } from '../SupabaseContext.js'
import { useCallback } from 'react'
import { useState } from 'react'

export default function () {
  const supabase = useContext(SupabaseContext)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const onResetPassword = useCallback(async function onResetPassword(
    event: any
  ) {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const password = formData.get('password')?.toString()
    if (password) {
      setIsSubmitting(true)
      const { error } = await supabase.auth.resetPasswordForEmail(password, {
        redirectTo: new URL('/reset-password', location.href).toString(),
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
  [])

  return (
    <form onSubmit={onResetPassword}>
      <div className='form-floating mb-2'>
        <input
          type='password'
          className='form-control'
          id='password'
          name='password'
          autoFocus
        />
        <label htmlFor='floatingInput'>New password</label>
      </div>

      <button
        className='btn btn-primary w-100 py-2'
        type='submit'
        disabled={isSubmitting}
      >
        Change password
      </button>
    </form>
  )
}
