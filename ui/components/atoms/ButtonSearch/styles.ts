import styled from 'styled-components'

export const ButtonSearch = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 0.8rem;
  border: 1px solid rgb(200, 200, 200, 0.6);
  padding: 1rem;
  gap: 0.5rem;
  color: white;
  cursor: pointer;
  &:hover {
    border: 1px solid rgb(200, 200, 200, 1);
    transition: ease-in-out 0.4s;
  }

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                supported by Chrome, Edge, Opera and Firefox */
`
