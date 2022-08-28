import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.gridSpace.spacing_SM};
`
