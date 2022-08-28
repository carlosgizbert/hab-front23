import { Typography } from '@mui/material'
import ComboBox from '../../atoms/ComboBox'
import Navbar from '../../organisms/AppBar'
import * as S from './style'

interface IPrivateLayout {
  children: JSX.Element | JSX.Element[]
}

enum EUfs {
  SP = 'SP',
  RJ = 'RJ',
}

const ufs = [
  { label: 'São Paulo', value: EUfs.SP },
  { label: 'Rio de Janeiro', value: EUfs.RJ },
]

export default function PublicLayout({ children }: IPrivateLayout) {
  return (
    <S.Container>
      <Navbar />
      <S.Header.Wrapper>
        <S.Header.Logo>
          <Typography variant="h5">habilita</Typography>
        </S.Header.Logo>
        <S.Header.Search>
          <ComboBox label="Qual seu estado?" options={ufs} />
          <ComboBox label="Qual sua Cidade?" options={ufs} />
        </S.Header.Search>
      </S.Header.Wrapper>
      <S.Body>{children}</S.Body>
    </S.Container>
  )
}
