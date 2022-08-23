import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 120px);

  background-color: #fbfbfb;
`

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 720px;
  padding-top: 3rem;
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;
  width: 100%;
  background-color: red;
`
export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 720px;
`