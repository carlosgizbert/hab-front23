import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const API_IBGE = `http://servicodados.ibge.gov.br/api/v1/localidades/estados`

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { uf } = req.query

  const response = await axios.get<any>(`${API_IBGE}/${uf}/distritos`)

  const transformed = response.data.map(({ nome, ...s }: any) => ({
    label: nome,
    ...s,
  }))

  res.send(transformed)
}
