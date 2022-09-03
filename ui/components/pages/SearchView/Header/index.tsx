import InputBase from '@mui/material/InputBase'
import { IconButton } from '@mui/material'
import IconChevronLeft from '@mui/icons-material/ChevronLeft'
import styled from 'styled-components'

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
  const NoBorderInput: any = styled(InputBase)(({ theme }) => ({
    border: 'none',
    height: '56px',
  }))

  return (
    <S.Header>
      <IconButton size="large" color="primary" onClick={onClickClose}>
        <IconChevronLeft color="primary" />
      </IconButton>
      <NoBorderInput
        autoFocus
        fullWidth
        size="medium"
        placeholder="Onde você está?"
        value={inputValue}
        onChange={onChange}
      />
    </S.Header>
  )
}
