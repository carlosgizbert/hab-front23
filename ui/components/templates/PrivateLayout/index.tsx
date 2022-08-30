import * as S from './style'

interface IPrivateLayout {
  children: JSX.Element | JSX.Element[]
  title: string
}

export default function PrivateLayout({ children, title }: IPrivateLayout) {
  return (
    <S.Page>
      <S.Header>
        <S.HeaderContent>
          <S.Title>{title}</S.Title>
        </S.HeaderContent>
      </S.Header>
      <S.Body>
        <S.BodyContent>{children}</S.BodyContent>
      </S.Body>
    </S.Page>
  )
}
