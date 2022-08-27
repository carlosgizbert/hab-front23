import { HEADERS } from '../index';
import axios from 'axios'

import { ISchoolDTO, ISchoolR } from './interfaces'

import { API_URL } from '..'

export async function getSchools() {
  const response = await axios.get<ISchoolR[]>(`${API_URL}/schools`, {
    headers: HEADERS
  }
  )

  const transformed = response.data.map(({ _id, ...s }) => ({ id: _id, ...s }));

  return transformed
}

export async function getSchool(id: string) {
  console.log(id)
  const response = await axios.get<ISchoolR>(`${API_URL}/schools/${id}`, {
    headers: HEADERS
  }
  )

  const transformed = response.data
  transformed['_id'] = transformed['id']
  console.log(transformed)
  return transformed
}

export async function createSchool(schoolDto: Omit<ISchoolDTO, 'id'>) {
  const response = axios.post(`${API_URL}/schools`, schoolDto, {
    headers: HEADERS,
  })
  return response
}

export async function updateSchool(schoolDto: ISchoolDTO) {
  const response = axios.patch(`${API_URL}/schools/${schoolDto.id}`, schoolDto, {
    headers: HEADERS,
  })
  return response
}

export async function deleteSchool(id: string) {
  const response = await axios.delete(
    `${API_URL}/schools/${id}`,
    {
      headers: HEADERS,
    }
  )
  return response.data
}