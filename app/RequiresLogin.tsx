'use client'

import { ShowLoading } from './ShowLoading.jsx'
import { Login } from './Login.jsx'
import { useSession } from './useSession.jsx'

export function RequiresLogin({ children }: { children: React.ReactNode }) {
  const { session, isLoading } = useSession()

  return (
    <ShowLoading while={isLoading}>
      {session?.user ? (
        children
      ) : (
        <div className='row justify-content-center'>
          <div className='col-md-3'>
            <Login />
          </div>
        </div>
      )}
    </ShowLoading>
  )
}
