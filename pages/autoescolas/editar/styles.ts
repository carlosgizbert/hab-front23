import styled from 'styled-components'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.gridSpace.spacing_SM}
`