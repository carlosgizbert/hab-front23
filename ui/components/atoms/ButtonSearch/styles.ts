import styled from 'styled-components'

export const ButtonSearch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 1rem;
  border: 1px solid ${(props) => props.theme.colors.white};
  padding: 1rem;
  gap: 0.2rem;
  color: white;
  cursor: pointer;
  background-color: rgb(0, 0, 0, 0.2);
  transition: ease-in-out 0.2s;
  &:hover {
    border: 1px solid rgb(200, 200, 200, 1);
    transition: ease-in-out 0.2s;
  }

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                supported by Chrome, Edge, Opera and Firefox */
`
