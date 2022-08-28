import styled from 'styled-components'

export const Home = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
  `,
}

export const Header = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    justify-content: center;
    padding: 2rem 0;
    width: 100%;
    color: ${(props) => props.theme.colors.sucess_90};
    background-color: ${(props) => props.theme.colors.neutral_70};
  `,
  Logo: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1200px;
  `,
  Search: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    max-width: 1200px;
  `,
}

export const SchoolsList = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: center;
    justify-content: center;
    width: 100%;
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
    gap: 2.5rem;
  `,
}

export const ResultNoSearch = styled.div`
  display: flex;
  font-size: 18px;
`
