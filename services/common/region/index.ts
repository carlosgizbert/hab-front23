import { useQuery } from 'react-query'
import { getRegionByCep } from './api'

function useGetRagionByCep(cep: number) {
  return useQuery(['getRegion'], () => getRegionByCep(cep), {
    refetchOnWindowFocus: true,
    enabled: false,
  })
}

export { useGetRagionByCep }
