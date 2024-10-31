'use client'

import { useCallback, useContext, useEffect, useState } from 'react'
import { JoinResult } from '../JoinResult.js'
import { RequiresLogin } from '@/app/RequiresLogin.jsx'
import { SupabaseContext } from '@/app/SupabaseContext.js'
import { ShowLoading } from '@/app/ShowLoading.jsx'

export default function ({ params: { token } }: { params: { token: string } }) {
  const supabase = useContext(SupabaseContext)
  const [isOpenInvitation, setIsOpenInvitation] = useState<boolean | null>(null)
  const [isAlreadyMemberOfTenant, setIsAlreadyMemberOfTenant] = useState<
    boolean | null
  >(null)
  const [isRequesting, setIsRequesting] = useState<boolean>(false)
  const [joinResult, setJoinResult] = useState<JoinResult | null>(null)

  useEffect(function () {
    async function request() {
      const { data: isOpenInvitation } = await supabase.rpc(
        'is_open_invitation',
        {
          token,
        }
      )

      setIsOpenInvitation(isOpenInvitation)
    }

    request()
  }, [])

  useEffect(function () {
    async function request() {
      const { data: isAlreadyMemberOfTenant } = await supabase.rpc(
        'is_already_member_of_tenant',
        {
          token,
        }
      )

      setIsAlreadyMemberOfTenant(isAlreadyMemberOfTenant)
    }

    request()
  }, [])

  const join = useCallback(async function join() {
    setIsRequesting(true)
    const { error } = await await supabase.rpc('join_tenant', {
      token,
    })
    setIsRequesting(false)
    setJoinResult(error ? JoinResult.HasFailed : JoinResult.HasJoined)
  }, [])

  return (
    <ShowLoading
      while={isOpenInvitation === null || isAlreadyMemberOfTenant === null}
    >
      <div className='d-flex h-100 flex-column justify-content-center align-items-center'>
        {isAlreadyMemberOfTenant ? (
          <div className='alert alert-info'>
            You are already member of the tenant.
          </div>
        ) : isOpenInvitation ? (
          <RequiresLogin>
            {isRequesting ? (
              <div>Requesting...</div>
            ) : joinResult !== null ? (
              renderJoinResult(joinResult)
            ) : (
              isOpenInvitation && (
                <button className='btn btn-primary' onClick={join}>
                  Join the tenant
                </button>
              )
            )}
          </RequiresLogin>
        ) : (
          <div className='alert alert-info'>
            The invitation is no longer open or the token is invalid.
          </div>
        )}
      </div>
    </ShowLoading>
  )
}

function renderJoinResult(joinResult: JoinResult) {
  switch (joinResult) {
    case JoinResult.HasJoined:
      return (
        <div className='alert alert-success'>You were added to the tenant.</div>
      )
    case JoinResult.HasFailed:
      return (
        <div className='alert alert-danger'>Failed to join the tenant.</div>
      )
  }
}
