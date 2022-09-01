import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PublicLayout from '@/ui/templates/PublicLayout'
import CardSchool from '@/ui/organisms/Card'
import { useGetSchoolsByCity } from '@/services/app/search/schools'
import { useGetCitiesByUf } from '@/services/common/static_api'
import { ISchoolDTO } from '@/services/app/search/schools/interfaces'

import { geocodeByLatLng } from 'react-google-places-autocomplete'

import { Typography } from '@mui/material'
import ComboBox from '@/ui/atoms/ComboBox'

import Logo from '@/ui/atoms/Logo'
import ButtonSearch from '@/ui/atoms/ButtonSearch'
import * as S from '../../styles/autoescolas'

export default function Home() {
  const [schools, setSchools] = useState<ISchoolDTO[]>([])
  const [selectedUf, setSelectedUf] = useState<string>('')
  // const [selectedCity, setSelectedCity] = useState<string>('')
  // const [currentCities, setCurrentCities] = useState<string[]>([])
  const [searchOpened, setSearchOpen] = useState(false)

  const route = useRouter()

  // console.log(route.query)

  // const {
  //   data: getCities,
  //   refetch: getCitiesRefetch,
  //   isLoading: getCitiesIsLoading,
  //   isRefetching: getCitiesIsRefetching,
  // } = useGetCitiesByUf(selectedUf!)

  // const {
  //   data: getSchools,
  //   refetch: getSchoolsRefetch,
  //   isLoading: getSchoolsIsLoading,
  //   isRefetching: getSchoolsIsRefetching,
  // } = useGetSchoolsByCity()

  // const getAddress = () => {
  //   geocodeByLatLng({ lat: -324.0190822, lng: -46.4688663 })
  //     .then((results) => console.log(results))
  //     .catch((error) => console.error(error))
  // }

  // useEffect(() => {
  //   getAddress()
  // }, [])

  // const hasSchools = !!schools && !!schools?.length

  // useEffect(() => {
  //   if (getCities) setCurrentCities(getCities)
  // }, [getCities])

  // useEffect(() => {
  //   getCitiesRefetch()
  // }, [selectedUf])

  // useEffect(() => {
  //   if (getSchools) setSchools(getSchools)
  // }, [getSchools])

  // useEffect(() => {
  //   getSchoolsRefetch()
  // }, [selectedCity])

  return (
    <PublicLayout>
      <S.Wrapper>
        <S.Header>
          <S.HeaderWrapper>
            <Logo />
            <ButtonSearch
              text="Praia Grande"
              onClick={() => setSearchOpen(true)}
            />
          </S.HeaderWrapper>
        </S.Header>
        {/* <S.SchoolsList.Wrapper>
          <S.SchoolsList.Body>
            {(getSchoolsIsLoading || getSchoolsIsRefetching) && !hasSchools && (
              <div>Buscando...</div>
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
              {!getSchoolsIsLoading &&
                !getSchoolsIsRefetching &&
                schools &&
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
                  <Typography variant="subtitle1">
                    Nenhuma autoescola parceira :(
                  </Typography>
                </S.ResultNoSearch>
              )}
          </S.SchoolsList.Body>
        </S.SchoolsList.Wrapper> */}
      </S.Wrapper>
    </PublicLayout>
  )
}
