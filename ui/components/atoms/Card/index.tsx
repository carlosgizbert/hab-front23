import { ReactNode } from 'react'
import * as S from './style'

interface ICardSchool {
  onClick?: () => void
  children: ReactNode | ReactNode[]
}

export default function Card({ onClick, children }: ICardSchool) {
  return <S.Card onClick={onClick}>{children}</S.Card>
}
