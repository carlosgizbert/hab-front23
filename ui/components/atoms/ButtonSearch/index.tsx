import IconSearch from '@mui/icons-material/Search'
import * as S from './styles'

interface IButtonProps {
  onClick?: () => void
  text: string
}

export default function ButtonSearch({ onClick, text }: IButtonProps) {
  return (
    <S.ButtonSearch onClick={onClick}>
      <IconSearch /> <div>{text}</div>
    </S.ButtonSearch>
  )
}
