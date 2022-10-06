import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import 'react-loading-skeleton/dist/skeleton.css'

import Geocode from 'react-geocode'
import Header from './Header'
import ListSuggestions from './ListSuggestions'

import * as S from './styles'

interface IUserRegion {
  city: string
  uf: string
  district: string
  country: string
}

interface Props {
  onClose: () => void
}

export default function SearchView({ onClose }: Props) {
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState<any>()
  const [addressSelected, setAddressSelected] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userRegion, setUserRegion] = useState<IUserRegion>({
    city: '',
    uf: '',
    country: '',
    district: '',
  })

  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_HTTP || '')
  Geocode.setLanguage('pt-br')
  Geocode.setRegion('br')
  Geocode.setLocationType('APPROXIMATE')

  const router = useRouter()

  const handleInput = (value: any) => {
    setSuggestions([])
    setInputValue(value)
  }

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      if (inputValue.length < 2) {
        setIsLoading(false)
        return
      }
      Geocode.fromAddress(inputValue)
        .then(
          (addressResponse: any) => {
            const { lat, lng } = addressResponse.results[0].geometry.location
            Geocode.fromLatLng(lat, lng).then(
              (response: any) => {
                setSuggestions(response.results.map((address: any) => address))
              },
              (error: any) => {
                console.error(error)
              }
            )
          },
          (error: any) => {
            setIsLoading(false)
            console.error(error)
          }
        )
        .finally(() => setIsLoading(false))
    }, 1000)
    return () => clearTimeout(timer)
  }, [inputValue])

  useEffect(() => {
    if (addressSelected) {
      addressSelected.address_components.forEach((result: any) => {
        result.types.forEach((type: any) => {
          switch (type) {
            case 'administrative_area_level_2':
              setUserRegion((s) => ({ ...s, city: result.long_name }))
              break
            case 'administrative_area_level_1':
              setUserRegion((s) => ({ ...s, uf: result.long_name }))
              break
            case 'sublocality_level_1':
              setUserRegion((s) => ({ ...s, district: result.long_name }))
              break
            case 'country':
              setUserRegion((s) => ({ ...s, country: result.long_name }))
              break
            default:
              return null
          }
          return null
        })
      })
    }
  }, [addressSelected])

  useEffect(() => {
    if (!!userRegion.city && !!userRegion.uf)
      router.push({
        pathname: '/buscar/[uf]/[city]',
        query: { uf: userRegion.uf, city: userRegion.city },
      })
  }, [userRegion])

  return (
    <S.Search>
      <S.Wrapper>
        <Header
          inputValue={inputValue}
          onChange={(value: any) => handleInput(value)}
          onClickClose={onClose}
        />
        {/* <Divider /> */}
        <ListSuggestions
          isLoading={isLoading}
          schools={suggestions}
          onClickAddressCallBack={(address: any) => setAddressSelected(address)}
        />
      </S.Wrapper>
    </S.Search>
  )
}
