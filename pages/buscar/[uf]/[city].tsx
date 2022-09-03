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

export default function Home() {
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
    address_city: String(city),
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
              <ButtonSearch
                text="Praia Grande"
                onClick={() => setSearchOpen(true)}
              />
            </S.HeaderWrapper>
          </S.Header>
          <S.SchoolsList.Wrapper>
            <S.SchoolsList.Body>
              {/* {schools && !getSchoolsIsFetching && !getSchoolsIsLoading && (
                <S.ResultNoSearch>
                  <div>{schools.length} autoescolas em</div>{' '}
                  <div style={{ fontWeight: 'bold', marginLeft: '6px' }}>
                    {city}, {uf}
                  </div>
                </S.ResultNoSearch>
              )} */}
              <S.SchoolsList.Cards>
                {(getSchoolsIsFetching || getSchoolsIsLoading) && (
                  <div>
                    <Skeleton
                      style={{ marginBottom: '1rem' }}
                      height={24}
                      borderRadius="1rem"
                    />
                    <div style={{ marginBottom: '1.5rem' }}>
                      <Skeleton
                        style={{ marginBottom: '0.4rem' }}
                        height={120}
                        borderRadius="1rem"
                      />
                      <Skeleton height={40} borderRadius="1rem" />
                    </div>
                    <div>
                      <Skeleton
                        style={{ marginBottom: '0.4rem' }}
                        height={120}
                        borderRadius="1rem"
                      />
                      <Skeleton height={40} borderRadius="1rem" />
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
                      textTag={`bairro ${school.address_district}`}
                      textSub={`${school.address_city}, ${school.address_district}, ${school.address_postal}, ${school.address_number}`}
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
