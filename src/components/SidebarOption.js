import React from 'react'
import styled from 'styled-components'
import { db } from '../firebase'
import { useDispatch } from 'react-redux'
import { enterRoom } from '../features/appSlice';


function SidebarOption({Icon, title, addChannelOption, id}) {
  const dispatch = useDispatch();


  const addChannel = () => {
    const channelName = prompt('Please enter the channel name');

    if (channelName) {
      db.collection('rooms').add({
        name: channelName,
      })
    }
  };

  const selectChannel = () => {
    if (id) {
      dispatch(enterRoom({
        roomId: id,
      }))
    }
  };



  return (
    <Container
    onClick = {addChannelOption ? addChannel : selectChannel}
    >
      {Icon && <Icon fontSize = 'small' style = {{padding: 10}} />}
      {Icon ? (
          <h3>{title}</h3>
      ) : (
        <SidebarOptionChannel>
          <span>#</span> {title}
        </SidebarOptionChannel>
      )}
    </Container>
  )
}

export default SidebarOption

const Container = styled.div `
  display: flex;
  align-items: center;
  font-size: 12px;
  padding-left: 2px;
  cursor: pointer;

  :hover {
    opacity: 0.9;
    background-color: #340e36;
  }

  h3 {
    font-weight: 500;

    span {
      padding: 15px;
    }
  }

  hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
  }
`

const SidebarOptionChannel = styled.h3 `
  padding: 10px 0;
  font-weight: 300;

`