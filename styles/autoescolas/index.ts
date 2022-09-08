import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`

export const Header = styled.div`
  z-index: 50;
  position: sticky;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  padding: 1rem 1rem;
  width: 100%;
  color: ${(props) => props.theme.colors.sucess_90};
  background: #1fa2ff; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #1fa2ff,
    #1fa2ff,
    #12d8fa
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #1fa2ff,
    #1fa2ff,
    #12d8fa
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 720px;
`

export const ButtonSearch = styled.div`
  z-index: 40;
  position: sticky;
  top: 0;
  width: 100%;
  padding: 0.5rem 0;
`

export const SchoolsList = {
  Wrapper: styled.div`
    margin-top: 1rem;
    display: flex;
    flex-direction: center;
    justify-content: center;
    width: 100%;
    max-width: 720px;
  `,
  Body: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    max-width: 94vw;
  `,
  Cards: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
  `,
}

export const ResultNoSearch = styled.div`
  display: flex;
  font-size: 16px;
`
