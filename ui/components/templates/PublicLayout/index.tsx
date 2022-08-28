import Navbar from '../../organisms/AppBar'
import * as S from './style'

interface IPrivateLayout {
  children: JSX.Element | JSX.Element[]
}

export default function PublicLayout({ children }: IPrivateLayout) {
  return (
    <S.Container>
      <S.Body>{children}</S.Body>
      <Navbar />
    </S.Container>
  )
}
