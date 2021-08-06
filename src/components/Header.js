import React from 'react'
import styled from 'styled-components'
import { Avatar } from '@material-ui/core'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

function Header() {

  const [user] = useAuthState(auth);

  console.log(user)

  
  return (
    <Container>
      <HeaderLeft>
        <HeaderAvatar 
        src = {user?.photoURL} 
        alt = {user?.displayName} 
        onClick = {() => auth.signOut()} />
        <AccessTimeIcon />
      </HeaderLeft>

      <HeaderSearch>
        <SearchIcon />
        <input type="text" placeholder = "Search" />
      </HeaderSearch>

      <HeaderRight>
        <HelpOutlineIcon />
      </HeaderRight>

    </Container>
  )
}

export default Header


const Container = styled.div `
  display: flex;
  background-color: red;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--slack-color);
  color: white;

`

const HeaderLeft = styled.div `
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;

  .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
  }

`

const HeaderSearch = styled.div `
  display: flex;
  align-items: center;
  flex: 0.4;
  background-color: #421f44;
  border-radius: 6px;
  text-align: center;
  opacity: 1;
  color: gray;
  border: 1px solid gray;

  input {
    outline: none;
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw;
    color: white;
    
  }




`

const HeaderRight = styled.div `
  flex: 0.3;
  display: flex;
  align-items: flex-end;
  

  .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
    cursor: pointer;
  }



`

const HeaderAvatar = styled(Avatar) `
  cursor: pointer;
  
  :hover {
    opacity: 0.8;
  }
`