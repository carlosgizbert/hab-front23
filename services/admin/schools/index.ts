import { useMutation, useQuery, useQueryClient } from 'react-query'

import {
  createSchool,
  updateSchool,
  deleteSchool,
  getSchools,
} from './api'

import { QUERIES_CONFIG } from '..'
import { ISchool } from './interfaces'

const INVALIDATE_QUERIES: any[] = ['getSchools']

function useGetSchools(id = '') {
  return useQuery(['getSchools'], () => getSchools(id), {
    ...QUERIES_CONFIG,
  })
}


function useCreateSchool(
  handleOnSuccess: () => void,
  handleOnError: () => void
) {
  const queryClient = useQueryClient()
  return useMutation((school: ISchool) => createSchool(school), {
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
  return useMutation(
    (school: ISchool) => updateSchool(school),
    {
      onSuccess: () => {
        INVALIDATE_QUERIES.map((q) => queryClient.invalidateQueries(q))
        handleOnSuccess()
      },
      onError: () => {
        handleOnError()
      },
    }
  )
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
  useUpdateSchool,
  useDeleteSchool,
}
