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
  ButtonSearch: styled.div`
    display: flex;
    align-items: center;
    border-radius: 0.5rem;
    outline: 1px solid rgb(200, 200, 200, 0.6);
    padding: 1rem;
    gap: 0.5rem;
    color: white;
    cursor: pointer;
    &:hover {
      outline: 1px solid rgb(200, 200, 200, 1);
      transition: ease-in-out 0.4s;
    }

    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
  `,
}