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