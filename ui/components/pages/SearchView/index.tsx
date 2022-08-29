import { useState } from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete'
import { useRouter } from 'next/router'

import IconChevronLeft from '@mui/icons-material/ChevronLeft'
import IconPlace from '@mui/icons-material/Place'

import {
  Button,
  ButtonBase,
  Divider,
  IconButton,
  TextField,
} from '@mui/material'

import * as S from './styles'

interface Props {
  onClose?: () => void
  value?: string
}

export default function SearchView({ onClose, value }: Props) {
  const [inputValue, setInputValue] = useState('')

  // const router = useRouter()

  // const [coordinates, setCoordinates] = useState({
  //   lat: 0,
  //   lng: 0,
  // })

  const handleChange = (newValue: string) => setInputValue(newValue)

  const handleSelect = (nAddress: any) => {
    geocodeByAddress(nAddress)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log('Success', latLng))
      .catch((error) => console.error('Error', error))
  }

  return (
    <S.Search.Wrapper>
      <PlacesAutocomplete
        value={inputValue}
        onChange={handleChange}
        onSelect={handleSelect}
        searchOptions={{ componentRestrictions: { country: ['br'] } }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <S.Search.Results.Container>
            <S.Search.Results.Header>
              <IconButton size="large" onClick={onClose}>
                <IconChevronLeft />
              </IconButton>
              <TextField
                autoFocus
                fullWidth
                size="medium"
                variant="outlined"
                {...getInputProps({
                  placeholder: 'Onde você está?',
                })}
              />
            </S.Search.Results.Header>
            <Divider variant="fullWidth" />
            <S.Search.DropdownResults>
              {loading && <div>Vrumm...</div>}
              {suggestions.map((suggestion) => {
                return (
                  <div key={suggestion.id}>
                    <S.Search.SuggestionItem
                      {...getSuggestionItemProps(suggestion)}
                    >
                      <IconPlace /> <div>{suggestion.description}</div>
                    </S.Search.SuggestionItem>
                  </div>
                )
              })}
            </S.Search.DropdownResults>
          </S.Search.Results.Container>
        )}
      </PlacesAutocomplete>
    </S.Search.Wrapper>
  )
}
