export const API_URL = process.env.URL_API || 'https://hab-api23.herokuapp.com'

export const HEADERS = { "Access-Control-Allow-Origin": "*" }

export const QUERIES_CONFIG = {
  staleTime: 120000,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  retry: 1,
  retryDelay: 3000,
}
