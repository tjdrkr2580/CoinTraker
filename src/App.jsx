import { useEffect, useState } from "react";
import "./App.css";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./global";
import Loading from "./components/Loading";
import Header from "./components/Header";
import CoinList from "./components/CoinList";

const GlobalStyle = createGlobalStyle`
/* font-family: 'Gowun Batang', serif;
font-family: 'Kanit', sans-serif; */
  body {
    user-select: none;
    overflow-x: hidden;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    transition: 0.2s;
  }
`;

export const ToggleButton = styled.button`
  background-color: ${(props) => props.theme.button};
  cursor: pointer;
  width: 100px;
  height: 35px;
  border-radius: 8px;
  border: none;
  transition: 0.2s;
  &:hover {
    background-color: ${(props) => props.theme.buttonHover};
  }
  &:active {
    transform: scale(0.96);
  }
`;

export const List = styled.li`
  justify-content: space-between;
  padding: 0 1rem;
  width: 80%;
  height: 45px;
  border: 2px solid ${(props) => props.theme.textColor};
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  span {
    font-family: "Gowun Batang", serif;
    font-weight: 700;
    font-size: 0.8vw;
    letter-spacing: 0.1rem;
  }
`;

function App() {
  const [loading, setLoading] = useState(true);
  const [darkmode, setDarkmode] = useState(false);
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers?quotes=KRW").then(
      (response) =>
        response.json().then((json) => {
          const jsonArray = json.slice(0, 100);
          setCoins(jsonArray);
          setLoading(!loading);
        })
    );
  }, []);
  console.log(coins);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ThemeProvider theme={darkmode ? darkTheme : lightTheme}>
          <GlobalStyle />
          <Header darkmode={darkmode} setDarkmode={setDarkmode} />
          <CoinList coins={coins} />
        </ThemeProvider>
      )}
    </>
  );
}

export default App;
