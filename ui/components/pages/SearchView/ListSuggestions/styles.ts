import styled from 'styled-components'

export const SuggestionsContainer = styled.div`
  margin-top: 0.5rem;
  height: 100%;
  padding: 0 1rem;
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
    box-shadow: ${(props) => props.theme.shadowLevel.level_1};
  }
`
