import styled from 'styled-components'

export const Card = {
  Container: styled.div`
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

      border-radius: 1rem;
      background-color: ${(props) => props.theme.colors.white};
      box-shadow: ${(props) => props.theme.shadowLevel.level_1};
      transition: ease-in-out 0.4s;
      &:hover {
        box-shadow: ${(props) => props.theme.shadowLevel.level_2};
        transition: ease-in-out 0.4s;
      }
    `,
    Tag: styled.div`
      color: ${(props) => props.theme.colors.neutral_90};
      font-size: 14px;
      font-weight: bold;
    `,
    Title: styled.div`
      font-size: 20px;
      font-weight: bold;
      color: ${(props) => props.theme.colors.black};
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
      color: ${(props) => props.theme.colors.neutral_90};
    `,
  },
}
