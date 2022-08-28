import { useEffect, useState } from 'react'
import PublicLayout from '@/ui/templates/PublicLayout'
import CardSchool from '@/ui/organisms/Card'
import { useGetSchoolsByCity } from '@/services/app/search/schools'
import { useGetCitiesByUf } from '@/services/common/static_api'
import { ISchoolDTO } from '@/services/app/search/schools/interfaces'

import { Typography } from '@mui/material'
import ComboBox from '@/ui/atoms/ComboBox'

import * as S from '../styles/home'

const UFList = [
  { label: 'Acre', value: 'AC' },
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
  const [selectedUf, setSelectedUf] = useState<string>()
  const [currentCities, setCurrentCities] = useState<string[]>([])
  const [selectedCity, setSelectedCity] = useState<string>('')

  const {
    data: getCities,
    refetch: getCitiesRefetch,
    isLoading: getCitiesIsLoading,
    isRefetching: getCitiesIsRefetching,
  } = useGetCitiesByUf(selectedUf!)

  const {
    data: getSchools,
    refetch: getSchoolsRefetch,
    isLoading: getSchoolsIsLoading,
    isRefetching: getSchoolsIsRefetching,
  } = useGetSchoolsByCity(selectedCity!, !!selectedUf)

  const hasSchools = !!schools && !!schools?.length

  useEffect(() => {
    if (getCities) setCurrentCities(getCities)
  }, [getCities])

  useEffect(() => {
    getCitiesRefetch()
  }, [selectedUf])

  useEffect(() => {
    if (getSchools) setSchools(getSchools)
  }, [getSchools])

  useEffect(() => {
    getSchoolsRefetch()
  }, [selectedCity])

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
              value={selectedUf}
              options={UFList}
              onChange={(e) => setSelectedUf(e.value)}
            />
            <ComboBox
              label="Qual sua cidade?"
              value={selectedCity}
              options={currentCities}
              onChange={(city) => setSelectedCity(city.label)}
              disabled={getCitiesIsRefetching || getCitiesIsLoading}
            />
          </S.Header.Search>
        </S.Header.Wrapper>
        <S.SchoolsList.Wrapper>
          <S.SchoolsList.Body>
            {(getSchoolsIsLoading || getSchoolsIsRefetching) && (
              <div>Vrum vrummm...</div>
            )}
            {schools && (
              <S.ResultNoSearch>
                <div>{schools.length} autoescolas em</div>{' '}
                <div style={{ fontWeight: 'bold', marginLeft: '6px' }}>
                  {selectedCity}
                </div>
              </S.ResultNoSearch>
            )}
            <S.SchoolsList.Cards>
              {schools &&
                schools.map((school) => (
                  <CardSchool
                    key={school.id}
                    imageUrl="https://portalpopline.com.br/wp-content/uploads/2022/08/harry-potter-serie.jpg"
                    textTitle={school.name}
                    textTag={`bairro: ${school.address_district}`}
                    textSub={`${school.address_uf}, ${school.address_city}, ${school.address_district}, ${school.address_postal}, ${school.address_number}`}
                  />
                ))}
            </S.SchoolsList.Cards>
            {!hasSchools &&
              !getSchoolsIsLoading &&
              !getSchoolsIsRefetching &&
              selectedUf && (
                <S.ResultNoSearch>
                  <Typography variant="h5">{selectedCity}:</Typography>
                  <Typography variant="subtitle1">
                    Nenhuma autoescola parceira :(
                  </Typography>
                </S.ResultNoSearch>
              )}
          </S.SchoolsList.Body>
        </S.SchoolsList.Wrapper>
      </S.Home.Wrapper>
    </PublicLayout>
  )
}
