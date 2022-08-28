import styled from 'styled-components'

export const Card = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    cursor: pointer;
  `,
  Header: {
    Image: styled.div<{ imageUrl: string }>`
      position: relative;
      background-image: url(${({ imageUrl }) => imageUrl});
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      width: 100%;
      height: 120px;
      border-radius: 8px;
    `,
    Tag: styled.div`
      position: absolute;
      top: 0;
      left: 0;

      padding: 0.5rem;
      border-radius: 8px 0 8px 0;

      color: white;
      background-color: rgb(0, 0, 0, 0.8);
      font-size: 14px;
    `,
  },
  Body: {
    Wrapper: styled.div`
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    `,
    Title: styled.div`
      font-size: 16px;
      font-weight: bold;
    `,
    Subtitle: styled.div`
      font-size: 14px;
    `,
  },
}
