import axios from 'axios'
import { HEADERS, STATIC_API } from '../index'

export async function getCities(uf: string | undefined) {
  const response = await axios.get<[]>(`${STATIC_API}/cities?uf=${uf}`, {
    headers: HEADERS,
  })
  return response.data
}
