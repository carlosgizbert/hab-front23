import Link from 'next/link'

import * as S from './styles'

export default function Logo() {
  return (
    <Link href="/" passHref>
      <S.Logo>habilita</S.Logo>
    </Link>
  )
}
