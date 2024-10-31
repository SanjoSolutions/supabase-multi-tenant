export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
}

export function supportBrowsers(
  fn: (_request: Request) => Promise<Response>
): (_request: Request) => Promise<Response> {
  return async function (_request: Request): Promise<Response> {
    if (_request.method === 'OPTIONS') {
      return new Response('ok', { headers: corsHeaders })
    } else {
      try {
        const response = await fn(_request)
        for (const [headerName, headerValue] of Object.entries(corsHeaders)) {
          if (!response.headers.has(headerName)) {
            response.headers.set(headerName, headerValue)
          }
        }
        return response
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        })
      }
    }
  }
}
