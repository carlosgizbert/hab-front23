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
  setIsOpen?: (value: boolean) => void
  onClose?: () => void
  value?: string
}

export default function SearchView({ setIsOpen, onClose, value }: Props) {
  const router = useRouter()
  const [address, setAddress] = useState(value || '')
  const [coordinates, setCoordinates] = useState({
    lat: 0,
    lng: 0,
  })

  const handleSelect = async (handleValue: any) => {
    const results = await geocodeByAddress(value)
    const latLng = await getLatLng(results[0])
    setAddress(value)
    setCoordinates(latLng)

    setIsOpen(false)
    router.push({
      pathname: '/autoescolas/[cep]',
      query: { cep: address },
    })
  }

  return (
    <S.Search.Wrapper>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
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
                variant="outlined"
                size="medium"
                fullWidth
                {...getInputProps({
                  placeholder: 'Insira seu cep, cidade ou rua...',
                })}
              />
            </S.Search.Results.Header>
            <Divider variant="fullWidth" />
            <div className="h-full">
              {loading ? (
                <div className="px-3 py-4 text-center">vrummm...</div>
              ) : null}
              {suggestions.map((suggestion) => {
                return (
                  <div
                    className={`
                          flex
                          items-center
                          h-auto 
                          px-3 py-4
                          cursor-pointer
                          ${suggestion.active ? 'bg-slate-100' : 'bg-white'}
                          `}
                    {...getSuggestionItemProps(suggestion)}
                  >
                    <div className="mr-3 text-gray-300">
                      <IconPlace />
                    </div>
                    {suggestion.description}
                  </div>
                )
              })}
            </div>
          </S.Search.Results.Container>
        )}
      </PlacesAutocomplete>
    </S.Search.Wrapper>
  )
}
