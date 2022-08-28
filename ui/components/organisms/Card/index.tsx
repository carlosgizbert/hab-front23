import { Card } from './style'

interface ICardSchool {
  imageUrl: string
  textTitle: string
  textTag: string
  textSub: string
  onClick: () => void
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
      <Card.Header.Image imageUrl={imageUrl}>
        <Card.Header.Tag>{textTag}</Card.Header.Tag>
      </Card.Header.Image>
      <Card.Body.Wrapper>
        <Card.Body.Title>{textTitle}</Card.Body.Title>
        <Card.Body.Subtitle>{textSub}</Card.Body.Subtitle>
      </Card.Body.Wrapper>
    </Card.Container>
  )
}
