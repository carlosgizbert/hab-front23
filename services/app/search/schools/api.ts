import axios from 'axios'
import { HEADERS, API_URL } from '../index'

import { ISchoolDTO, ISchoolR } from './interfaces'

export async function getSchools() {
  const response = await axios.get<ISchoolR[]>(`${API_URL}/schools`, {
    headers: HEADERS,
  })
  const transformed = response.data.map(({ _id, ...s }) => ({ id: _id, ...s }))
  return transformed
}

export async function getSchoolsByUf(uf: string | undefined) {
  const response = await axios.get<ISchoolR[]>(`${API_URL}/schools/uf/${uf}`, {
    headers: HEADERS,
  })
  const transformed = response.data.map(({ _id, ...s }) => ({ id: _id, ...s }))
  return transformed
}

export async function getSchoolsByCity(city: string | undefined) {
  const response = await axios.get<ISchoolR[]>(
    `${API_URL}/schools/cidade/${city}`,
    {
      headers: HEADERS,
    }
  )
  const transformed = response.data.map(({ _id, ...s }) => ({ id: _id, ...s }))
  return transformed
}

export async function getSchool(id: string) {
  const response = await axios.get<ISchoolDTO>(`${API_URL}/schools/${id}`, {
    headers: HEADERS,
  })
  const transformed: any = response.data
  transformed._id = transformed.id
  return transformed
}
