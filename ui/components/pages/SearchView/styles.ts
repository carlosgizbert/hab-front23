import styled from 'styled-components'

export const Search = {
  Wrapper: styled.div`
    position: absolute;
    display: flex;
    width: 100vw;
    height: 100vh;
    padding: 0 3rem;
    z-index: 50;
    background-color: white;
  `,
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  `,
  Results: {
    Wrapper: styled.div`
      width: 100%;
    `,
    Container: styled.div`
      width: 100%;
    `,
    Header: styled.div`
      display: flex;
      gap: 1rem;
      height: 90px;
      align-items: center;
    `,
  },
  Button: styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 3rem;
  `,
  DropdownResults: styled.div`
    height: 100vh;
  `,
  SuggestionItem: styled.div<{ active: boolean }>`
    display: flex;
    align-items: center;
    width: 100%;
    height: auto;
    padding: 1rem 2rem;
    cursor: pointer;
  `,
}
