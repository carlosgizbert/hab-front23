import { HEADERS } from '../index';
import axios from 'axios'

import { ISchool } from './interfaces'

import { API_URL } from '..'

export async function getSchools() {
  const response = await axios.get<ISchool[]>(`${API_URL}/schools`, {
    headers: HEADERS
  }
  )
  const normalized = response.data.map((obj) => {
    obj['id'] = obj['_id']
    delete obj['_id']
    return obj
  })

  return normalized
}

export async function createSchool(schoolDto: Omit<ISchool, 'id'>) {
  const response = axios.post(`${API_URL}/schools`, schoolDto, {
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