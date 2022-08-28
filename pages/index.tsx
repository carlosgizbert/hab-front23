import { useEffect, useState } from 'react'
import PublicLayout from '@/ui/templates/PublicLayout'
import CardSchool from '@/ui/organisms/Card'
import { useGetSchoolsUf } from '@/services/app/search/schools'
import { ISchoolDTO } from '@/services/app/search/schools/interfaces'

import { Typography } from '@mui/material'
import ComboBox from '@/ui/atoms/ComboBox'

import * as S from '../styles/home'

const UFList = [
  { label: 'São Paulo', value: 'AC' },
  { label: 'Alagoas', value: 'AL' },
  { label: 'Amapá', value: 'AP' },
  { label: 'Amazonas', value: 'AM' },
  { label: 'Bahia', value: 'BA' },
  { label: 'Ceará', value: 'CE' },
  { label: 'Distrito Federal', value: 'DF' },
  { label: 'Espirito Santo', value: 'ES' },
  { label: 'Goiás', value: 'GO' },
  { label: 'Maranhão', value: 'MA' },
  { label: 'Mato Grosso', value: 'MT' },
  { label: 'Mato Grosso do Sul', value: 'MS' },
  { label: 'Minas Gerais', value: 'MG' },
  { label: 'Pará', value: 'PA' },
  { label: 'Paraíba', value: 'PB' },
  { label: 'Paraná', value: 'PR' },
  { label: 'Pernambuco', value: 'PE' },
  { label: 'Piauí', value: 'PI' },
  { label: 'Rio de Janeiro', value: 'RJ' },
  { label: 'Rio Grande do Norte', value: 'RN' },
  { label: 'Rio Grande do Sul', value: 'RS' },
  { label: 'Rondônia', value: 'RO' },
  { label: 'Roraima', value: 'RR' },
  { label: 'Santa Catarina', value: 'SC' },
  { label: 'São Paulo', value: 'SP' },
  { label: 'Sergipe', value: 'SE' },
  { label: 'Tocantins', value: 'TO' },
]

export default function Home() {
  const [schools, setSchools] = useState<ISchoolDTO[]>([])
  const [uf, setUf] = useState<string>('RJ')

  const { data: getSchools, refetch } = useGetSchoolsUf(uf)

  useEffect(() => {
    if (uf) refetch()
  }, [uf])

  useEffect(() => {
    if (getSchools) setSchools(getSchools)
  }, [getSchools])

  return (
    <PublicLayout>
      <S.Home.Wrapper>
        <S.Header.Wrapper>
          <S.Header.Logo>
            <Typography variant="h5">habilita</Typography>
          </S.Header.Logo>
          <S.Header.Search>
            <ComboBox
              label="Qual seu estado?"
              options={UFList}
              onChange={(e) => setUf(e.value)}
            />
            <ComboBox
              label="Qual sua cidade?"
              options={UFList}
              onChange={(e) => setUf(e.value)}
            />
          </S.Header.Search>
        </S.Header.Wrapper>

        {schools &&
          schools.map((school) => (
            <CardSchool
              key={school.id}
              imageUrl="https://portalpopline.com.br/wp-content/uploads/2022/08/harry-potter-serie.jpg"
              textTitle={school.name}
              textTag={school.address_district}
              textSub={`${school.address_uf}, ${school.address_city}, ${school.address_district}, ${school.address_postal}, ${school.address_number}`}
            />
          ))}
      </S.Home.Wrapper>
    </PublicLayout>
  )
}
