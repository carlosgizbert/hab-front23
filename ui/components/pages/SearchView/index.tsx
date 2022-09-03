import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import InputBase from '@mui/material/InputBase'
import IconChevronLeft from '@mui/icons-material/ChevronLeft'
import IconPlace from '@mui/icons-material/Place'
import { Button, Divider, IconButton } from '@mui/material'

import Geocode from 'react-geocode'
import * as S from './styles'

interface IUserRegion {
  city: string
  uf: string
  district: string
  country: string
}

interface Props {
  onClose?: () => void
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

  const router = useRouter()
  Geocode.setApiKey('AIzaSyDbL7Ty4i6Dbu76TaWN_8WQxWOFuI3zq6E')
  Geocode.setLanguage('pt-br')
  Geocode.setRegion('br')
  Geocode.setLocationType('ROOFTOP')

  // const {
  //   placePredictions: addressSuggestions,
  //   getPlacePredictions: getAddressSuggestions,
  //   isPlacePredictionsLoading,
  // } = usePlacesService({
  //   apiKey: process.env.REACT_APP_GOOGLE,
  //   options: {
  //     componentRestrictions: {
  //       country: 'br',
  //     },
  //     language: 'pt-BR',
  //     input: inputValue,
  //   },
  // })

  const NoBorderInput = styled(InputBase)(({ theme }) => ({
    border: 'none',
    height: '56px',
  }))

  useEffect(() => {
    setIsLoading(true)
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
    if (inputValue === '') setSuggestions([])
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
        pathname: '/autoescolas/[uf]/[city]',
        query: { uf: userRegion.uf, city: userRegion.city },
      })
  }, [userRegion])

  return (
    <S.Search>
      <S.Wrapper>
        <S.Header>
          <IconButton size="large" color="primary" onClick={onClose}>
            <IconChevronLeft />
          </IconButton>
          <NoBorderInput
            autoFocus
            fullWidth
            size="medium"
            placeholder="Onde você está?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </S.Header>
        <Divider />
        <S.SuggestionsContainer>
          {isLoading && (
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              Buscando.....
            </div>
          )}
          {suggestions &&
            suggestions.map((address: any) => (
              <div
                key={`suggestion${address.formatted_address + 1}`}
                onClick={() => setAddressSelected(address)}
              >
                <S.SuggestionItem>
                  <IconPlace color="primary" />
                  <div>{address.formatted_address}</div>
                </S.SuggestionItem>
              </div>
            ))}
        </S.SuggestionsContainer>
      </S.Wrapper>
      <S.Button>
        <Button
          fullWidth
          size="large"
          variant="contained"
          onClick={() => router.push('/autoescolas')}
        >
          Buscar
        </Button>
      </S.Button>
    </S.Search>
  )
}
