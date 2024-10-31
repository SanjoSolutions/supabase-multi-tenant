// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { supportBrowsers } from '../_shared/cors.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { Database } from '../../../database.types.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const handler = supportBrowsers(async function (_request) {
  const { tenantId, email } = await _request.json()

  const supabase = createClient<Database>(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    {
      global: {
        headers: { Authorization: _request.headers.get('Authorization')! },
      },
    }
  )

  const { data, error } = await supabase.from('invitations').insert({
    tenant_id: tenantId,
    email,
  })

  // const invitationUrl = `http://localhost:3001/invitation/${result.data.createInvitation.token}`

  // const res = await fetch('https://api.resend.com/emails', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${RESEND_API_KEY}`,
  //   },
  //   body: JSON.stringify({
  //     from: Deno.env.get('FROM_EMAIL'),
  //     to: email,
  //     subject: 'Invitation',
  //     text: `You have been invited: ${invitationUrl}`,
  //     html: `You have been invited: <a href="${invitationUrl}" target="_blank">open invitation</a>`,
  //   }),
  // })

  // const data = await res.json()

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
})

Deno.serve(handler)

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/invite' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
