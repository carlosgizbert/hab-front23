import Card from '@/ui/atoms/Card'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import * as S from './styles'

interface IButtonCard {
  icon?: any
  label?: string
  onClick?: () => void
}

export default function ButtonCard({ icon, label, onClick }: IButtonCard) {
  return (
    <Card onClick={onClick}>
      <S.Wrapper>
        <S.Label>
          <div>{icon}</div>
          <div>{label}</div>
        </S.Label>
        <ChevronRightRoundedIcon />
      </S.Wrapper>
    </Card>
  )
}
