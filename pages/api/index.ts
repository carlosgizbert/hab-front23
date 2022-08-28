import { NextApiRequest, NextApiResponse } from 'next'

const UF_CITIES: any = {
  SP: ['Praia Grande', 'Santos'],
  RJ: ['Campos dos Goytacazes', 'Cidade de Deus'],
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { uf } = req.query

  const selectedUF: any = Object.keys(UF_CITIES)
    .filter((key) => key.includes(`${uf}`))
    .reduce((cur, key) => {
      return Object.assign(cur, { [key]: UF_CITIES[key] })
    }, {})

  const cities = [] as Array<string>
  selectedUF[String(uf)].forEach((city: string) => {
    cities.push(city)
  })

  res.send(cities)
}
