'use client'

import { User } from '@/types.js'
import { useEffect } from 'react'
import { useState } from 'react'
import { SupabaseContext } from '../SupabaseContext.js'
import { useContext } from 'react'

export default function () {
  const supabase = useContext(SupabaseContext)
  const [members, setMembers] = useState<
    Pick<User, 'id' | 'raw_user_meta_data'>[] | null
  >(null)

  useEffect(function () {
    async function f() {
      const { data: members } = await supabase
        .schema('auth')
        .from('users')
        .select('id, raw_user_meta_data')
      setMembers(members)
    }

    f()
  }, [])

  return (
    <table className='table'>
      <thead>
        <tr>
          <th scope='col'>Name</th>
        </tr>
      </thead>
      <tbody>
        {members?.map(member => (
          <tr>
            <td>
              {(member.raw_user_meta_data as any)?.display_name ||
                `User ${member.id}`}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
