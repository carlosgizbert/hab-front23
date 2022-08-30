import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  width: 100%;
  color: ${(props) => props.theme.colors.sucess_90};
  background-color: ${(props) => props.theme.colors.black};
`

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 720px;
  padding: 0 1rem;
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