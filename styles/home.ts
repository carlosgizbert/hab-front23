import styled from 'styled-components'

export const Home = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3rem;
    gap: 2rem;
    width: 100vw;
    height: 100vh;

    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.1),
        rgba(0, 0, 0, 0.8)
      ),
      url('https://images.unsplash.com/photo-1519255122284-c3acd66be602?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=795&q=80');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  `,
  SubTitle: styled.div`
    font-size: 18px;
    text-align: center;
    color: white;
  `,
}
