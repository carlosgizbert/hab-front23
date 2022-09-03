import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import InputBase from '@mui/material/InputBase'
import IconChevronLeft from '@mui/icons-material/ChevronLeft'
import IconPlace from '@mui/icons-material/Place'
import { Button, Divider, IconButton } from '@mui/material'

// import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService'
import LoadingView from '@/ui/atoms/LoadingView'

import Geocode from 'react-geocode'

import { useGetUserRegion } from '@/services/app/search/schools'
import * as S from './styles'

interface ILatLong {
  lat: number
  long: number
}

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
  const [addressSelected, setAddressSelected] = useState<string>('')
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
  //   data: getCity,
  //   isLoading: getCityIsLoading,
  //   isFetching: getCityIsFetching,
  //   refetch: getCityRefetch,
  // } = useGetUserRegion(String(userLatLong?.lat), String(userLatLong?.long))

  const {
    placePredictions: addressSuggestions,
    getPlacePredictions: getAddressSuggestions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: process.env.REACT_APP_GOOGLE,
    options: {
      componentRestrictions: {
        country: 'br',
      },
      language: 'pt-BR',
      input: inputValue,
    },
  })

  const NoBorderInput = styled(InputBase)(({ theme }) => ({
    border: 'none',
    height: '56px',
  }))

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(e.target.value)
    getAddressSuggestions({ input: e.target.value })
  }

  useEffect(() => {
    Geocode.fromAddress(addressSelected).then(
      (addressResponse: any) => {
        const { lat, lng } = addressResponse.results[0].geometry.location
        Geocode.fromLatLng(lat, lng).then(
          (response: any) => {
            // const address = response.results[0].formatted_address
            response.results[0].address_components.forEach((result: any) => {
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
                    break
                }
                return null
              })
            })
          },
          (error: any) => {
            console.error(error)
          }
        )
      },
      (error: any) => {
        console.error(error)
      }
    )
  }, [addressSelected])

  useEffect(() => {
    if (!!userRegion.city && !!userRegion.uf)
      router.push({
        pathname: '/autoescolas/[uf]/[city]',
        query: { uf: userRegion.uf, city: userRegion.city },
      })
    // setUserRegion(undefined)
  }, [userRegion])

  function renderItem(address: any) {
    return (
      <div
        key={`suggestion${address.description}`}
        onClick={() => setAddressSelected(address.description)}
      >
        <S.SuggestionItem>
          <IconPlace color="primary" /> <div>{address.description}</div>
        </S.SuggestionItem>
      </div>
    )
  }

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
            onChange={(e) => {
              handleInput(e)
            }}
          />
        </S.Header>
        <Divider />
        <S.SuggestionsContainer>
          {isPlacePredictionsLoading && (
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              Buscando.....
            </div>
          )}
          {addressSuggestions.map((suggestion) => renderItem(suggestion))}
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
