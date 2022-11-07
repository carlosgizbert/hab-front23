/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PublicLayout from '@/ui/templates/PublicLayout'
import CardSchool from '@/ui/organisms/CardSchool'
import { ISchoolDTO } from '@/services/app/search/schools/interfaces'

import Page from '@/ui/pages/Page'

import SearchView from '@/ui/pages/SearchView'
import Skeleton from 'react-loading-skeleton'
import Logo from '@/ui/atoms/Logo'
import ButtonCard from '@/ui/organisms/ButtonCard'

import { IconButton, Typography } from '@material-ui/core'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import { iconWhatsApp } from '@/static/icons'
import { useGetSchools } from '@/services/admin/schools'
import Card from '@/ui/atoms/Card'
import Grid from '@/ui/atoms/Grid'
import Link from 'next/link'

import * as S from '../../styles/autoescola'

export default function Home() {
  const [school, setSchools] = useState<ISchoolDTO[]>([])
  const [searchOpened, setSearchOpen] = useState(false)

  const router = useRouter()
  const { id, uf, city } = router.query

  const {
    data: getSchools,
    refetch: schoolRefetch,
    isFetching: schoolIsFetching,
    isLoading: schoolIsLoading,
    isRefetching: schoolIsRefetching,
  } = useGetSchools({
    _id: String(id),
  })

  const schoolNormalized = {
    id: school[0]?.id,
    name: school[0]?.name,
    address: `${school[0]?.address_city}, ${school[0]?.address_district}, ${
      school[0]?.address_postal ? `${school[0]?.address_postal}, ` : ''
    }${school[0]?.address_number}`,
    district: `${school[0]?.address_district}`,
    qtdRatings: school[0]?.ratings_quantity,
    rating: school[0]?.ratings_media_general,
  }

  const goToMap = () => {
    router.push({
      href: `https://www.google.com/maps/@?api=1&map_action=pano&${school[0]?.address_postal}, ${school[0]?.address_city}, ${school[0]?.address_district}`,
    })
  }

  const renderDiferencials = () => {
    const differencials: any = []

    if (school[0]?.differential_course_recycle)
      differencials.push({
        name: 'Curso de reciclagem',
      })
    if (school[0]?.differential_simulator)
      differencials.push({
        name: 'Simulador',
      })
    if (school[0]?.differential_special_person)
      differencials.push({
        name: 'Atende pessoa deficiênte',
      })
    if (school[0]?.differential_special_ticket)
      differencials.push({
        name: 'Parcela no boleto',
      })
    if (school[0]?.differential_student_at_home)
      differencials.push({
        name: 'Busca aluno em casa',
      })

    return (
      <Card>
        <Typography variant="h6" style={{ fontWeight: 'bold' }}>
          Diferenciais
        </Typography>
        {differencials?.map((differencial: any) => {
          return (
            <div
              key={`${differencials}Id`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <CheckCircleOutlineRoundedIcon color="success" />
              {differencial.name}
            </div>
          )
        })}
      </Card>
    )
  }

  const renderRatings = () => {
    const userRatings: any = []
    const qtdVotes = {
      label: 'Média geral',
      value: school[0]?.ratings_quantity || '-',
    }
    const ratingGeneral = {
      label: 'Média geral',
      value: school[0]?.ratings_media_general || '-',
    }

    if (school[0]?.ratings_media_support)
      userRatings.push({
        label: 'Atendimento',
        value: school[0]?.ratings_media_support,
      })
    if (school[0]?.ratings_media_schedule)
      userRatings.push({
        label: 'Agenda',
        value: school[0]?.ratings_media_schedule,
      })
    if (school[0]?.ratings_media_instalations)
      userRatings.push({
        label: 'Ambiente',
        value: school[0]?.ratings_media_instalations,
      })
    if (school[0]?.ratings_media_education)
      userRatings.push({
        label: 'Ensino',
        value: school[0]?.ratings_media_education,
      })
    if (school[0]?.ratings_media_localization)
      userRatings.push({
        label: 'Localização',
        value: school[0]?.ratings_media_localization,
      })
    if (school[0]?.ratings_media_price)
      userRatings.push({
        label: 'Preços',
        value: school[0]?.ratings_media_price,
      })
    if (school[0]?.ratings_media_transparence)
      userRatings.push({
        label: 'Transparência',
        value: school[0]?.ratings_media_transparence,
      })

    return (
      <Card>
        <Typography variant="h6" style={{ fontWeight: 'bold' }}>
          Avaliações dos alunos
        </Typography>
        <S.BoxRating>
          <div>
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
              {ratingGeneral.value}
            </span>
            <span style={{ fontSize: '14px' }}>/5</span>
          </div>
          <div>com base em {qtdVotes.value} avaliações</div>
        </S.BoxRating>
        <Grid columns="1fr" gap={0.5} wrap>
          {userRatings.map((rating: any) => {
            return (
              <div
                key={`${rating}Id`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <S.BoxRating>
                  <span style={{ fontWeight: '400' }}>
                    {rating.value}
                    <span style={{ fontSize: '12px' }}>/5</span>
                  </span>
                </S.BoxRating>
                {rating.label}
              </div>
            )
          })}
        </Grid>
      </Card>
    )
  }

  useEffect(() => {
    if (!id) return
    if (getSchools) {
      setSearchOpen(false)
      setSchools(getSchools)
    }
  }, [getSchools])

  useEffect(() => {
    schoolRefetch()
  }, [id])

  return (
    <Page
      path="/autoescola/"
      title={`${school[0]?.name} - ${school[0]?.address_city}, ${school[0]?.address_uf}`}
      description="Autoescolas confiáveis para primeira habilitação de todo."
    >
      {searchOpened && <SearchView onClose={() => setSearchOpen(false)} />}
      <PublicLayout>
        <S.Wrapper>
          <S.Header>
            <S.HeaderWrapper>
              <S.HeaderTop>
                <IconButton size="medium">
                  <ChevronLeftRoundedIcon
                    onClick={() => {
                      router.push({
                        pathname: '/buscar/[uf]/[city]',
                        query: { uf, city },
                      })
                    }}
                  />
                </IconButton>
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <Logo />
                </div>
              </S.HeaderTop>
            </S.HeaderWrapper>
          </S.Header>
          <S.SchoolsList.Wrapper>
            <S.SchoolsList.Body>
              <S.SchoolsList.Cards>
                {(schoolIsFetching || schoolIsLoading) && (
                  <div>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <Skeleton
                        style={{ marginBottom: '0.4rem' }}
                        height={120}
                        borderRadius="0.5rem"
                      />
                      <div
                        style={{
                          marginTop: '1rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.5rem',
                        }}
                      >
                        <Skeleton height={50} borderRadius="0.5rem" />
                        <Skeleton height={50} borderRadius="0.5rem" />
                        <Skeleton height={50} borderRadius="0.5rem" />
                      </div>
                    </div>
                  </div>
                )}
                {!schoolIsLoading && !schoolIsRefetching && school && (
                  <>
                    <CardSchool
                      key={schoolNormalized.id}
                      textTitle={schoolNormalized.name}
                      textTag={schoolNormalized.district}
                      textSub={schoolNormalized.address}
                      qtdRatings={schoolNormalized.qtdRatings}
                      rating={schoolNormalized.rating}
                      imageUrl="https://portalpopline.com.br/wp-content/uploads/2022/08/harry-potter-serie.jpg"
                    />
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                      }}
                    >
                      {school[0]?.whatsapp && (
                        <Link
                          href={`https://api.whatsapp.com/send?phone=${school[0]?.whatsapp}&text=Olá,%20vim%20do%20habilita`}
                          passHref
                        >
                          <a target="_blank" rel="noopener noreferrer">
                            <ButtonCard
                              onClick={() => goToMap()}
                              icon={iconWhatsApp}
                              label="Falar com Atendente"
                            />
                          </a>
                        </Link>
                      )}
                      <ButtonCard
                        onClick={() => goToMap()}
                        icon={<LocationOnRoundedIcon />}
                        label="Ver no mapa"
                      />
                      {school[0]?.phone && (
                        <Link target="_blank" href={`tel:${school[0]?.phone}`}>
                          <ButtonCard
                            icon={<LocalPhoneRoundedIcon />}
                            label="Ligar"
                          />
                        </Link>
                      )}
                    </div>
                    {renderDiferencials()}
                    {renderRatings()}
                  </>
                )}
              </S.SchoolsList.Cards>
            </S.SchoolsList.Body>
          </S.SchoolsList.Wrapper>
        </S.Wrapper>
      </PublicLayout>
    </Page>
  )
}
