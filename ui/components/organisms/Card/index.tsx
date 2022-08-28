import { Card } from './style'

export default function CardSchool() {
  return (
    <Card.Container>
      <Card.Header.Image imageUrl="https://yt3.ggpht.com/1cnC4t4JxgiLkCdXgTL8nZ_EYrQQ6I6ZDYUwCuNT_yZQAoJiGPlm5-vfRw541U4vJcZ6FJNpmw=s900-c-k-c0x00ffffff-no-rj">
        <Card.Header.Tag>Vila Tupi</Card.Header.Tag>
      </Card.Header.Image>
      <Card.Body.Wrapper>
        <Card.Body.Title>Twister</Card.Body.Title>
        <Card.Body.Subtitle>
          Avenida Presidente Kennedy, Praia Grande, São Paulo, 11709-000
        </Card.Body.Subtitle>
      </Card.Body.Wrapper>
    </Card.Container>
  )
}
