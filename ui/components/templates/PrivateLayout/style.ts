import styled from 'styled-components'

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
`

export const Header = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 1.5rem 1rem;

  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.primary_80};
`

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 900px;
  padding: 0 2rem;
`

export const Title = styled.h1`
  font-size: 2rem;
`

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  padding-top: 32px;
`

export const BodyContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 900px;
  padding: 0 2rem;
`
