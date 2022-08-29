import { useState } from 'react'
import SearchView from '@/ui/pages/SearchView'
import LayoutPublic from '@/ui/templates/PublicLayout'
import Logo from '@/ui/atoms/Logo'
import IconSearch from '@mui/icons-material/Search'
import { Button } from '@mui/material'

import * as S from '../styles/home'

export default function Home() {
  const [searchOpened, setSearchOpen] = useState(false)

  return (
    <>
      {searchOpened && <SearchView onClose={() => setSearchOpen(false)} />}
      <LayoutPublic>
        <S.Home.Wrapper>
          <Logo />
          <S.Home.SubTitle>Encontre autoescolas perto de você</S.Home.SubTitle>
          <S.Home.ButtonSearch onClick={() => setSearchOpen(true)}>
            <IconSearch /> <div>Insira seu cep, cidade, ou rua...</div>
          </S.Home.ButtonSearch>
        </S.Home.Wrapper>
      </LayoutPublic>
    </>
  )
}
