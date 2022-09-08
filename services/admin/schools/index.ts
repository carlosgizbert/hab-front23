import { useMutation, useQuery, useQueryClient } from 'react-query'
import { ISchoolQ } from '@/services/app/search/schools/interfaces'
import { ISchoolDTO } from './interfaces'
import {
  createSchool,
  updateSchool,
  deleteSchool,
  getSchools,
  createMass,
} from './api'

const INVALIDATE_QUERIES: any[] = ['getSchools']

function useGetSchools(params?: ISchoolQ) {
  return useQuery(['getSchools'], () => getSchools(params), {
    refetchOnWindowFocus: false,
  })
}

function useCreateMass(handleOnSuccess: () => void, handleOnError: () => void) {
  const queryClient = useQueryClient()
  return useMutation((school: ISchoolDTO[]) => createMass(school), {
    onSuccess: () => {
      INVALIDATE_QUERIES.map((q) => queryClient.invalidateQueries(q))
      handleOnSuccess()
    },
    onError: () => {
      handleOnError()
    },
  })
}

function useCreateSchool(
  handleOnSuccess: () => void,
  handleOnError: () => void
) {
  const queryClient = useQueryClient()
  return useMutation(
    (school: ISchoolDTO | ISchoolDTO[]) => createSchool(school),
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
  useCreateSchool,
  useUpdateSchool,
  useDeleteSchool,
  useCreateMass,
}
