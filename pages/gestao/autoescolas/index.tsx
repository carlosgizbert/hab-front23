import { Button } from '@mui/material'
import { Stack } from '@mui/system'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import PrivateLayout from '../../../ui/components/templates/PrivateLayout'

import * as S from '../../../styles/gestao/autoescolas'
import GridSchools from './table'

function Home(_props: NextPage) {
  const router = useRouter()

  return (
    <PrivateLayout title="Autoescolas">
      <S.Container>
        <Stack height="100%" alignItems="end" justifyContent="flex-end">
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
