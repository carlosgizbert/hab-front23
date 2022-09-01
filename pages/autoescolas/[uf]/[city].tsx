import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PublicLayout from '@/ui/templates/PublicLayout'
import CardSchool from '@/ui/organisms/Card'
import { ISchoolDTO } from '@/services/app/search/schools/interfaces'

import { Typography } from '@mui/material'
import SearchView from '@/ui/pages/SearchView'
import LoadingView from '@/ui/atoms/LoadingView'
import Logo from '@/ui/atoms/Logo'
import ButtonSearch from '@/ui/atoms/ButtonSearch'
import { useGetSchools } from '@/services/admin/schools'

import * as S from '../../../styles/autoescolas'

interface IUserRegion {
  uf: string
  city: string
}

export default function Home() {
  const [schools, setSchools] = useState<ISchoolDTO[]>([])
  const [userRegion, setUserRegion] = useState<IUserRegion>()
  const [searchOpened, setSearchOpen] = useState(false)
  const route = useRouter()

  const {
    data: getSchools,
    isFetching: getSchoolsIsFetching,
    isLoading: getSchoolsIsLoading,
    isRefetching: getSchoolsIsRefetching,
  } = useGetSchools({
    address_uf: userRegion?.uf,
    address_city: userRegion?.city,
  })

  const hasSchools = !!schools && !!schools?.length

  useEffect(() => {
    if (route.query)
      setUserRegion({
        city: String(route.query.city),
        uf: String(route.query.uf),
      })
  }, [route.query])

  useEffect(() => {
    if (userRegion && getSchools) setSchools(getSchools)
  }, [userRegion, getSchools])

  return (
    <>
      {(getSchoolsIsFetching || getSchoolsIsLoading) && <LoadingView />}
      {searchOpened && <SearchView onClose={() => setSearchOpen(false)} />}
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
          <S.SchoolsList.Wrapper>
            <S.SchoolsList.Body>
              {(getSchoolsIsLoading || getSchoolsIsRefetching) &&
                !hasSchools && <div>Buscando...</div>}
              {schools && (
                <S.ResultNoSearch>
                  <div>{schools.length} autoescolas em</div>{' '}
                  <div style={{ fontWeight: 'bold', marginLeft: '6px' }}>
                    {userRegion?.city}
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
                userRegion?.uf && (
                  <S.ResultNoSearch>
                    <Typography variant="subtitle1">
                      Nenhuma autoescola parceira :(
                    </Typography>
                  </S.ResultNoSearch>
                )}
            </S.SchoolsList.Body>
          </S.SchoolsList.Wrapper>
        </S.Wrapper>
      </PublicLayout>
    </>
  )
}
