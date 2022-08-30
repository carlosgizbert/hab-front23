import { Button } from '@mui/material'
import { Stack } from '@mui/system'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import PrivateLayout from '@/ui/templates/PrivateLayout'
import GridSchools from './table'
import * as S from '../../../styles/gestao/autoescolas'

function Home(_props: NextPage) {
  const router = useRouter()

  return (
    <PrivateLayout title="Autoescolas">
      <S.Container>
        <Stack height="100%">
          <Button
            variant="contained"
            size="large"
            onClick={() => router.push('/gestao/autoescolas/cadastrar')}
          >
            Nova autoescola
          </Button>
        </Stack>
        <GridSchools />
      </S.Container>
    </PrivateLayout>
  )
}

export default Home
