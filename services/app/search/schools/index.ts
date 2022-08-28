import { useQuery } from 'react-query'

import { getSchools, getSchool, getSchoolsByUf } from './api'

import { QUERIES_CONFIG } from '..'

function useGetSchools() {
  return useQuery(['getSchools'], () => getSchools(), {
    ...QUERIES_CONFIG,
  })
}

function useGetSchoolsUf(uf: string) {
  return useQuery(['getSchoolsUf'], () => getSchoolsByUf(uf))
}

function useGetSchool(id: string) {
  return useQuery([], () => getSchool(id))
}

export { useGetSchools, useGetSchool, useGetSchoolsUf }
