import { useQuery } from 'react-query'

import {
  getSchools,
  getSchool,
  getSchoolsByUf,
  getSchoolsByCity,
  getRegionyByLatLong,
} from './api'

import { QUERIES_CONFIG } from '..'
import { ISchoolDTO, ISchoolQ } from './interfaces'

function useGetUserRegion(latitude: string, longitude: string) {
  return useQuery([], () => getRegionyByLatLong(latitude, longitude), {
    enabled: false,
  })
}

function useGetSchools(queryParams: ISchoolQ) {
  return useQuery(['getSchools'], () => getSchools(queryParams), {
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

export {
  useGetSchools,
  useGetSchool,
  useGetSchoolsUf,
  useGetSchoolsByCity,
  useGetUserRegion,
}
