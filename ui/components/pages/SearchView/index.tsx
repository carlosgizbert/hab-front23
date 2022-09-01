import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import InputBase from '@mui/material/InputBase'
import IconChevronLeft from '@mui/icons-material/ChevronLeft'
import IconPlace from '@mui/icons-material/Place'
import { Button, Divider, IconButton } from '@mui/material'

import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService'
import LoadingView from '@/ui/atoms/LoadingView'

import { useGetUserRegion } from '@/services/app/search/schools'
import * as S from './styles'

interface ILatLong {
  lat: number
  long: number
}

interface IUserRegion {
  city: string
  uf: string
}

interface Props {
  onClose?: () => void
  value?: string
}

export default function SearchView({ onClose, value }: Props) {
  const [inputValue, setInputValue] = useState('')
  const [userLatLong, setUserLatLong] = useState<ILatLong>()
  const [userRegion, setUserRegion] = useState<IUserRegion>()

  const router = useRouter()

  const {
    data: getCity,
    isLoading: getCityIsLoading,
    isFetching: getCityIsFetching,
    refetch: getCityRefetch,
  } = useGetUserRegion(String(userLatLong?.lat), String(userLatLong?.long))

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

  const handleSuggestionClicked = async (suggestionAddress: any) => {
    if (suggestionAddress) {
      await geocodeByAddress(suggestionAddress)
        .then((results: any) => getLatLng(results[0]))
        .then(({ lat, lng }) => setUserLatLong({ lat, long: lng }))
        .finally(() => {
          if (userLatLong) getCityRefetch()
        })
        .catch((e) => console.log(e))
    }
  }

  useEffect(() => {
    if (userLatLong) getCityRefetch()
  }, [userLatLong])

  useEffect(() => {
    if (getCity) setUserRegion(getCity)
  }, [getCity])

  useEffect(() => {
    if (userRegion)
      router.push({
        pathname: '/autoescolas/[uf]/[city]',
        query: { uf: userRegion.uf, city: userRegion.city },
      })
  }, [userRegion])

  function renderItem(address: any) {
    return (
      <div
        key={`suggestion${address.description}`}
        onClick={() => handleSuggestionClicked(address.description)}
      >
        <S.SuggestionItem>
          <IconPlace color="primary" /> <div>{address.description}</div>
        </S.SuggestionItem>
      </div>
    )
  }

  return (
    <S.Search>
      {(getCityIsFetching || getCityIsLoading) && <LoadingView />}
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
