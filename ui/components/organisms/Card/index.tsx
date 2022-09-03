import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { Card } from './style'

interface ICardSchool {
  imageUrl: string
  textTitle: string
  textTag: string
  textSub: string
  onClick?: () => void
}

export default function CardSchool({
  imageUrl,
  textTitle,
  textTag,
  textSub,
  onClick,
}: ICardSchool) {
  return (
    <Card.Container onClick={onClick}>
      <Card.Header.Wrapper imageUrl={imageUrl}>
        <Card.Header.Tag>{textTag}</Card.Header.Tag>
        <Card.Header.Title>{textTitle}</Card.Header.Title>
        <Card.Body.Subtitle>
          <LocationOnRoundedIcon />
          {textSub}
        </Card.Body.Subtitle>
      </Card.Header.Wrapper>
    </Card.Container>
  )
}
