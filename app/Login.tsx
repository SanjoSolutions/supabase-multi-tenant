'use client'

import { useCallback, useContext, useState } from 'react'
import { SupabaseContext } from './SupabaseContext.js'
import Link from 'next/link.js'

export function Login() {
  const supabase = useContext(SupabaseContext)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const onSubmit = useCallback(async function onSubmit(event: any) {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const email = formData.get('email')?.toString()
    const password = formData.get('password')?.toString()
    if (email && password) {
      setIsSubmitting(true)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      setIsSubmitting(false)
    }
  }, [])

  return (
    <form onSubmit={onSubmit}>
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

      <div className='form-floating mb-2'>
        <input
          type='password'
          className='form-control'
          id='password'
          name='password'
          placeholder='Password'
        />
        <label htmlFor='floatingPassword'>Password</label>
      </div>

      <button
        className='btn btn-primary w-100 py-2'
        type='submit'
        disabled={isSubmitting}
      >
        Log in
      </button>

      <div className='mt-2 text-center'>
        <Link href='/request-password-reset-link'>Reset password</Link>
      </div>
    </form>
  )
}
