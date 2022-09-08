import IconSearch from '@mui/icons-material/Search'
import * as S from './styles'

interface IButtonProps {
  onClick?: () => void
  text: string
  textAlign?: 'center' | 'left'
}

export default function ButtonSearch({
  onClick,
  text,
  textAlign,
}: IButtonProps) {
  return (
    <S.ButtonSearch align={textAlign} onClick={onClick}>
      <IconSearch /> <div>{text}</div>
    </S.ButtonSearch>
  )
}
