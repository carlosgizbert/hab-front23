import { useQuery } from 'react-query'

import { getCities } from './api'

import { QUERIES_CONFIG } from '..'

function useGetCitiesByUf(uf: string) {
  return useQuery(['getCitiesUf'], () => getCities(uf), {
    ...QUERIES_CONFIG,
  })
}

export { useGetCitiesByUf }
