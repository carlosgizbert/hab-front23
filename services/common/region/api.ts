import axios from 'axios'
import { IRegionR } from './interfaces'

export async function getRegionByCep(cep?: number): Promise<IRegionR> {
  const response = await axios.get<IRegionR>(
    `https://viacep.com.br/ws/${cep}/json/`
  )
  return response.data
}
