import { useQuery } from 'react-query'

import { getSchools, getSchool, getSchoolsByUf, getSchoolsByCity } from './api'

import { QUERIES_CONFIG } from '..'

function useGetSchools() {
  return useQuery(['getSchools'], () => getSchools(), {
    ...QUERIES_CONFIG,
  })
}

function useGetSchoolsUf(uf: string) {
  return useQuery(['getSchoolsByUf'], () => getSchoolsByUf(uf), {
    ...QUERIES_CONFIG,
    enabled: false,
  })
}

function useGetSchoolsByCity() {
  return useQuery(['getSchoolsByCities'], () => getSchoolsByCity(), {
    ...QUERIES_CONFIG,
    enabled: false,
  })
}

function useGetSchool(id: string) {
  return useQuery([], () => getSchool(id))
}

export { useGetSchools, useGetSchool, useGetSchoolsUf, useGetSchoolsByCity }
