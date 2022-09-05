import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import { IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import * as S from './style'

interface IPrivateLayout {
  children: JSX.Element | JSX.Element[]
  title: string
}

export default function PrivateLayout({ children, title }: IPrivateLayout) {
  const router = useRouter()

  return (
    <S.Page>
      <S.Header>
        <S.HeaderContent>
          <IconButton size="medium">
            <ChevronLeftRoundedIcon
              onClick={() => {
                router.back()
              }}
            />
          </IconButton>
          <S.Title>{title}</S.Title>
        </S.HeaderContent>
      </S.Header>
      <S.Body>
        <S.BodyContent>{children}</S.BodyContent>
      </S.Body>
    </S.Page>
  )
}
