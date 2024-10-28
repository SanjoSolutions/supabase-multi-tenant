'use client'

import { Amplify } from 'aws-amplify'
import outputs from '@/amplify_outputs.json'
import { fetchAuthSession } from 'aws-amplify/auth'

export function configureAmplify() {
  Amplify.configure(outputs, {
    // API: {
    //   GraphQL: {
    //     async headers() {
    //       const session = await fetchAuthSession()
    //       return {
    //         Authorization: session.tokens?.idToken?.toString()!,
    //       }
    //     },
    //   },
    //   REST: {
    //     async headers() {
    //       const session = await fetchAuthSession()
    //       return {
    //         Authorization: session.tokens?.idToken?.toString()!,
    //       }
    //     },
    //   },
    // },
  })
}
