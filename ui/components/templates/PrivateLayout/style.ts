import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fbfbfb;
`

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 90vw;
  min-height: calc(100vh - 240px);
`

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;
  width: 100%;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.primary_90};
`
export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  padding: 3rem 2rem;
`

export const Footer = {
  Wrapper: styled(HeaderWrapper)`
    height: 120px;
    background-color: ${(props) => props.theme.colors.black};
  `,
  Content: styled(HeaderContainer)``,
}
