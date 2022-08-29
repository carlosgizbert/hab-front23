import styled from 'styled-components'

export const Search = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 0 3rem;
  z-index: 50;
  background-color: rgb(255, 255, 255, 0.97);
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

export const Header = styled.div`
  display: flex;
  gap: 1rem;
  height: 80px;
  align-items: center;
`

export const SuggestionsContainer = styled.div`
  height: 100%;
`

export const Results = {
  SuggestionItem: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: auto;
    padding: 1rem 2rem;
    cursor: pointer;
  `,
}

export const Button = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 3rem;
`