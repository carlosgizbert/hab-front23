import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import { IconButton, TextField } from '@mui/material'

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
  // const NoBorderInput: any = styled(InputBase)(({ theme }) => ({
  //   border: 'none',
  //   height: '56px',
  // }))

  return (
    <S.Header>
      <IconButton size="large" onClick={onClickClose}>
        <ChevronLeftRoundedIcon />
      </IconButton>
      <TextField
        autoFocus
        fullWidth
        variant="standard"
        size="medium"
        placeholder="Onde você está?"
        value={inputValue}
        onChange={onChange}
      />
    </S.Header>
  )
}
