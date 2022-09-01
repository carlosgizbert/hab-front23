import { CircularProgress } from '@mui/material'

import * as S from './styles'

export default function LoadingView() {
  return (
    <S.Wrapper>
      <CircularProgress />
    </S.Wrapper>
  )
}
