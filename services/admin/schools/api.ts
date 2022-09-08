import axios from 'axios'
import { ISchoolQ } from '@/services/app/search/schools/interfaces'
import { ISchoolDTO, ISchoolR } from './interfaces'
import { HEADERS, API_URL } from '../index'

export async function getSchools(params: any): Promise<ISchoolDTO[]> {
  const query = new URLSearchParams({ ...params })
  const response = await axios.get<ISchoolR[]>(`${API_URL}/schools?${query}`, {
    headers: HEADERS,
  })
  const transformed = response.data.map(({ _id, ...s }) => ({ id: _id, ...s }))
  return transformed
}

export async function getSchool(id: string): Promise<ISchoolDTO[]> {
  const response = await axios.get<ISchoolR>(`${API_URL}/schools/`, {
    params: { _id: id },
    headers: HEADERS,
  })
  const transformed: any = response.data
  transformed._id = transformed.id
  return transformed
}

export async function createSchool(
  schoolDto: Omit<ISchoolDTO, 'id'> | Omit<ISchoolDTO[], 'id'>
) {
  const response = axios.post(`${API_URL}/schools`, schoolDto, {
    headers: HEADERS,
  })
  return response
}

export async function updateSchool(schoolDto: ISchoolDTO) {
  const response = axios.patch(
    `${API_URL}/schools/${schoolDto.id}`,
    schoolDto,
    {
      headers: HEADERS,
    }
  )
  return response
}

export async function deleteSchool(id: string) {
  const response = await axios.delete(`${API_URL}/schools/${id}`, {
    headers: HEADERS,
  })
  return response.data
}
