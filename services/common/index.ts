export const STATIC_API =
  process.env.NEXT_URL_API || 'http://localhost:3000/api'

export const HEADERS = { 'Access-Control-Allow-Origin': '*' }

export const QUERIES_CONFIG = {
  staleTime: 120000,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  retry: 1,
  retryDelay: 3000,
}
