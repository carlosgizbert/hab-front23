import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import { Card } from './style'

interface ICardSchool {
  imageUrl: string
  textTitle: string
  textTag: string
  textSub: string
  qtdRatings?: string
  rating?: string
  onClick?: () => void
}

export default function CardSchool({
  imageUrl,
  textTitle,
  textTag,
  qtdRatings,
  rating,
  textSub,
  onClick,
}: ICardSchool) {
  return (
    <Card.Container onClick={onClick}>
      <Card.Header.Wrapper imageUrl={imageUrl}>
        {qtdRatings && rating && (
          <Card.Header.Rating>
            <div style={{ fontWeight: '600' }}>
              {rating === '--' ? '--' : parseFloat(rating).toFixed(1)}
            </div>
            <div style={{ display: 'flex', fontSize: '12px' }}>
              {qtdRatings}
              <span>&nbsp;avaliações</span>
            </div>
          </Card.Header.Rating>
        )}
        <Card.Header.Tag>{textTag.toLocaleLowerCase()}</Card.Header.Tag>
        <Card.Header.Title>{textTitle}</Card.Header.Title>
        <Card.Body.Subtitle>
          <LocationOnRoundedIcon />
          {textSub}
        </Card.Body.Subtitle>
      </Card.Header.Wrapper>
    </Card.Container>
  )
}
