import { useMutation, useQuery, useQueryClient } from 'react-query'

import {
  createSchool,
  deleteSchool,
  getSchools,
} from './api'

import { QUERIES_CONFIG } from '..'
import { ISchool } from './interfaces'

const INVALIDATE_QUERIES: any[] = ['getSchools']

function useGetSchools() {
  return useQuery(['getSchools'], () => getSchools(), {
    ...QUERIES_CONFIG,
  })
}


function useCreateSchool(
  school: Omit<ISchool, 'id'>,
  handleOnSuccess: () => void,
  handleOnError: () => void
) {
  const queryClient = useQueryClient()
  return useMutation(() => createSchool(school), {
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
  useCreateSchool,
  useDeleteSchool,
}
