import axios from 'axios'
import { HEADERS, API_URL } from '../index'

import { ISchoolDTO, ISchoolQ, ISchoolR } from './interfaces'

export async function getRegionyByLatLong(latitude: string, longitude: string) {
  const response = await axios.get<any>(
    `http://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDbL7Ty4i6Dbu76TaWN_8WQxWOFuI3zq6E`
  )
  let uf = 'UF não encontrado'
  let city = 'Cidade não encontrada'
  const parts = response.data.results[0].address_components
  parts.forEach((part: any) => {
    if (part.types.includes('administrative_area_level_1')) {
      uf = part.long_name
    }
    if (part.types.includes('administrative_area_level_2')) {
      city = part.long_name
    }
  })
  const transformed = {
    city,
    uf,
  }
  console.log(transformed)
  return transformed
}

export async function getSchools(params: ISchoolQ) {
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

export async function getSchoolsByCity() {
  const response = await axios.get<ISchoolR[]>(
    `${API_URL}/schools/cidade/Praia Grande`,
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
