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
  const [cSuggestions, setCsuggestions] = useState<Array<any>>([])

  const router = useRouter()

  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: process.env.REACT_APP_GOOGLE,
  })

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

  // const router = useRouter()

  // const [coordinates, setCoordinates] = useState({
  //   lat: 0,
  //   lng: 0,
  // })

  // const handleSelect = (nAddress: any) => {
  //   geocodeByAddress(nAddress)
  //     .then((results) => getLatLng(results[0]))
  //     .then((latLng) => console.log('Success', latLng))
  //     .catch((error) => console.error('Error', error))
  // }

  const NoBorderInput = styled(InputBase)(({ theme }) => ({
    border: 'none',
    height: '56px',
  }))

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    getPlacePredictions({ input: e.target.value })
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
            value={inputValue}
            onChange={(e) => {
              handleInput(e)
            }}
          />
        </S.Header>
        <Divider />
        <S.SuggestionsContainer>
          {isPlacePredictionsLoading && <div>Buscando.....</div>}
          {placePredictions.map((suggestion) => {
            return (
              <div key={`suggestion${suggestion.description}`}>
                <S.SuggestionItem>
                  <IconPlace /> <div>{suggestion.description}</div>
                </S.SuggestionItem>
              </div>
            )
          })}
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
