import styled from 'styled-components'

export const Container = styled('div')<{
  columns: string
  gap: number
  wrap?: boolean
}>`
  display: grid;
  gap: ${(props) => props.gap}rem;
  grid-template-columns: ${(props) => props.columns};
  flex-wrap: ${(props) => (props.wrap ? 'wrap' : 'nowrap')};
`
