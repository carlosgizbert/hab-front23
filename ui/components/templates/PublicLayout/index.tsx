import Navbar from '../../organisms/AppBar'
import * as S from './style'

interface IPrivateLayout {
  children: JSX.Element | JSX.Element[]
}

export default function PublicLayout({ children }: IPrivateLayout) {
  return (
    <S.Container>
      <Navbar />
      <S.Body>{children}</S.Body>
    </S.Container>
  )
}
