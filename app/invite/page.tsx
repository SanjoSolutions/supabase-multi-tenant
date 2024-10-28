'use client'

import { useCallback } from 'react'
import { configureAmplify } from '@/app/configureAmplify'
import { generateClient } from '@/app/generateClient'

configureAmplify()

const client = generateClient()

export default function () {
  const onSubmit = useCallback(async function onSubmit(event: any) {
    event.preventDefault()

    const form = event.target
    const formData = new FormData(form)
    const email = formData.get('email')?.toString()!
    const response = await (
      await client
    ).mutations.invite({
      email,
    })
    console.log('response', response)
  }, [])

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>
          Email
          <br />
          <input name='email' type='email' autoFocus />
        </label>
      </div>

      <div style={{ marginTop: '0.5rem' }}>
        <button type='submit'>Invite</button>
      </div>
    </form>
  )
}
