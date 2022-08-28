import { useQuery } from 'react-query'

import { getSchools, getSchool, getSchoolsByUf, getSchoolsByCity } from './api'

import { QUERIES_CONFIG } from '..'

function useGetSchools() {
  return useQuery(['getSchools'], () => getSchools(), {
    ...QUERIES_CONFIG,
  })
}

function useGetSchoolsUf(uf: string | undefined) {
  return useQuery(['getSchoolsByUf'], () => getSchoolsByUf(uf), {
    ...QUERIES_CONFIG,
  })
}

function useGetSchoolsByCity(city: string | undefined) {
  return useQuery(['getSchoolsByCities'], () => getSchoolsByCity(city), {
    ...QUERIES_CONFIG,
  })
}

function useGetSchool(id: string) {
  return useQuery([], () => getSchool(id))
}

export { useGetSchools, useGetSchool, useGetSchoolsUf, useGetSchoolsByCity }
