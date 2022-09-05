import { useRef } from 'react'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import { IconButton, Stack, TextField } from '@mui/material'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import * as S from './styles'

interface IHeader {
  onClickClose: () => void
  onChange: (value: any) => void
  inputValue: string | number
}

export default function Header({
  onClickClose,
  onChange,
  inputValue,
}: IHeader) {
  const handleClear = () => {
    onChange('')
    document?.getElementById('clearInput')?.focus()
  }
  return (
    <S.Header>
      <IconButton size="large" onClick={onClickClose}>
        <ChevronLeftRoundedIcon />
      </IconButton>
      {/* <TextField
        autoFocus
        fullWidth
        variant="standard"
        size="medium"
        placeholder="Onde você está?"
        value={inputValue}
        onChange={onChange}
      /> */}
      <TextField
        fullWidth
        id="clearInput"
        onChange={(e: any) => onChange(e.target.value)}
        variant="standard"
        placeholder="Onde você está?"
        value={inputValue}
        InputProps={{
          endAdornment: (
            <IconButton
              sx={{ visibility: inputValue ? 'visible' : 'hidden' }}
              onClick={() => handleClear()}
            >
              <ClearRoundedIcon />
            </IconButton>
          ),
        }}
      />
    </S.Header>
  )
}
