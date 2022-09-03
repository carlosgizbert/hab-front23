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

export const SuggestionsContainer = styled.div`
  margin-top: 0.5rem;
  height: 100%;
`

export const SuggestionItem = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
  height: 70px;
  padding: 0 1rem;
  border-radius: 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.neutral_70};
  }
`
