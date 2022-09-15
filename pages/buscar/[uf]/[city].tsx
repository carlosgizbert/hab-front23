import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PublicLayout from '@/ui/templates/PublicLayout'
import CardSchool from '@/ui/organisms/CardSchool'
import { ISchoolDTO } from '@/services/app/search/schools/interfaces'

import { Typography } from '@mui/material'
import SearchView from '@/ui/pages/SearchView'
import Skeleton from 'react-loading-skeleton'
import Logo from '@/ui/atoms/Logo'
import ButtonSearch from '@/ui/atoms/ButtonSearch'
import { useGetSchools } from '@/services/admin/schools'

import * as S from '../../../styles/autoescolas'

const removeAcents = (text: string) => {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export default function Search() {
  const [schools, setSchools] = useState<ISchoolDTO[]>([])
  const [searchOpened, setSearchOpen] = useState(false)

  const router = useRouter()
  const { uf, city } = router.query

  const {
    data: getSchools,
    refetch: getSchoolsRefetch,
    isFetching: getSchoolsIsFetching,
    isLoading: getSchoolsIsLoading,
    isRefetching: getSchoolsIsRefetching,
  } = useGetSchools({
    address_uf: String(uf),
    address_city: removeAcents(String(city)),
  })

  const hasSchools = !!schools && !!schools?.length

  useEffect(() => {
    if (!uf && !city) return
    if (getSchools) {
      setSearchOpen(false)
      setSchools(getSchools)
    }
  }, [getSchools])

  useEffect(() => {
    getSchoolsRefetch()
  }, [city, uf])

  return (
    <>
      {searchOpened && <SearchView onClose={() => setSearchOpen(false)} />}
      <PublicLayout>
        <S.Wrapper>
          <S.Header>
            <S.HeaderWrapper>
              <Logo />
              <S.ButtonSearch>
                <ButtonSearch
                  text={`${city}, ${uf}`}
                  onClick={() => setSearchOpen(true)}
                />
              </S.ButtonSearch>
            </S.HeaderWrapper>
          </S.Header>
          <S.SchoolsList.Wrapper>
            <S.SchoolsList.Body>
              {schools && !getSchoolsIsFetching && !getSchoolsIsLoading && (
                <S.ResultNoSearch>
                  <b>autoescolas próximas</b>{' '}
                  {/* <div style={{ fontWeight: 'bold', marginLeft: '6px' }}>
                    {city}, {uf}
                  </div> */}
                </S.ResultNoSearch>
              )}
              <S.SchoolsList.Cards>
                {(getSchoolsIsFetching || getSchoolsIsLoading) && (
                  <div>
                    <div style={{ marginBottom: '1rem' }}>
                      <Skeleton
                        style={{ marginBottom: '0.4rem' }}
                        height={120}
                        borderRadius="2rem"
                      />
                    </div>
                    <div>
                      <Skeleton
                        style={{ marginBottom: '0.4rem' }}
                        height={120}
                        borderRadius="2rem"
                      />
                    </div>
                  </div>
                )}
                {!getSchoolsIsLoading &&
                  !getSchoolsIsRefetching &&
                  schools &&
                  schools.map((school) => (
                    <CardSchool
                      key={school.id}
                      imageUrl="https://portalpopline.com.br/wp-content/uploads/2022/08/harry-potter-serie.jpg"
                      textTitle={school.name}
                      textTag={`${school.address_district.toLowerCase()}`}
                      textSub={`${school.address_city}, ${school.address_district}, ${school.address_postal}, ${school.address_number}`}
                      qtdRatings={school.ratings_quantity}
                      rating={school.ratings_media_general}
                      onClick={() =>
                        router.push({
                          pathname: '/autoescola/[id]',
                          query: { id: school.id, city, uf },
                        })
                      }
                    />
                  ))}
              </S.SchoolsList.Cards>
              {!hasSchools &&
                !getSchoolsIsLoading &&
                !getSchoolsIsRefetching &&
                uf && (
                  <S.ResultNoSearch>
                    <Typography variant="subtitle1">
                      Nenhuma autoescola parceira nessa região :(
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
