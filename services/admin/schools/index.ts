import { useMutation, useQuery, useQueryClient } from 'react-query'

import {
  createSchool,
  updateSchool,
  deleteSchool,
  getSchools,
  getSchool,
} from './api'

import { QUERIES_CONFIG } from '..'
import { ISchoolDTO } from './interfaces'

const INVALIDATE_QUERIES: any[] = ['getSchools']

function useGetSchools() {
  return useQuery(['getSchools'], () => getSchools(), {
    ...QUERIES_CONFIG,
  })
}

function useGetSchool(id: string) {
  return useQuery([], () => getSchool(id))
}

function useCreateSchool(
  handleOnSuccess: () => void,
  handleOnError: () => void
) {
  const queryClient = useQueryClient()
  return useMutation((school: ISchoolDTO) => createSchool(school), {
    onSuccess: () => {
      INVALIDATE_QUERIES.map((q) => queryClient.invalidateQueries(q))
      handleOnSuccess()
    },
    onError: () => {
      handleOnError()
    },
  })
}

function useUpdateSchool(
  handleOnSuccess: () => void,
  handleOnError: () => void
) {
  const queryClient = useQueryClient()
  return useMutation((school: ISchoolDTO) => updateSchool(school), {
    onSuccess: () => {
      INVALIDATE_QUERIES.map((q) => queryClient.invalidateQueries(q))
      handleOnSuccess()
    },
    onError: () => {
      handleOnError()
    },
  })
}

function useDeleteSchool(
  id: string,
  handleOnSuccess: () => void,
  handleOnError: () => void
) {
  const queryClient = useQueryClient()
  return useMutation(() => deleteSchool(id), {
    onSuccess: () => {
      INVALIDATE_QUERIES.map((q) => queryClient.invalidateQueries(q))
      handleOnSuccess()
    },
    onError: () => {
      handleOnError()
    },
  })
}

export {
  useGetSchools,
  useGetSchool,
  useCreateSchool,
  useUpdateSchool,
  useDeleteSchool,
}
