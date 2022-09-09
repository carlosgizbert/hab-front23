import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`

export const Header = styled.div`
  z-index: 90;
  display: flex;
  position: sticky;
  top: 0;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  width: 100%;
  color: ${(props) => props.theme.colors.black};
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.shadowLevel.level_2};
  /* color: ${(props) => props.theme.colors.sucess_90};
  background: #1fa2ff;
  background: -webkit-linear-gradient(to right, #1fa2ff, #1fa2ff, #12d8fa);
  background: linear-gradient(to right, #1fa2ff, #1fa2ff, #12d8fa); */
`

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 720px;
`

export const HeaderTop = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const SchoolsList = {
  Wrapper: styled.div`
    margin-top: 1rem;
    display: flex;
    flex-direction: center;
    justify-content: center;
    width: 100%;
    max-width: 720px;
  `,
  Body: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 94vw;
  `,
  Cards: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,
}

export const ResultNoSearch = styled.div`
  display: flex;
  font-size: 16px;
`

export const BoxRating = styled.div<{ padding?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;
  min-width: 64px;
  padding: ${(props) => (props.padding ? props.padding : '8px 8px')};
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.primary_80};
  border-radius: 2rem;
  color: ${(props) => props.theme.colors.primary_80};
`
