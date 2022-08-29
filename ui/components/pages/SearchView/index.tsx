import { useState } from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete'
import { useRouter } from 'next/router'

import IconChevronLeft from '@mui/icons-material/ChevronLeft'
import IconPlace from '@mui/icons-material/Place'

import { Button, Divider, IconButton, TextField } from '@mui/material'

import * as S from './styles'

interface Props {
  onClose?: () => void
  value?: string
}

export default function SearchView({ onClose, value }: Props) {
  const [inputValue, setInputValue] = useState('')
  const [cSuggestions, setCsuggestions] = useState<Array<any>>([])

  // const router = useRouter()

  // const [coordinates, setCoordinates] = useState({
  //   lat: 0,
  //   lng: 0,
  // })

  const handleSelect = (nAddress: any) => {
    console.log(nAddress)
    geocodeByAddress(nAddress)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log('Success', latLng))
      .catch((error) => console.error('Error', error))
  }

  return (
    <S.Search>
      <PlacesAutocomplete
        value={inputValue}
        onChange={setInputValue}
        onSelect={handleSelect}
        searchOptions={{ componentRestrictions: { country: ['br'] } }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <S.Wrapper>
            <S.Header>
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
            </S.Header>
            <S.SuggestionsContainer>
              {loading && <div>Vrum.....</div>}
              {suggestions.map((suggestion) => {
                return (
                  <div key={`suggestion${suggestion.description}`}>
                    <S.SuggestionItem
                      style={{
                        backgroundColor: suggestion.active
                          ? 'rgb(230, 229, 229)'
                          : 'white',
                      }}
                      {...getSuggestionItemProps(suggestion)}
                    >
                      <IconPlace /> <div>{suggestion.description}</div>
                    </S.SuggestionItem>
                  </div>
                )
              })}
            </S.SuggestionsContainer>
          </S.Wrapper>
        )}
      </PlacesAutocomplete>
      <S.Button>
        <Button fullWidth size="large" variant="contained">
          Buscar
        </Button>
      </S.Button>
    </S.Search>
  )
}
