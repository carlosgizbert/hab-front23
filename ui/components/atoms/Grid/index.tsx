import { IGrid } from '@/ui/interfaces/IGrid'

import * as S from './styles'

export default function Grid({ columns, gap, children }: IGrid) {
  return (
    <S.Container columns={columns} gap={gap}>
      {children}
    </S.Container>
  )
}
