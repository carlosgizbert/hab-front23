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
import ButtonCard from '@/ui/organisms/ButtonCard'

import { IconButton } from '@material-ui/core'
import IconChevronLeft from '@mui/icons-material/ChevronLeft'
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import { iconWhatsApp } from '@/static/icons'

import { flexbox } from '@mui/system'
import Link from 'next/link'
import * as S from '../../styles/autoescola'

export default function Home() {
  const [schools, setSchools] = useState<ISchoolDTO[]>([])
  const [searchOpened, setSearchOpen] = useState(false)

  const router = useRouter()
  const { id, uf, city } = router.query

  const {
    data: getSchools,
    refetch: getSchoolsRefetch,
    isFetching: getSchoolsIsFetching,
    isLoading: getSchoolsIsLoading,
    isRefetching: getSchoolsIsRefetching,
  } = useGetSchools({
    id: String(id),
  })

  const goToMap = () => {
    router.push({
      href: `https://www.google.com/maps/@?api=1&map_action=pano&${schools[0]?.address_postal}, ${schools[0]?.address_city}, ${schools[0]?.address_district}`,
    })
  }

  const hasSchools = !!schools && !!schools?.length

  useEffect(() => {
    if (!id) return
    if (getSchools) {
      setSearchOpen(false)
      setSchools(getSchools)
    }
  }, [getSchools])

  useEffect(() => {
    getSchoolsRefetch()
  }, [id])

  return (
    <>
      {searchOpened && <SearchView onClose={() => setSearchOpen(false)} />}
      <PublicLayout>
        <S.Wrapper>
          <S.Header>
            <S.HeaderWrapper iconBack>
              <S.HeaderTop>
                <IconButton size="medium" color="primary">
                  <IconChevronLeft
                    color="primary"
                    onClick={() => {
                      router.push({
                        pathname: '/buscar/[uf]/[city]',
                        query: { uf, city },
                      })
                    }}
                  />
                </IconButton>
                <Logo />
              </S.HeaderTop>
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
                {!getSchoolsIsLoading && !getSchoolsIsRefetching && schools && (
                  <>
                    <CardSchool
                      key={schools[0]?.id}
                      imageUrl="https://portalpopline.com.br/wp-content/uploads/2022/08/harry-potter-serie.jpg"
                      textTitle={schools[0]?.name}
                      textTag={`bairro ${schools[0]?.address_district}`}
                      textSub={`${schools[0]?.address_city}, ${schools[0]?.address_district}, ${schools[0]?.address_postal}, ${schools[0]?.address_number}`}
                    />
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                      }}
                    >
                      <ButtonCard
                        onClick={() => goToMap()}
                        icon={iconWhatsApp}
                        label="Falar com Atendente"
                      />
                      <ButtonCard
                        icon={<LocationOnRoundedIcon />}
                        label="Ver no mapa"
                      />
                      <ButtonCard
                        icon={<LocalPhoneRoundedIcon />}
                        label="Telefonar"
                      />
                    </div>
                  </>
                )}
              </S.SchoolsList.Cards>
              {!hasSchools &&
                !getSchoolsIsLoading &&
                !getSchoolsIsRefetching &&
                id && (
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