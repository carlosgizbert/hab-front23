import styled from 'styled-components'

export const Card = {
  Container: styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    cursor: pointer;
  `,
  Header: {
    Wrapper: styled.div<{ imageUrl: string }>`
      display: flex;
      flex-direction: column;
      gap: 0.6em;
      padding: 1.5rem;
      width: 100%;

      border-radius: 0.5rem;
      background-color: ${(props) => props.theme.colors.white};
      box-shadow: ${(props) => props.theme.shadowLevel.level_1};
      transition: ease-in-out 0.2s;
      &:hover {
        box-shadow: ${(props) => props.theme.shadowLevel.level_2};
        transition: ease-in-out 0.2s;
      }
    `,
    Rating: styled.div`
      right: 0;
      top: 0;
      position: absolute;
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      align-items: center;
      justify-content: center;
      color: white;
      padding: 0.5rem;
      background-color: ${(props) => props.theme.colors.primary_80};
      border-radius: 0 0.5rem 0 0.5rem;
    `,
    Tag: styled.div`
      color: ${(props) => props.theme.colors.black};
      font-size: 14px;
      font-weight: bold;
    `,
    Title: styled.div`
      font-size: 20px;
      font-weight: bold;
      color: ${(props) => props.theme.colors.primary_80};
    `,
  },
  Body: {
    Wrapper: styled.div`
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    `,
    Subtitle: styled.div`
      display: flex;
      align-items: center;
      gap: 0.2rem;
      font-size: 12px;
      color: ${(props) => props.theme.colors.black};
    `,
  },
}
