import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import styled from 'styled-components'
import { auth, db } from '../firebase';
import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function ChatInput({channelName, channelId, chatRef}) {

  const [user] = useAuthState(auth);

  const [input, setInput] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();

    if (!channelId) {
      return false;
    }


    //go into messages collection in the db
    db.collection('rooms')
    .doc(channelId)
    .collection('messages')
    .add({
      //get current value of input field
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user.displayName,
      userImage: user.photoURL
    });

    chatRef?.current?.scrollIntoView({
      behavior: 'smooth',
    });
    setInput('');
    

  }


  return (
    <Container>
      <form>
        <input value = {input}
        onChange = {(e) => setInput(e.target.value)} type="text" placeholder = {`Message #${channelName}`} />
        <Button hidden type = 'submit' onClick = {sendMessage}>
          SEND
        </Button>
      </form>
    </Container>
  )
}

export default ChatInput

const Container = styled.div `
  border-radius: 20px;

  form {
    position: relative;
    display: flex;
    justify-content: center;

    input {
      position: fixed;
      bottom: 30px;
      width: 60%;
      border: 1px solid gray;
      border-radius: 3px;
      padding: 20px;
      outline: none;
    }

    button {
      display: none !important;
    }
  }

`
