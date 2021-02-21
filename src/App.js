import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Header from './Header';
import styled from "styled-components";
import SideBar from "./SideBar";
import Messages from "./Messages";
import {useAuthState} from "react-firebase-hooks/auth";
import LoginScreen from "./LoginScreen";
import {auth} from "./Firebase";
import Spinner from "react-spinkit";

function App() {

  const [user, loading] = useAuthState(auth);

  if(loading){
      return (
        <AppLoading>
          <Contents>
            <img
              src = "https://www.netclipart.com/pp/m/120-1205456_chat-group-conversation-svg-png-icon-free-.png"
            />
            <Spinner
              name="ball-spin-fade-loader"
              color="purple"
              fadeIn="none"
            />
          </Contents>
        </AppLoading>
      )
  }

  return (
    <div className="App">
        <Router>
          {!user? (
            <LoginScreen/>
          ):(
        <>
          <Header/>
          <AppBody>
          <SideBar/>
            <Switch>
              <Route path="/" exact>
                <Messages/>
              </Route>
            </Switch>
            </AppBody>
        </>
          )}
        </Router>
    </div>
  );
}

export default App;

const AppBody = styled.div `
  display: flex;
  height: 100vh;
`;

const AppLoading = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    width: 100%;
`;

const Contents = styled.div`
    text-align: center;
    padding-bottom: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    >img{
      height: 100px;
      padding: 20px;
      margin-bottom: 40px;
    }
`;