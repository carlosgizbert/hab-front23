import { useState } from 'react'

import Page from '@/ui/pages/Page'

import SearchView from '@/ui/pages/SearchView'
import LayoutPublic from '@/ui/templates/PublicLayout'
import Logo from '@/ui/atoms/Logo'
import ButtonSearch from '@/ui/atoms/ButtonSearch'

import * as S from '../styles/home'

export default function Home() {
  const [searchOpened, setSearchOpen] = useState(false)

  return (
    <Page
      path="/"
      title="habilita - Autoescolas da sua região"
      description="Saiba onde tirar a primeira habilitação na sua cidade."
    >
      {searchOpened && <SearchView onClose={() => setSearchOpen(false)} />}
      <LayoutPublic>
        <S.Home.Wrapper>
          <S.SectionSearch>
            <Logo />
            <S.Home.SubTitle>
              Autoescolas credenciadas pelo detran perto de você
            </S.Home.SubTitle>
            <ButtonSearch
              textAlign="center"
              onClick={() => setSearchOpen(true)}
              text="Insira seu cep, cidade ou rua..."
            />
          </S.SectionSearch>
        </S.Home.Wrapper>
      </LayoutPublic>
    </Page>
  )
}
