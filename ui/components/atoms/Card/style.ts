import styled from 'styled-components'

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6em;
  padding: 1.5rem;
  width: 100%;
  cursor: pointer;

  border-radius: 2rem;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.shadowLevel.level_1};
  transition: ease-out 0.2s;
  &:hover {
    box-shadow: ${(props) => props.theme.shadowLevel.level_2};
    transition: ease-in 0.1s;
  }
`
