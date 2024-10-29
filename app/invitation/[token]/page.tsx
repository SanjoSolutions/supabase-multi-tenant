'use client'

import { configureAmplify } from '@/app/configureAmplify'
import { generateClient } from '@/app/generateAPIKeyAuthClient'
import { Authenticator } from '@aws-amplify/ui-react'
import { useCallback, useEffect, useState } from 'react'
import type { Schema } from '@/amplify/data/resource'
import { JoinResult } from '../JoinResult.js'

type Invitation = Schema['Invitation']['type']

configureAmplify()
const client = generateClient()

export default function ({ params: { token } }: { params: { token: string } }) {
  const [invitation, setInvitation] = useState<Invitation | null>(null)
  const [isRequesting, setIsRequesting] = useState<boolean>(false)
  const [joinResult, setJoinResult] = useState<JoinResult | null>(null)

  useEffect(function () {
    async function request() {
      const response = await client.models.Invitation.get({ token })
      setInvitation(response.data)
    }

    request()
  }, [])

  const join = useCallback(
    async function join() {
      setIsRequesting(true)
      const result = await client.mutations.joinTenant(
        {
          token: invitation!.token,
        },
        {
          authMode: 'userPool',
        }
      )
      console.log('result', result)
      setIsRequesting(false)
      setJoinResult(result.data)
    },
    [invitation]
  )

  return (
    <Authenticator>
      {({ signOut, user }) =>
        isRequesting ? (
          <div>Requesting...</div>
        ) : joinResult !== null ? (
          renderJoinResult(joinResult)
        ) : (
          invitation && <button onClick={join}>Join the tenant</button>
        )
      }
    </Authenticator>
  )
}

function renderJoinResult(joinResult: JoinResult) {
  switch (joinResult) {
    case JoinResult.HasJoined:
      return <div>You were added to the tenant.</div>
    case JoinResult.WasAlreadyMember:
      return <div>You were already member of the tenant.</div>
    case JoinResult.HasFailed:
      return <div>Failed to join the tenant.</div>
  }
}
