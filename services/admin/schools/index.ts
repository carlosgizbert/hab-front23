import { useQuery } from 'react-query'

import {
  getSchools,
} from './api'

import { QUERIES_CONFIG } from '..'

function useGetSchools() {
  return useQuery(['getSchools'], () => getSchools(), {
    ...QUERIES_CONFIG,
  })
}

export {
  useGetSchools,
}
