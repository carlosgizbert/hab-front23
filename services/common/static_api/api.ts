import axios from 'axios'
import { HEADERS, STATIC_API } from '../index'

export async function getCities(uf: string) {
  const response = await axios.get<[]>(`${STATIC_API}/cities?uf=${uf}`)
  console.log(response.data)
  return response.data
}
