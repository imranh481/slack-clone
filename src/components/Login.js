import { Button } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import { auth, provider } from '../firebase';

function Login() {

  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  }

  return (
    <Container>
      <LoginContainer>
        <img src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg" alt="" />
        <h1>Sign in to SLACK</h1>
        <p>imran.slack.com</p>
        <Button onClick = {signIn}>Sign in with Google</Button>
      </LoginContainer>
    </Container>
  )
}

export default Login

const Container = styled.div `
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`

const LoginContainer = styled.div `
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

  img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
  }

  Button {
    margin-top: 50px;
    text-transform: inherit !important;
    background-color: #0a8d48;
    color: white;
  }

`