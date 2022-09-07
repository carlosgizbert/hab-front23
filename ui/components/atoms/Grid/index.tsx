import { IGrid } from '@/ui/interfaces/IGrid'

import * as S from './styles'

export default function Grid({ columns, gap, children, wrap }: IGrid) {
  return (
    <S.Container columns={columns} gap={gap} wrap={wrap}>
      {children}
    </S.Container>
  )
}
