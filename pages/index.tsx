import { useState } from 'react'
import SearchView from '@/ui/pages/SearchView'
import LayoutPublic from '@/ui/templates/PublicLayout'
import Logo from '@/ui/atoms/Logo'
import IconSearch from '@mui/icons-material/Search'

export default function Home() {
  const [searchOpened, setSearchIsOpen] = useState(false)

  const styleHome = {
    background:
      'linear-gradient(to bottom, rgba(0, 71, 138, 0.24), rgba(0, 14, 24, 0.99)), url("https://images.unsplash.com/photo-1519255122284-c3acd66be602?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=795&q=80")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    height: 'calc(100vh - 5rem)',
    width: '100vw',
  }

  return (
    <>
      {searchOpened && (
        <SearchView
          setIsOpen={setSearchIsOpen}
          onClose={() => setSearchIsOpen(false)}
        />
      )}
      <LayoutPublic>
        <div
          style={styleHome}
          className="
          sticky
          top-0
          z-30
          bgdark
          flex 
          flex-col 
          justify-around
          items-center 
          py-8
          text-white"
        >
          <div className="flex flex-col items-center justify-center">
            <Logo />
            <div className="mt-4">
              <h1 className="text-xl text-center mb-6">
                Encontre autoescolas perto de você
              </h1>
              <div
                className="flex flex-col cursor-pointer"
                onClick={() => setSearchIsOpen(true)}
              >
                <div className="h-14 text-sm border border-white/20 flex items-center px-3 rounded-xl text-gray-200">
                  <div className="pr-2 text-white/60">
                    <IconSearch />
                  </div>{' '}
                  Insira seu cep, cidade, ou rua...
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutPublic>
    </>
  )
}
