import styled from 'styled-components'

export const Search = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 0 1rem;
  z-index: 100;
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
  height: auto;
`

export const SuggestionItem = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
  height: 70px;
  padding: 0 1rem;
  border-radius: 4px;
  cursor: pointer;
`

export const Button = styled.div`
  margin-bottom: 3rem;
`
