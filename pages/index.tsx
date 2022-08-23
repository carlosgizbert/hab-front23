import { TextField } from '@mui/material'
import type { NextPage } from 'next'
import PrivateLayout from '../ui/components/PrivateLayout'

import * as S from './styles'


const Home: NextPage = () => {
  return (
    <PrivateLayout title='Cadastrar Autoescola'>
      <S.Container>
        <TextField id="outlined-basic" label="Nome" variant="outlined" />
      </S.Container>
    </PrivateLayout>
  )
}

export default Home
