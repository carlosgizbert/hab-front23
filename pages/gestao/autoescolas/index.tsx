import { Button } from '@mui/material'
import { Stack } from '@mui/system'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import PublicLayout from '@/ui/templates/PublicLayout'
import * as S from '../../../styles/gestao/autoescolas'
import GridSchools from './table'

function Home(_props: NextPage) {
  const router = useRouter()

  return (
    <PublicLayout>
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
    </PublicLayout>
  )
}

export default Home
