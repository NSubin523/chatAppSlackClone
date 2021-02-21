import React from 'react'
import styled from "styled-components";
import {Button} from "@material-ui/core";
import {auth,provider} from "./Firebase";

function LoginScreen() {
    const signIn = e => {
        e.preventDefault();
        auth.signInWithPopup(provider).catch((error)=>
        alert(error.message));
    };
    return (
      <LoginContainer>
          <LoginInner>
                <img src="https://www.netclipart.com/pp/m/120-1205456_chat-group-conversation-svg-png-icon-free-.png" alt="" />
                <h1> Sign In </h1>
                <h4>
                <img src="https://www.sketchappsources.com/resources/source-image/google-g-logo.jpg" alt=""/>
                <Button onClick={signIn}> Google Sign In </Button>
                </h4>
          </LoginInner>
      </LoginContainer>
    )
}

export default LoginScreen

const LoginContainer = styled.div`
    background-color: #f8f8f8;
    height: 100vh;
    display: grid;
    place-items: center;
    border-radius: 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`;

const LoginInner = styled.div`
    background-color: white;
    padding: 100px;
    text-align: center;
    border-radius: 10px;
    >img{
        object-fit: contain;
        height: 500px;
        margin-bottom: 20px;
    }
    >h4{
        margin-left: 120px;
        display: flex;
        align-items: center;
        >img{
            height: 50px;
        }
        >Button{
        cursor: pointer;
        margin-top: 50px;
        text-transform: inherit !important;
        background-color: #0a8d48;
        color: white;
        padding: 10px;
        border-radius: 8px;
        margin-bottom: 50px;
        :hover{
            background-color: blue;
        }
    }
    }
`;
