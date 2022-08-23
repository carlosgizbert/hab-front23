import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
  width: 100vw;
  height: 100%;

  background-color: #fbfbfb;
`

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 720px;
  padding: 3rem 0;
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;
  width: 100%;
  color: ${(props) => props.theme.colors.black};
  background-color: ${(props) => props.theme.colors.neutral_70};
`
export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 720px;
`