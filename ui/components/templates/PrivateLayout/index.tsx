import { Typography } from '@mui/material'
import Navbar from '../../organisms/AppBar'
import * as S from './style'

interface IPrivateLayout {
  title: string
  children: JSX.Element | JSX.Element[]
}

export default function PrivateLayout({ title, children }: IPrivateLayout) {
  return (
    <S.Container>
      <Navbar />
      <S.HeaderWrapper>
        <S.HeaderContainer>
          <Typography variant="h4">{title}</Typography>
        </S.HeaderContainer>
      </S.HeaderWrapper>
      <S.Body>{children}</S.Body>
      <S.Footer.Wrapper>
        <S.Footer.Content>
          <div>habilita 2023</div>
        </S.Footer.Content>
      </S.Footer.Wrapper>
    </S.Container>
  )
}
