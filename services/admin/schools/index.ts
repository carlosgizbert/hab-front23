import { useMutation, useQuery, useQueryClient } from 'react-query'
import { ISchoolQ } from '@/services/app/search/schools/interfaces'
import { ISchoolDTO } from './interfaces'
import { createSchool, updateSchool, deleteSchool, getSchools } from './api'

const INVALIDATE_QUERIES: any[] = ['getSchools']

function useGetSchools(params?: ISchoolQ) {
  return useQuery(['getSchools'], () => getSchools(params), {
    refetchOnWindowFocus: false,
    enabled: false,
  })
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

export { useGetSchools, useCreateSchool, useUpdateSchool, useDeleteSchool }
