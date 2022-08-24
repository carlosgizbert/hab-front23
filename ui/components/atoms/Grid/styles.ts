import styled from 'styled-components'

export const Container = styled('div')<{ columns: string; gap: number }>`
  display: grid;
  gap: ${(props) => props.gap}rem;
  grid-template-columns: ${(props) => props.columns};
`
