import React, {useEffect, useRef} from 'react'
import styled from 'styled-components'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { selectRoomId } from '../features/appSlice';
import { useSelector } from 'react-redux';
import ChatInput from './ChatInput';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import { db } from '../firebase';
import Message from './Message';


function Chat() {
  const chatRef = useRef(null)
  const roomId = useSelector(selectRoomId);

  const [roomDetails] = useDocument(
    //if there is a roomId then go into the rooms collection and get the document with the roomId
    roomId && db.collection('rooms').doc(roomId)
  )

  const [roomMessage, loading] = useCollection(
    //if there is a roomId then go into the rooms collection and get the document with the roomId then go into the messages collection and order by timestamp
    roomId && db.collection('rooms')
    .doc(roomId)
    .collection('messages')
    .orderBy('timestamp' , 'asc')
  );

  console.log(roomDetails?.data());
  console.log(roomMessage)


  useEffect(() => {
    //scroll to the chatRef at the bottom
    chatRef?.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [roomId, loading])

  return (
    <Container>

      {roomDetails && roomMessage && (
                <>
                <Header>
                  <HeaderLeft>
                    <h4><strong>#{roomDetails?.data().name}</strong></h4>
                    <StarBorderIcon />
                  </HeaderLeft>

                  <HeaderRight>
                    <p>
                      <InfoOutlinedIcon /> Details
                    </p>
                  </HeaderRight>
                </Header>

                <ChatMessages>
                  {/* List out the messages */}
                  {roomMessage?.docs.map(doc => {
                    const { message, timestamp, user, userImage } = doc.data();

                    return (
                      <Message
                      key = {doc.id}
                      message = {message}
                      timestamp = {timestamp}
                      user = {user}
                      userImage= {userImage}
                      />
                    )
                  })}

                  <ChatBottom ref = {chatRef} />
                </ChatMessages>

                <ChatInput 
                chatRef = {chatRef}
                channelName = {roomDetails?.data().name}
                channelId = {roomId}
                />


                </>
      )}

     
    </Container>
  )
}

export default Chat

const Container = styled.div `
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;

`

const Header = styled.div `
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;

`

const HeaderLeft = styled.div `
  display: flex;
  align-items: center;

  h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;

    .MuiSvgIcon-root {
      margin-left: 20px;
      font-size: 18px;

    }
  }
`

const HeaderRight = styled.div `
  display: flex;
  align-items: center;
  font-size: 14px;

  .MuiSvgIcon-root {
      margin-right: 5px !important;
      font-size: 16px;

    }

    p {
      display: flex;
  align-items: center;
    }
  `

const ChatMessages = styled.div ``

const ChatBottom = styled.div ``