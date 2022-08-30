import { useEffect, useState } from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import InputBase from '@mui/material/InputBase'
import IconChevronLeft from '@mui/icons-material/ChevronLeft'
import IconPlace from '@mui/icons-material/Place'
import { Button, Divider, IconButton } from '@mui/material'

import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService'

import * as S from './styles'

interface Props {
  onClose?: () => void
  value?: string
}

export default function SearchView({ onClose, value }: Props) {
  const [inputValue, setInputValue] = useState('')

  const router = useRouter()

  const {
    placesService,
    placePredictions,
    getPlacePredictions,
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

  function renderItem(suggestion: any) {
    return (
      <div key={`suggestion${suggestion.description}`}>
        <S.SuggestionItem>
          <IconPlace color="primary" /> <div>{suggestion.description}</div>
        </S.SuggestionItem>
      </div>
    )
  }

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(e.target.value)
    getPlacePredictions({ input: e.target.value })
  }

  useEffect(() => {
    // fetch place details for the first element in placePredictions array
    if (placePredictions.length)
      placesService?.getDetails(
        {
          placeId: placePredictions[0].place_id,
        },
        (placeDetails) => console.log(placeDetails)
      )
  }, [placePredictions])

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
          {placePredictions.map((suggestion) => renderItem(suggestion))}
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
